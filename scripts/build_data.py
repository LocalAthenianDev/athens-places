"""Build data/places.geojson from the raw WFS export of the Municipality of Athens
toponymy layer (data/raw/toponymia.json, EPSG:2100).

The raw file already carries WGS84 coordinates in xwgs / ywgs, so no reprojection
library is needed. Run from the repo root:

    python3 scripts/build_data.py
"""
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw" / "toponymia.json"
OUT = ROOT / "data" / "places.geojson"

# Category codes used by the source layer (field "places")
CATEGORIES = {0: "square", 100: "landmark", 200: "monument", 900: "green"}

# Greek letters that look like Latin ones and appear by mistake in English names
LOOKALIKES = str.maketrans("ΑΒΕΖΗΙΚΜΝΟΡΤΥΧ", "ABEZHIKMNOPTYX")


# Spell out the abbreviated district names of the source layer
DISTRICTS = {
    "Α ΝΕΚΡΟΤΑΦΕΙΟ": "Α' ΝΕΚΡΟΤΑΦΕΙΟ",
    "ΑΓ.ΚΩΝ/ΝΟΣ-ΠΛ.ΒΑΘΗΣ-ΑΓ.ΠΑΥΛΟΣ": "ΑΓ. ΚΩΝΣΤΑΝΤΙΝΟΣ - ΠΛ. ΒΑΘΗΣ - ΑΓ. ΠΑΥΛΟΣ",
    "ΕΜΠΟΡ.ΤΡΙΓΩΝΟ-ΜΟΝΑΣΤΗΡΑΚΙ-ΠΛΑΚΑ": "ΕΜΠΟΡΙΚΟ ΤΡΙΓΩΝΟ - ΜΟΝΑΣΤΗΡΑΚΙ - ΠΛΑΚΑ",
    "ΠΛ.ΑΜΕΡΙΚΗΣ": "ΠΛΑΤΕΙΑ ΑΜΕΡΙΚΗΣ",
    "ΠΛ.ΑΤΤΙΚΗΣ": "ΠΛΑΤΕΙΑ ΑΤΤΙΚΗΣ",
    "ΠΡΟΦ.ΗΛΙΑΣ": "ΠΡΟΦΗΤΗΣ ΗΛΙΑΣ",
}


def clean_district(text: str) -> str:
    text = " ".join((text or "").split())
    if text in DISTRICTS:
        return DISTRICTS[text]
    return " - ".join(part.strip() for part in text.split("-"))


def clean_en(text: str) -> str:
    return " ".join(text.translate(LOOKALIKES).split())


def main() -> None:
    raw = json.loads(RAW.read_text(encoding="utf-8"))
    features = []
    for f in raw["features"]:
        p = f["properties"]
        name_en = clean_en(p.get("labels_eng") or p.get("label_en") or p.get("names_eng") or "")
        # "names" spells saints in full (ΑΓΙΟΥ) but abbreviates squares (ΠΛ.);
        # "names_labe" does the opposite and sometimes adds the popular name in brackets.
        short = " ".join(p["names"].split())
        name = "ΠΛΑΤΕΙΑ " + short[4:] if short.startswith("ΠΛ. ") else short
        label = " ".join((p.get("names_labe") or "").split())
        aka = ""
        if "(" in label and "(" not in name:
            inside = label[label.index("(") + 1:label.rindex(")")].strip()
            before = label[:label.index("(")].replace("ΠΛΑΤΕΙΑ", "").strip()
            aka = before if inside in name else inside
        features.append({
            "type": "Feature",
            "id": p["fid"],
            "geometry": {
                "type": "Point",
                "coordinates": [round(p["xwgs"], 6), round(p["ywgs"], 6)],
            },
            "properties": {
                "name": name,
                "aka": aka,
                "name_en": name_en,
                "cat": CATEGORIES.get(p["places"], "other"),
                "green_no": p.get("ar_900"),
                "district": clean_district(p.get("synoikia")),
                "community": int(p["dk"][0]) if p.get("dk") else None,
            },
        })
    features.sort(key=lambda x: x["id"])
    OUT.write_text(
        json.dumps({"type": "FeatureCollection", "features": features}, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"Wrote {len(features)} places to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
