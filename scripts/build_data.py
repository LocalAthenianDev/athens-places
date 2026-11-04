"""Build the app data from the raw WFS exports of the Municipality of Athens
(all EPSG:2100, stored in data/raw/).

Inputs
  toponymia.json            toponymy points (squares, landmarks, monuments, green spaces)
  xoroi_politismou.json     municipal cultural venues
  istoriko_kentro.json      Historic Centre boundary
  peiraios_axonas.json      Piraeus Street historic axis (traditional sector)
  tomeas_arxaiologias.json  Archaeology Sector, ΦΕΚ 96Δ/2004
  koinotites.json           the 7 municipal communities (Δημοτικές Κοινότητες)

Outputs
  data/places.geojson       every point, tagged with the zones it falls in
  data/zones.geojson        the three zones in WGS84
  data/communities.geojson  the 7 communities in WGS84, with a label point each
  data/municipality.geojson the outer boundary of the Municipality (union of the communities)

No dependencies. Run from the repo root:

    python3 scripts/build_data.py
"""
import json
import pathlib
import re

from ggrs87 import to_wgs84

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAWDIR = ROOT / "data" / "raw"
OUT = ROOT / "data" / "places.geojson"
ZONES_OUT = ROOT / "data" / "zones.geojson"
COMMUNITIES_OUT = ROOT / "data" / "communities.geojson"
MUNICIPALITY_OUT = ROOT / "data" / "municipality.geojson"

# Zones: raw file, id, Greek name, English name, outline colour, source note
ZONES = [
    ("tomeas_arxaiologias.json", "archaeology", "Τομέας Αρχαιολογίας", "Archaeology Sector", "#a3441f", "ΦΕΚ 96Δ/2004"),
    ("istoriko_kentro.json", "centre", "Ιστορικό Κέντρο", "Historic Centre", "#1b3f8b", ""),
    ("peiraios_axonas.json", "peiraios", "Ιστορικός Άξονας Οδού Πειραιώς", "Piraeus Street Historic Axis", "#0e7c86", ""),
]

# Toponymy category codes (field "places")
CATEGORIES = {0: "square", 100: "landmark", 200: "monument", 900: "green"}

# Category codes that are wrong in the source: fid -> category
CATEGORY_FIX = {204: "landmark"}  # Panathenaic Stadium is coded as a square (0)

# Toponymy landmarks that are also in the cultural venues layer. The venue record is
# richer (address, link), so the landmark is dropped: fid -> venue fid
REPLACED_BY_VENUE = {188: 44, 72: 65, 144: 114, 192: 147}

# Venue ids are offset so they never clash with toponymy fids in URLs (#p-1044)
VENUE_ID_OFFSET = 1000

VENUE_TYPES = {
    "ΜΟΥΣΕΙΟ": "museum", "ΒΙΒΛΙΟΘΗΚΗ": "library", "ΘΕΑΤΡΟ": "theatre",
    "ΠΟΛΙΤΙΣΤΙΚΟ ΚΕΝΤΡΟ": "centre", "ΤΕΧΝΟΠΟΛΙΣ": "centre",
    "ΠΙΝΑΚΟΘΗΚΗ": "gallery", "ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ": "cinema",
}

# Cleaned Greek names and English names for the venues, keyed by source fid
VENUE_NAMES = {
    39: ("Μουσείο Λαϊκής Τέχνης και Παράδοσης", "Museum of Folk Art and Tradition"),
    42: ("Παιδική και Εφηβική Βιβλιοθήκη", "Children's and Teen Library"),
    43: ("Βρεφική και Νηπιακή Βιβλιοθήκη", "Baby and Toddler Library"),
    44: ("Τεχνόπολις Δήμου Αθηναίων (Γκάζι)", "Technopolis City of Athens (Gazi)"),
    55: ("Υπαίθριο Θέατρο Κολωνού", "Kolonos Open-Air Theatre"),
    60: ("Ολύμπια Δημοτικό Μουσικό Θέατρο «Μαρία Κάλλας»", "Olympia Municipal Music Theatre Maria Callas"),
    65: ("Κεντρική Δημοτική Βιβλιοθήκη και Μουσική Βιβλιοθήκη", "Central Municipal Library and Music Library"),
    66: ("Πολιτιστικό Κέντρο «Μελίνα»", "Melina Cultural Centre"),
    68: ("Βιβλιοθήκη Ιωάννειου Πνευματικού Κέντρου", "Ioanneio Cultural Centre Library"),
    87: ("Πολυχώρος Άννα και Μαρία Καλουτά", "Anna and Maria Kalouta Venue"),
    88: ("Κέντρο Τεχνών Πάρκου Ελευθερίας", "Eleftherias Park Arts Centre"),
    114: ("Πνευματικό Κέντρο Δήμου Αθηναίων", "Municipal Cultural Centre"),
    122: ("Μουσείο Θεάτρου Σκιών «Χαρίδημος»", "Haridimos Shadow Theatre Museum"),
    130: ("Βιομηχανικό Μουσείο Φωταερίου", "Industrial Gas Museum"),
    134: ("Ψηφιακό Μουσείο Ακαδημίας Πλάτωνος", "Plato's Academy Digital Museum"),
    144: ("Νέα Δημοτική Πινακοθήκη", "New Municipal Gallery"),
    147: ("Παλαιά Δημοτική Πινακοθήκη", "Old Municipal Gallery"),
    150: ("Ελληνικό Παιδικό Μουσείο", "Hellenic Children's Museum"),
    151: ("Παιδική Βιβλιοθήκη Σταθμού Λαρίσης", "Larissis Station Children's Library"),
    168: ("Μουσείο «Δωδεκανησιακό Σπίτι» Σεπολίων", "Dodecanese House Museum, Sepolia"),
    170: ("Δημοτικός Κινηματογράφος «Στέλλα»", "Stella Municipal Cinema"),
    177: ("Υπαίθριο Θέατρο Γκράβας", "Gravas Open-Air Theatre"),
    18: ("Ιωάννειος Βιβλιοθήκη", "Ioanneios Library"),
    229: ("Μουσείο Μαρία Κάλλας", "Maria Callas Museum"),
    230: ("Δημοτικό Θέατρο Λυκαβηττού", "Lycabettus Municipal Theatre"),
}

# Short names for the operators of the venues
OPERATORS = {
    "Οργανισμός Πολιτισμού, Αθλητισμού & Νεολαίας Δήμου Αθηναίων": "ΟΠΑΝΔΑ (Οργανισμός Πολιτισμού, Αθλητισμού & Νεολαίας)",
}

# Greek letters that look like Latin ones and appear by mistake in English names
LOOKALIKES = str.maketrans("ΑΒΕΖΗΙΚΜΝΟΡΤΥΧ", "ABEZHIKMNOPTYX")

# Spell out the abbreviated district names of the toponymy layer
DISTRICTS = {
    "Α ΝΕΚΡΟΤΑΦΕΙΟ": "Α' ΝΕΚΡΟΤΑΦΕΙΟ",
    "ΑΓ.ΚΩΝ/ΝΟΣ-ΠΛ.ΒΑΘΗΣ-ΑΓ.ΠΑΥΛΟΣ": "ΑΓ. ΚΩΝΣΤΑΝΤΙΝΟΣ - ΠΛ. ΒΑΘΗΣ - ΑΓ. ΠΑΥΛΟΣ",
    "ΕΜΠΟΡ.ΤΡΙΓΩΝΟ-ΜΟΝΑΣΤΗΡΑΚΙ-ΠΛΑΚΑ": "ΕΜΠΟΡΙΚΟ ΤΡΙΓΩΝΟ - ΜΟΝΑΣΤΗΡΑΚΙ - ΠΛΑΚΑ",
    "ΠΛ.ΑΜΕΡΙΚΗΣ": "ΠΛΑΤΕΙΑ ΑΜΕΡΙΚΗΣ",
    "ΠΛ.ΑΤΤΙΚΗΣ": "ΠΛΑΤΕΙΑ ΑΤΤΙΚΗΣ",
    "ΠΡΟΦ.ΗΛΙΑΣ": "ΠΡΟΦΗΤΗΣ ΗΛΙΑΣ",
}


def load(name):
    return json.loads((RAWDIR / name).read_text(encoding="utf-8"))


def squash(text):
    return " ".join((text or "").split())


def clean_district(text):
    text = squash(text)
    return DISTRICTS.get(text) or " - ".join(part.strip() for part in text.split("-"))


def clean_en(text):
    return squash(text.translate(LOOKALIKES))


def operator(text):
    if text.startswith("Τεχνόπολις"):
        return "Τεχνόπολις Δήμου Αθηναίων"
    return OPERATORS.get(text, text)


def wgs(x, y):
    lon, lat = to_wgs84(x, y)
    return [round(lon, 6), round(lat, 6)]


# ---------- geometry ----------
def polygons(geom):
    return geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]


def ring_area(ring):
    return abs(sum(ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1] for i in range(len(ring) - 1))) / 2


def in_ring(x, y, ring):
    inside = False
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1:
            inside = not inside
    return inside


def in_polygons(x, y, polys):
    return any(in_ring(x, y, p[0]) and not any(in_ring(x, y, h) for h in p[1:]) for p in polys)


# ---------- builders ----------
def build_zones():
    zones, features = [], []
    for fname, zid, name, name_en, color, note in ZONES:
        polys = [p for f in load(fname)["features"] for p in polygons(f["geometry"])]
        zones.append((zid, polys))
        area = sum(ring_area(p[0]) - sum(ring_area(h) for h in p[1:]) for p in polys) / 1e6
        features.append({
            "type": "Feature",
            "id": zid,
            "geometry": {"type": "MultiPolygon", "coordinates": [[[wgs(x, y) for x, y in ring] for ring in p] for p in polys]},
            "properties": {"name": name, "name_en": name_en, "color": color, "note": note, "area_km2": round(area, 2)},
        })
    write(ZONES_OUT, features, "zones")
    return zones


def ring_centroid(ring):
    a = cx = cy = 0.0
    for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]):
        cross = x1 * y2 - x2 * y1
        a += cross
        cx += (x1 + x2) * cross
        cy += (y1 + y2) * cross
    a *= 0.5
    return cx / (6 * a), cy / (6 * a)


def label_point(polys):
    """A point well inside the largest polygon, for the community number."""
    ring = max((p[0] for p in polys), key=ring_area)
    cx, cy = ring_centroid(ring)
    if in_polygons(cx, cy, polys):
        return cx, cy
    # Concave shape: scan a grid and keep the inside point farthest from the edge
    xs, ys = [x for x, _ in ring], [y for _, y in ring]
    best, best_d = (cx, cy), -1
    for i in range(1, 30):
        for j in range(1, 30):
            x = min(xs) + (max(xs) - min(xs)) * i / 30
            y = min(ys) + (max(ys) - min(ys)) * j / 30
            if in_polygons(x, y, polys):
                d = min((x - vx) ** 2 + (y - vy) ** 2 for vx, vy in ring)
                if d > best_d:
                    best, best_d = (x, y), d
    return best


def build_communities():
    comms, features = [], []
    for f in load("koinotites.json")["features"]:
        p = f["properties"]
        polys = polygons(f["geometry"])
        no = int(p["no"])
        comms.append((no, polys))
        lx, ly = label_point(polys)
        features.append({
            "type": "Feature",
            "id": no,
            "geometry": {"type": "MultiPolygon", "coordinates": [[[wgs(x, y) for x, y in ring] for ring in poly] for poly in polys]},
            "properties": {"no": no, "label": wgs(lx, ly), "area_km2": round(sum(ring_area(q[0]) for q in polys) / 1e6, 2)},
        })
    features.sort(key=lambda f: f["id"])
    write(COMMUNITIES_OUT, features, "communities")
    return comms


def build_municipality(comms):
    """Outer boundary of the Municipality: the community edges that are not shared.

    Neighbouring communities share exact vertices, so every inner edge appears twice
    and drops out; the edges left over chain into the outer ring(s).
    """
    from collections import Counter, defaultdict
    key = lambda pt: (round(pt[0], 2), round(pt[1], 2))
    edges = Counter()
    for _, polys in comms:
        for poly in polys:
            for ring in poly:
                pts = [key(pt) for pt in ring]
                for a, b in zip(pts, pts[1:]):
                    if a != b:
                        edges[frozenset((a, b))] += 1
    adj = defaultdict(list)
    for e, n in edges.items():
        if n == 1:
            a, b = tuple(e)
            adj[a].append(b)
            adj[b].append(a)
    rings, seen = [], set()
    for start in adj:
        if start in seen:
            continue
        ring, prev, cur = [start], None, start
        seen.add(start)
        while True:
            nxt = [n for n in adj[cur] if n != prev and (n not in seen or (n == start and len(ring) > 2))]
            if not nxt:
                break
            prev, cur = cur, nxt[0]
            ring.append(cur)
            if cur == start:
                break
            seen.add(cur)
        if len(ring) > 3 and ring[0] == ring[-1]:
            rings.append(ring)
    rings.sort(key=ring_area, reverse=True)
    area = sum(ring_area(r) for r in rings) / 1e6
    write(MUNICIPALITY_OUT, [{
        "type": "Feature",
        "id": "athens",
        "geometry": {"type": "MultiPolygon", "coordinates": [[[wgs(x, y) for x, y in r]] for r in rings]},
        "properties": {"name": "Δήμος Αθηναίων", "name_en": "Municipality of Athens", "area_km2": round(area, 2)},
    }], f"municipality ring(s), {area:.2f} km²")


def community_of(x, y, comms):
    return next((no for no, polys in comms if in_polygons(x, y, polys)), None)


def zones_of(x, y, zones):
    return [zid for zid, polys in zones if in_polygons(x, y, polys)]


def build_toponymy(zones):
    out = []
    for f in load("toponymia.json")["features"]:
        p = f["properties"]
        if p["fid"] in REPLACED_BY_VENUE:
            continue
        # "names" spells saints in full (ΑΓΙΟΥ) but abbreviates squares (ΠΛ.);
        # "names_labe" does the opposite and sometimes adds the popular name in brackets.
        short = squash(p["names"])
        name = "ΠΛΑΤΕΙΑ " + short[4:] if short.startswith("ΠΛ. ") else short
        label = squash(p.get("names_labe"))
        aka = ""
        if "(" in label and "(" not in name:
            inside = label[label.index("(") + 1:label.rindex(")")].strip()
            before = label[:label.index("(")].replace("ΠΛΑΤΕΙΑ", "").strip()
            aka = before if inside in name else inside
        x, y = f["geometry"]["coordinates"]
        out.append(feature(p["fid"], [round(p["xwgs"], 6), round(p["ywgs"], 6)], {
            "name": name,
            "aka": aka,
            "name_en": clean_en(p.get("labels_eng") or p.get("label_en") or p.get("names_eng") or ""),
            "cat": CATEGORY_FIX.get(p["fid"]) or CATEGORIES.get(p["places"], "other"),
            "green_no": p.get("ar_900"),
            "district": clean_district(p.get("synoikia")),
            "community": int(p["dk"][0]) if p.get("dk") else None,
            "zones": zones_of(x, y, zones),
        }, (x, y)))
    return out


def build_venues(zones):
    out = []
    for f in load("xoroi_politismou.json")["features"]:
        p = f["properties"]
        x, y = f["geometry"]["coordinates"][0]
        name, name_en = VENUE_NAMES.get(p["fid"], (squash(p["name"]), ""))
        address = squash(p.get("tax_diefth"))
        address = re.sub(r"\s*,?\s*Αθήνα$", "", address)
        out.append(feature(VENUE_ID_OFFSET + p["fid"], wgs(x, y), {
            "name": name,
            "aka": "",
            "name_en": name_en,
            "cat": "culture",
            "venue": VENUE_TYPES.get(p["type"], "centre"),
            "address": address,
            "url": (p.get("link_") or "").strip(),
            "street": squash(p.get("diefth")),
            "operator": operator(squash(p.get("foreas"))),
            "district": "",
            "community": int(p["dk"][0]) if p.get("dk") else None,
            "zones": zones_of(x, y, zones),
        }, (x, y)))
    return out


def feature(fid, coords, props, xy):
    # "_xy" keeps the Greek Grid coordinates for checks; it is not written out
    return {"type": "Feature", "id": fid, "geometry": {"type": "Point", "coordinates": coords}, "properties": props, "_xy": xy}


def write(path, features, what):
    path.write_text(
        json.dumps({"type": "FeatureCollection", "features": [{k: v for k, v in f.items() if k != "_xy"} for f in features]},
                   ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"Wrote {len(features)} {what} to {path.relative_to(ROOT)}")


def check_communities(places, comms):
    """Report places whose community field disagrees with the community polygons."""
    for f in places:
        x, y = f["_xy"]
        geo = community_of(x, y, comms)
        if geo != f["properties"]["community"]:
            print(f"  community mismatch: {f['properties']['name']} field={f['properties']['community']} polygon={geo}")


def main():
    zones = build_zones()
    comms = build_communities()
    build_municipality(comms)
    places = build_toponymy(zones) + build_venues(zones)
    places.sort(key=lambda f: f["id"])
    check_communities(places, comms)
    write(OUT, places, "places")


if __name__ == "__main__":
    main()
