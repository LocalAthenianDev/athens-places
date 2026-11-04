(() => {
  "use strict";

  /* ---------- Text ---------- */
  const T = {
    el: {
      kicker: "Δήμος Αθηναίων",
      title: "Τόποι της Αθήνας",
      titleAlt: "Athens Places",
      togglePanel: "Εμφάνιση λίστας",
      searchLabel: "Αναζήτηση τόπου",
      searchPh: "Αναζήτηση, π.χ. Κολωνάκι",
      catsLegend: "Κατηγορίες",
      communityLabel: "Περιοχή",
      allCommunities: "Όλος ο Δήμος",
      communitiesGroup: "Δημοτικές κοινότητες",
      zonesGroup: "Ιστορικές ζώνες",
      zoneDt: "Ζώνη",
      layers: "Επίπεδα",
      layersHint: "Όρια στον χάρτη",
      communitiesLayer: "Δημοτικές κοινότητες",
      municipalityLayer: "Όρια Δήμου Αθηναίων",
      community: (n) => `${n}η Δημοτική Κοινότητα`,
      communityShort: (n) => `${n}η Κοινότητα`,
      near: "Κοντά μου",
      locating: "Εντοπισμός…",
      geoError: "Δεν βρέθηκε η θέση σου. Έλεγξε ότι ο browser έχει άδεια τοποθεσίας.",
      count: (n, total) => n === total ? `${total} τόποι` : `${n} από ${total} τόπους`,
      byDistance: "ταξινόμηση κατά απόσταση",
      empty: "Κανένας τόπος δεν ταιριάζει στα φίλτρα.",
      reset: "Καθαρισμός φίλτρων",
      cats: { square: "Πλατείες", landmark: "Τοπόσημα", monument: "Μνημεία", culture: "Χώροι πολιτισμού", green: "Πράσινο & ελεύθεροι χώροι", fountain: "Σιντριβάνια" },
      cat1: { square: "Πλατεία", landmark: "Τοπόσημο", monument: "Μνημείο", culture: "Χώρος πολιτισμού", green: "Χώρος πρασίνου", fountain: "Σιντριβάνι" },
      fountainOn: "Σε λειτουργία",
      fountainOff: "Εκτός λειτουργίας",
      statusDt: "Κατάσταση",
      checkedNote: (d) => `Κατάσταση σύμφωνα με τον Δήμο στις ${d.split("-").reverse().join("/")}.`,
      fountainNo: "Αρ. πίδακα",
      venue: { museum: "Μουσείο", library: "Βιβλιοθήκη", theatre: "Θέατρο", centre: "Πολιτιστικό κέντρο", gallery: "Πινακοθήκη", cinema: "Κινηματογράφος" },
      address: "Διεύθυνση",
      operator: "Φορέας",
      website: "Ιστότοπος",
      district: "Συνοικία",
      communityDt: "Κοινότητα",
      greenNo: "Αρ. χώρου",
      directions: "Οδηγίες",
      osm: "OpenStreetMap",
      copy: "Αντιγραφή συνδέσμου",
      copied: "Αντιγράφηκε",
      aka: "και",
      langBtn: "EN",
      langAria: "Switch to English",
      source: 'Δεδομένα από την <a href="https://opendata.cityofathens.gr/dataset/gis-athens-cf2c2f7a-88c0-11ec-8393-0242ac120006">Πύλη Ανοιχτών Δεδομένων του Δήμου Αθηναίων</a> (τοπωνυμία, χώροι πολιτισμού, υδατοπίδακες, δημοτικές κοινότητες, Ιστορικό Κέντρο, Άξονας Πειραιώς, Τομέας Αρχαιολογίας ΦΕΚ 96Δ/2004). Χάρτης © συντελεστές <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>.',
      about: 'Ανεξάρτητη εφαρμογή ανοιχτού κώδικα, όχι επίσημη εφαρμογή του Δήμου. Μέρος του <a href="https://athensapps.gr/">athensapps.gr</a>, κώδικας στο <a href="https://github.com/LocalAthenianDev/athens-places">GitHub</a>.',
      docTitle: "Τόποι της Αθήνας | Athens Places",
    },
    en: {
      kicker: "City of Athens",
      title: "Athens Places",
      titleAlt: "Τόποι της Αθήνας",
      togglePanel: "Show list",
      searchLabel: "Search places",
      searchPh: "Search, e.g. Kolonaki",
      catsLegend: "Categories",
      communityLabel: "Area",
      allCommunities: "Whole municipality",
      communitiesGroup: "Municipal communities",
      zonesGroup: "Historic zones",
      zoneDt: "Zone",
      layers: "Layers",
      layersHint: "Boundaries on the map",
      communitiesLayer: "Municipal communities",
      municipalityLayer: "City of Athens boundary",
      community: (n) => `${ordinal(n)} Municipal Community`,
      communityShort: (n) => `${ordinal(n)} Community`,
      near: "Near me",
      locating: "Locating…",
      geoError: "Your location could not be found. Check that the browser has location permission.",
      count: (n, total) => n === total ? `${total} places` : `${n} of ${total} places`,
      byDistance: "sorted by distance",
      empty: "No place matches these filters.",
      reset: "Clear filters",
      cats: { square: "Squares", landmark: "Landmarks", monument: "Monuments", culture: "Cultural venues", green: "Green & open spaces", fountain: "Fountains" },
      cat1: { square: "Square", landmark: "Landmark", monument: "Monument", culture: "Cultural venue", green: "Green space", fountain: "Fountain" },
      fountainOn: "Working",
      fountainOff: "Not working",
      statusDt: "Status",
      checkedNote: (d) => `Status as reported by the City on ${d.split("-").reverse().join("/")}.`,
      fountainNo: "Fountain no.",
      venue: { museum: "Museum", library: "Library", theatre: "Theatre", centre: "Cultural centre", gallery: "Gallery", cinema: "Cinema" },
      address: "Address",
      operator: "Operator",
      website: "Website",
      district: "District",
      communityDt: "Community",
      greenNo: "Space no.",
      directions: "Directions",
      osm: "OpenStreetMap",
      copy: "Copy link",
      copied: "Copied",
      aka: "aka",
      langBtn: "ΕΛ",
      langAria: "Αλλαγή σε ελληνικά",
      source: 'Data from the <a href="https://opendata.cityofathens.gr/dataset/gis-athens-cf2c2f7a-88c0-11ec-8393-0242ac120006">City of Athens Open Data Portal</a> (toponymy, cultural venues, fountains, municipal communities, Historic Centre, Piraeus Street axis, Archaeology Sector ΦΕΚ 96Δ/2004). Map © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
      about: 'An independent open source app, not an official City of Athens app. Part of <a href="https://athensapps.gr/">athensapps.gr</a>, code on <a href="https://github.com/LocalAthenianDev/athens-places">GitHub</a>.',
      docTitle: "Athens Places | Τόποι της Αθήνας",
    },
  };
  function ordinal(n) {
    const s = { 1: "st", 2: "nd", 3: "rd" }[n] || "th";
    return `${n}${s}`;
  }

  const CATS = ["square", "landmark", "monument", "culture", "green", "fountain"];
  // Categories that start switched off, so the map is not crowded by default
  const OFF_BY_DEFAULT = ["fountain"];
  const defaultCats = () => new Set(CATS.filter((c) => !OFF_BY_DEFAULT.includes(c)));
  const DROP = '<svg viewBox="0 0 16 20" aria-hidden="true"><path d="M8 1.5C5.6 5 3 8.3 3 12a5 5 0 0 0 10 0c0-3.7-2.6-7-5-10.5z"/></svg>';
  const COLORS = {
    square: "#2f6fd6", landmark: "#7d4cb8", monument: "#a3441f", culture: "#c0307a", green: "#2e7d4f", fountain: "#0b8bd1",
  };

  /* ---------- Small helpers ---------- */
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Accent and case insensitive matching for Greek and Latin
  const norm = (s) => String(s || "")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toUpperCase().replace(/Σ/g, "Σ").replace(/[.\-'"()]/g, " ")
    .replace(/\s+/g, " ").trim();
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
  };
  function distanceKm(a, b) {
    const R = 6371, rad = Math.PI / 180;
    const dLat = (b[0] - a[0]) * rad, dLon = (b[1] - a[1]) * rad;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }
  const fmtDist = (km) => km < 1 ? `${Math.round(km * 1000 / 10) * 10} m` : `${km.toFixed(1).replace(".", lang === "el" ? "," : ".")} km`;

  /* ---------- State ---------- */
  const params = new URLSearchParams(location.search);
  let lang = params.get("lang") === "en" || params.get("lang") === "el" ? params.get("lang") : (store.get("places-lang") || "el");
  const state = { q: "", cats: defaultCats(), area: "", me: null, current: null };
  let places = [];
  const t = () => T[lang];

  /* ---------- Map ---------- */
  const map = L.map("map", { zoomControl: false, attributionControl: false, minZoom: 12, maxZoom: 19 }).setView([37.985, 23.735], 13);
  // On phones the bottom sheet covers the bottom corners, so credits go top left
  L.control.attribution({ position: matchMedia("(max-width: 760px)").matches ? "topleft" : "bottomright" }).addTo(map);
  L.control.zoom({ position: "topright" }).addTo(map);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  // Municipality: a soft veil outside the boundary (under everything) and a strong
  // outline (over the other boundaries, under the markers)
  map.createPane("muniMask").style.zIndex = 380;
  map.createPane("muniLine").style.zIndex = 410; // above the community lines it coincides with
  const muniLayer = L.layerGroup().addTo(map);
  const MUNI_COLOR = "#1b3f8b";
  let muni = null;
  function styleMuni() {
    if (!muni) return;
    const show = !hidden.has("municipality");
    muni.forEach((l) => {
      if (show && !muniLayer.hasLayer(l)) muniLayer.addLayer(l);
      if (!show && muniLayer.hasLayer(l)) muniLayer.removeLayer(l);
    });
  }

  // Community numbers sit above the markers so they are never hidden
  map.createPane("commLabels").style.zIndex = 640;
  const commLayer = L.layerGroup().addTo(map);
  const zonesLayer = L.layerGroup().addTo(map);
  let comms = [];
  const COMM_COLOR = "#2b3242";
  const commStyle = (on) => ({
    color: COMM_COLOR, weight: on ? 3.5 : 1.6, opacity: on ? 1 : 0.75,
    fillColor: COMM_COLOR, fillOpacity: on ? 0.06 : 0, interactive: false,
  });
  const commCasing = (on) => ({ color: "#fff", weight: on ? 8 : 5, opacity: 0.85, fill: false, interactive: false });
  function styleComms() {
    const show = !hidden.has("communities");
    comms.forEach((c) => {
      const on = state.area === String(c.no);
      [c.casing, c.layer, c.label].forEach((l) => {
        const want = show || on;
        if (want && !commLayer.hasLayer(l)) commLayer.addLayer(l);
        if (!want && commLayer.hasLayer(l)) commLayer.removeLayer(l);
      });
      c.casing.setStyle(commCasing(on));
      c.layer.setStyle(commStyle(on));
      const el = c.label.getElement();
      if (el) el.firstElementChild.classList.toggle("on", on);
      if (on) { c.casing.bringToFront(); c.layer.bringToFront(); }
    });
  }
  const layer = L.layerGroup().addTo(map);
  let zones = [];
  // Each boundary is drawn twice: a white casing underneath keeps the coloured
  // line readable on top of busy map tiles.
  const zoneStyle = (z, on) => ({
    color: z.color, weight: on ? 4.5 : 3, opacity: 1,
    dashArray: z.dash || null, lineCap: "round", lineJoin: "round",
    fillColor: z.color, fillOpacity: on ? 0.16 : 0.05,
  });
  const casingStyle = (on) => ({ color: "#fff", weight: on ? 9 : 7, opacity: 0.9, fill: false, interactive: false });
  const ZONE_DASH = { archaeology: "1 7" };
  const hidden = new Set((store.get("places-hidden") || "").split(",").filter(Boolean));
  const zoneName = (z) => (lang === "el" ? z.name : z.name_en);
  const zoneLabel = (z) => zoneName(z) + (z.note ? ` (${z.note})` : "");
  const catLabel = (p) => (p.venue ? t().venue[p.venue] : t().cat1[p.cat]);
  function styleZones() {
    zones.forEach((z) => {
      const on = state.area === `z:${z.id}`;
      const show = on || !hidden.has(z.id);
      [z.casing, z.layer].forEach((l) => {
        if (show && !zonesLayer.hasLayer(l)) zonesLayer.addLayer(l);
        if (!show && zonesLayer.hasLayer(l)) zonesLayer.removeLayer(l);
      });
      z.casing.setStyle(casingStyle(on));
      z.layer.setStyle(zoneStyle(z, on));
      if (on && show) { z.casing.bringToFront(); z.layer.bringToFront(); }
      z.layer.setTooltipContent(zoneLabel(z));
    });
    styleComms();
    styleMuni();
    buildLayersBox();
  }

  /* ---------- Layers box (legend + toggles) ---------- */
  const LayersBox = L.Control.extend({
    options: { position: "topright" },
    onAdd() {
      const el = L.DomUtil.create("div", "layers-box");
      L.DomEvent.disableClickPropagation(el);
      L.DomEvent.disableScrollPropagation(el);
      return el;
    },
  });
  const layersBox = new LayersBox().addTo(map);
  let layersOpen = !matchMedia("(max-width: 760px)").matches;
  function buildLayersBox() {
    const s = t();
    const el = layersBox.getContainer();
    const rows = zones.map((z) => `
      <label class="lyr">
        <input type="checkbox" data-layer="${z.id}"${hidden.has(z.id) ? "" : " checked"}>
        <svg class="swatch" viewBox="0 0 28 14" aria-hidden="true">
          <rect x="2" y="2" width="24" height="10" rx="2" fill="${z.color}" fill-opacity=".14"/>
          <rect x="2" y="2" width="24" height="10" rx="2" fill="none" stroke="#fff" stroke-width="4"/>
          <rect x="2" y="2" width="24" height="10" rx="2" fill="none" stroke="${z.color}" stroke-width="2.2"${z.dash ? ` stroke-dasharray="${z.dash}" stroke-linecap="round"` : ""}/>
        </svg>
        <span>${esc(zoneName(z))}${z.note ? `<small>${esc(z.note)}</small>` : ""}</span>
      </label>`).join("");
    const commRow = comms.length ? `
      <label class="lyr">
        <input type="checkbox" data-layer="communities"${hidden.has("communities") ? "" : " checked"}>
        <svg class="swatch" viewBox="0 0 28 14" aria-hidden="true">
          <rect x="2" y="2" width="24" height="10" rx="2" fill="none" stroke="#fff" stroke-width="3.5"/>
          <rect x="2" y="2" width="24" height="10" rx="2" fill="none" stroke="${COMM_COLOR}" stroke-width="1.6"/>
        </svg>
        <span>${esc(s.communitiesLayer)}</span>
      </label>` : "";
    const muniRow = muni ? `
      <label class="lyr">
        <input type="checkbox" data-layer="municipality"${hidden.has("municipality") ? "" : " checked"}>
        <svg class="swatch" viewBox="0 0 28 14" aria-hidden="true">
          <rect x="0" y="0" width="28" height="14" fill="#1d2433" fill-opacity=".2"/>
          <rect x="4" y="3" width="20" height="8" rx="1.5" fill="#fff"/>
          <rect x="4" y="3" width="20" height="8" rx="1.5" fill="none" stroke="${MUNI_COLOR}" stroke-width="2.4"/>
        </svg>
        <span>${esc(s.municipalityLayer)}</span>
      </label>` : "";
    el.innerHTML = `
      <button type="button" class="lyr-toggle" aria-expanded="${layersOpen}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></svg>
        <span>${esc(s.layers)}</span>
      </button>
      <div class="lyr-list"${layersOpen ? "" : " hidden"}><p class="lyr-hint">${esc(s.layersHint)}</p>${muniRow}${commRow}${rows}</div>`;
  }
  layersBox.getContainer().addEventListener("click", (e) => {
    if (e.target.closest(".lyr-toggle")) { layersOpen = !layersOpen; buildLayersBox(); }
  });
  layersBox.getContainer().addEventListener("change", (e) => {
    const id = e.target.dataset.layer;
    if (!id) return;
    if (e.target.checked) hidden.delete(id); else hidden.add(id);
    store.set("places-hidden", [...hidden].join(","));
    styleZones();
  });
  let meMarker = null;

  function makeMarker(p) {
    const ll = [p.lat, p.lon];
    let m;
    if (p.cat === "fountain") {
      m = L.marker(ll, {
        icon: L.divIcon({ className: "", html: `<span class="pin-drop${p.active ? "" : " off"}">${DROP}</span>`, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -10] }),
        keyboard: false,
      });
    } else if (p.cat === "green" && p.green_no) {
      m = L.marker(ll, {
        icon: L.divIcon({ className: "", html: `<span class="pin-num">${p.green_no}</span>`, iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -10] }),
        keyboard: false,
      });
    } else {
      m = L.circleMarker(ll, {
        radius: p.cat === "square" ? 5.5 : 7,
        color: "#fff", weight: 2,
        fillColor: COLORS[p.cat], fillOpacity: 1,
        pane: "markerPane", // above every boundary line
      });
    }
    m.on("click", () => select(p.id, { fly: false }));
    m.bindPopup(() => popupHtml(p), { maxWidth: 290, autoPanPaddingTopLeft: [20, 20] });
    m.on("popupclose", () => {
      if (state.current === p.id) { state.current = null; markCurrent(); history.replaceState(null, "", location.pathname + location.search); }
    });
    return m;
  }

  function popupHtml(p) {
    const s = t();
    const nameMain = lang === "el" ? p.name : (p.name_en || p.name);
    const nameAlt = lang === "el" ? p.name_en : p.name;
    const rows = [];
    if (p.address) rows.push([s.address, p.address]);
    if (p.district) rows.push([s.district, p.district]);
    rows.push([s.communityDt, s.communityShort(p.community)]);
    const zs = zones.filter((x) => p.zones.includes(x.id));
    if (zs.length) rows.push([s.zoneDt, zs.map(zoneLabel).join(", ")]);
    if (p.green_no) rows.push([s.greenNo, p.green_no]);
    if (p.operator) rows.push([s.operator, p.operator]);
    if (p.cat === "fountain") {
      rows.unshift([s.statusDt, p.active ? s.fountainOn : s.fountainOff]);
      if (p.fountain_no) rows.push([s.fountainNo, p.fountain_no]);
    }
    if (p.aka) rows.unshift([s.aka, p.aka]);
    const osm = `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=18/${p.lat}/${p.lon}`;
    const dir = `https://www.openstreetmap.org/directions?route=%3B${p.lat}%2C${p.lon}`;
    const dist = state.me ? ` <span class="item-dist">${fmtDist(p.dist)}</span>` : "";
    return `
      <div class="pop-sign">
        <span class="pop-name" lang="${nameMain === p.name ? "el" : "en"}">${esc(nameMain)}</span>
        ${nameAlt ? `<span class="pop-en">${esc(nameAlt)}</span>` : ""}
      </div>
      <div class="pop-body">
        <span class="pop-cat" style="--c:${COLORS[p.cat]}"><i></i>${esc(catLabel(p))}</span>${dist}
        <dl>${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
        ${p.note ? `<p class="pop-note">${esc(p.note.charAt(0).toUpperCase() + p.note.slice(1))}.</p>` : ""}
        ${p.checked ? `<p class="pop-small">${esc(s.checkedNote(p.checked))}</p>` : ""}
        <div class="pop-links">
          ${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(s.website)}</a>` : ""}
          <a href="${dir}" target="_blank" rel="noopener">${esc(s.directions)}</a>
          <a href="${osm}" target="_blank" rel="noopener">${esc(s.osm)}</a>
          <button type="button" data-copy="${p.id}">${esc(s.copy)}</button>
        </div>
      </div>`;
  }

  /* ---------- Filtering & list ---------- */
  const collator = () => new Intl.Collator(lang, { sensitivity: "base", numeric: true });

  function matchesArea(p) {
    if (!state.area) return true;
    if (state.area.startsWith("z:")) return p.zones.includes(state.area.slice(2));
    return p.community === +state.area;
  }

  function filtered() {
    const q = norm(state.q);
    const words = q ? q.split(" ") : [];
    let out = places.filter((p) =>
      state.cats.has(p.cat) &&
      matchesArea(p) &&
      words.every((w) => p.search.includes(w))
    );
    if (state.me) {
      out.sort((a, b) => a.dist - b.dist);
    } else {
      const c = collator();
      const key = (p) => (lang === "el" ? p.sortEl : (p.name_en || p.sortEl));
      out.sort((a, b) => c.compare(key(a), key(b)));
    }
    return out;
  }

  function render() {
    const s = t();
    const list = filtered();
    const ids = new Set(list.map((p) => p.id));

    layer.clearLayers();
    // Draw squares first so larger markers stay on top
    list.slice().sort((a, b) => CATS.indexOf(a.cat) - CATS.indexOf(b.cat))
      .forEach((p) => layer.addLayer(p.marker));
    if (state.current && !ids.has(state.current)) map.closePopup();

    $("#count").textContent = s.count(list.length, places.length) + (state.me ? `, ${s.byDistance}` : "");

    const ol = $("#list");
    if (!list.length) {
      ol.innerHTML = `<li class="empty">${esc(s.empty)}<br><button type="button" id="resetBtn">${esc(s.reset)}</button></li>`;
      $("#resetBtn").addEventListener("click", resetFilters);
      return;
    }
    ol.innerHTML = list.map((p) => {
      const name = lang === "el" ? p.name : (p.name_en || p.name);
      const mark = p.cat === "fountain"
        ? `<span class="mark drop${p.active ? "" : " off"}" aria-hidden="true">${DROP}</span>`
        : p.green_no
          ? `<span class="mark num" style="--c:${COLORS.green};background:var(--c)" aria-hidden="true">${p.green_no}</span>`
          : `<span class="mark" style="--c:${COLORS[p.cat]}" aria-hidden="true"></span>`;
      const status = p.cat === "fountain" && !p.active ? `, ${s.fountainOff.toLowerCase()}` : "";
      const meta = `${catLabel(p)}, ${p.district || p.street}${status}`;
      return `<li><button class="item" type="button" data-id="${p.id}"${p.id === state.current ? ' aria-current="true"' : ""}>
        ${mark}<span class="item-name"${lang === "en" && !p.name_en ? ' lang="el"' : ""}>${esc(name)}</span>${state.me ? `<span class="item-dist">${fmtDist(p.dist)}</span>` : "<span></span>"}
        <span class="item-meta">${esc(meta)}</span></button></li>`;
    }).join("");
  }

  function markCurrent() {
    document.querySelectorAll(".item[aria-current]").forEach((el) => el.removeAttribute("aria-current"));
    document.querySelectorAll(".pin-num.on").forEach((el) => el.classList.remove("on"));
    if (!state.current) return;
    const btn = document.querySelector(`.item[data-id="${state.current}"]`);
    if (btn) btn.setAttribute("aria-current", "true");
    const p = byId.get(state.current);
    const el = p && p.marker.getElement && p.marker.getElement();
    if (el && el.querySelector(".pin-num")) el.querySelector(".pin-num").classList.add("on");
  }

  function select(id, { fly = true, scroll = true } = {}) {
    const p = byId.get(id);
    if (!p) return;
    state.current = id;
    if (!layer.hasLayer(p.marker)) layer.addLayer(p.marker);
    const open = () => p.marker.openPopup();
    if (fly) {
      map.flyTo([p.lat, p.lon], Math.max(map.getZoom(), 17), { duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6 });
      map.once("moveend", open);
    } else {
      open();
    }
    history.replaceState(null, "", `${location.pathname}${location.search}#p-${id}`);
    markCurrent();
    if (scroll) {
      const btn = document.querySelector(`.item[data-id="${id}"]`);
      if (btn) btn.scrollIntoView({ block: "nearest" });
    }
    if (isMobile()) setSheet("collapsed");
  }

  // A link to a place in a hidden category switches that category on first
  function openFromHash() {
    const m = location.hash.match(/^#p-(\d+)$/);
    const p = m && byId.get(+m[1]);
    if (!p || p.id === state.current) return;
    if (!state.cats.has(p.cat)) {
      state.cats.add(p.cat);
      const box = document.querySelector(`#cats input[value="${p.cat}"]`);
      if (box) box.checked = true;
      render();
    }
    select(p.id);
  }

  function resetFilters() {
    state.q = ""; state.area = ""; state.cats = defaultCats();
    styleZones();
    $("#q").value = ""; $("#community").value = "";
    document.querySelectorAll("#cats input").forEach((i) => { i.checked = true; });
    render();
  }

  /* ---------- Controls ---------- */
  function buildCats() {
    const s = t();
    const counts = Object.fromEntries(CATS.map((c) => [c, places.filter((p) => p.cat === c).length]));
    $("#cats").innerHTML = `<legend class="sr-only">${esc(s.catsLegend)}</legend>` + CATS.map((c) => `
      <label class="cat" style="--c:${COLORS[c]}">
        <input type="checkbox" value="${c}"${state.cats.has(c) ? " checked" : ""}>
        <span class="dot" aria-hidden="true"></span>${esc(s.cats[c])} <span class="n">${counts[c]}</span>
      </label>`).join("");
  }

  function buildCommunities() {
    const s = t();
    const sel = $("#community");
    const zoneCount = (id) => places.filter((p) => p.zones.includes(id)).length;
    sel.innerHTML = `<option value="">${esc(s.allCommunities)}</option>` +
      `<optgroup label="${esc(s.communitiesGroup)}">` +
      [1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}">${esc(s.community(n))}</option>`).join("") +
      `</optgroup>` +
      (zones.length ? `<optgroup label="${esc(s.zonesGroup)}">` +
        zones.slice().reverse().map((z) => `<option value="z:${z.id}">${esc(zoneName(z))} (${zoneCount(z.id)})</option>`).join("") +
        `</optgroup>` : "");
    sel.value = state.area;
  }

  function applyLang() {
    const s = t();
    document.documentElement.lang = lang;
    document.title = s.docTitle;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = s[el.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = s[el.dataset.i18nHtml]; });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = s[el.dataset.i18nPh]; });
    $("#langBtn").textContent = s.langBtn;
    $("#langBtn").setAttribute("aria-label", s.langAria);
    buildCats();
    buildCommunities();
    styleZones();
    render();
    if (state.current) {
      const p = byId.get(state.current);
      if (p && p.marker.isPopupOpen()) p.marker.setPopupContent(popupHtml(p));
    }
  }

  $("#q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("#cats").addEventListener("change", (e) => {
    if (e.target.checked) state.cats.add(e.target.value); else state.cats.delete(e.target.value);
    render();
  });
  $("#community").addEventListener("change", (e) => {
    setArea(e.target.value);
  });
  // Keep fitted areas clear of the bottom sheet on phones
  const fitOpts = (extra = {}) => ({
    duration: matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6,
    paddingTopLeft: [20, 20],
    paddingBottomRight: [20, isMobile() ? panel.offsetHeight + 20 : 20],
    ...extra,
  });

  function setArea(value) {
    state.area = value;
    $("#community").value = value;
    styleZones();
    render();
    const z = value.startsWith("z:") && zones.find((x) => `z:${x.id}` === value);
    const list = filtered();
    const c = /^\d$/.test(value) && comms.find((x) => String(x.no) === value);
    if (z) map.flyToBounds(z.layer.getBounds(), fitOpts());
    else if (c) map.flyToBounds(c.layer.getBounds(), fitOpts());
    else if (value && list.length) map.flyToBounds(L.latLngBounds(list.map((p) => [p.lat, p.lon])), fitOpts());
  }

  $("#list").addEventListener("click", (e) => {
    const btn = e.target.closest(".item");
    if (btn) select(+btn.dataset.id, { scroll: false });
  });
  $("#langBtn").addEventListener("click", () => {
    lang = lang === "el" ? "en" : "el";
    store.set("places-lang", lang);
    applyLang();
  });
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const url = `${location.origin}${location.pathname}${lang === "en" ? "?lang=en" : ""}#p-${b.dataset.copy}`;
    try { await navigator.clipboard.writeText(url); b.textContent = t().copied; }
    catch { prompt(t().copy, url); }
  });

  const nearBtn = $("#nearBtn");
  nearBtn.addEventListener("click", () => {
    if (state.me) {
      state.me = null;
      nearBtn.setAttribute("aria-pressed", "false");
      if (meMarker) { map.removeLayer(meMarker); meMarker = null; }
      render();
      return;
    }
    if (!navigator.geolocation) { alert(t().geoError); return; }
    nearBtn.disabled = true;
    nearBtn.querySelector("span").textContent = t().locating;
    navigator.geolocation.getCurrentPosition((pos) => {
      state.me = [pos.coords.latitude, pos.coords.longitude];
      places.forEach((p) => { p.dist = distanceKm(state.me, [p.lat, p.lon]); });
      nearBtn.disabled = false;
      nearBtn.setAttribute("aria-pressed", "true");
      nearBtn.querySelector("span").textContent = t().near;
      if (meMarker) map.removeLayer(meMarker);
      meMarker = L.circleMarker(state.me, { radius: 8, color: "#fff", weight: 3, fillColor: "#f2b705", fillOpacity: 1 }).addTo(map);
      render();
      const nearest = filtered().slice(0, 5).map((p) => [p.lat, p.lon]);
      map.flyToBounds(L.latLngBounds([state.me, ...nearest]), fitOpts({ maxZoom: 17 }));
    }, () => {
      nearBtn.disabled = false;
      nearBtn.querySelector("span").textContent = t().near;
      alert(t().geoError);
    }, { enableHighAccuracy: true, timeout: 10000 });
  });

  /* ---------- Mobile bottom sheet ---------- */
  const panel = $("#panel");
  const isMobile = () => matchMedia("(max-width: 760px)").matches;
  const sheetOrder = ["collapsed", "default", "expanded"];
  let sheet = "default";
  function setSheet(next) {
    sheet = next;
    panel.classList.toggle("collapsed", next === "collapsed");
    panel.classList.toggle("expanded", next === "expanded");
    $("#panelHandle").setAttribute("aria-expanded", String(next !== "collapsed"));
    setTimeout(() => map.invalidateSize(), 260);
  }
  $("#panelHandle").addEventListener("click", () => {
    setSheet(sheetOrder[(sheetOrder.indexOf(sheet) + 1) % sheetOrder.length]);
  });
  $("#q").addEventListener("focus", () => { if (isMobile()) setSheet("expanded"); });

  /* ---------- Boot ---------- */
  const byId = new Map();
  const getJSON = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); });
  const optional = (url) => getJSON(url).catch(() => ({ features: [] }));
  Promise.all([getJSON("data/places.geojson"), optional("data/zones.geojson"), optional("data/communities.geojson"), optional("data/municipality.geojson")])
    .then(([geo, zoneGeo, commGeo, muniGeo]) => {
      const mf = muniGeo.features[0];
      if (mf) {
        const rings = mf.geometry.coordinates.map((poly) => poly[0].map(([lon, lat]) => [lat, lon]));
        // The veil is a frame around Athens with the city as a hole. It is drawn
        // unclipped: Leaflet's clipping drops the hole when the view sits inside it.
        const bb = L.latLngBounds(rings.flat());
        const frame = bb.pad(4);
        const outer = [frame.getNorthWest(), frame.getNorthEast(), frame.getSouthEast(), frame.getSouthWest()];
        map.setMaxBounds(bb.pad(1.5));
        muni = [
          L.polygon([outer, ...rings], { pane: "muniMask", stroke: false, fillColor: "#1d2433", fillOpacity: 0.2, interactive: false, noClip: true }),
          L.polygon(rings, { pane: "muniLine", color: "#fff", weight: 10, opacity: 0.95, fill: false, interactive: false }),
          L.polygon(rings, { pane: "muniLine", color: MUNI_COLOR, weight: 5, opacity: 1, fill: false, lineJoin: "round", interactive: false }),
        ];
        muni.forEach((l) => l.addTo(muniLayer));
      }
      comms = commGeo.features.map((f) => {
        const c = { no: f.properties.no };
        c.casing = L.geoJSON(f, { style: commCasing(false), interactive: false }).addTo(commLayer);
        c.layer = L.geoJSON(f, { style: commStyle(false), interactive: false }).addTo(commLayer);
        const [lon, lat] = f.properties.label;
        c.label = L.marker([lat, lon], {
          icon: L.divIcon({ className: "", html: `<span class="comm-label">${c.no}η</span>`, iconSize: [34, 22], iconAnchor: [17, 11] }),
          interactive: true, keyboard: false, pane: "commLabels",
        }).on("click", () => setArea(state.area === String(c.no) ? "" : String(c.no))).addTo(commLayer);
        return c;
      });
      zones = zoneGeo.features.map((f) => {
        const z = { id: f.id, ...f.properties, dash: ZONE_DASH[f.id] };
        z.casing = L.geoJSON(f, { style: casingStyle(false), interactive: false }).addTo(zonesLayer);
        z.layer = L.geoJSON(f, { style: zoneStyle(z, false) })
          .bindTooltip(zoneLabel(z), { sticky: true, className: "zone-tip" })
          .on("click", () => setArea(state.area === `z:${z.id}` ? "" : `z:${z.id}`))
          .addTo(zonesLayer);
        return z;
      });
      places = geo.features.map((f) => {
        const p = { id: f.id, ...f.properties, lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] };
        p.search = norm([p.name, p.aka, p.name_en, p.district, p.address, p.green_no ? `#${p.green_no}` : ""].join(" "));
        p.sortEl = p.name.replace(/^ΠΛΑΤΕΙΑ /, "");
        p.marker = makeMarker(p);
        byId.set(p.id, p);
        return p;
      });
      map.fitBounds(muni ? muni[2].getBounds() : L.latLngBounds(places.map((p) => [p.lat, p.lon])), { padding: [16, 16] });
      applyLang();
      openFromHash();
      addEventListener("hashchange", openFromHash);
    })
    .catch(() => {
      $("#count").textContent = lang === "el"
        ? "Τα δεδομένα δεν φόρτωσαν. Ανανέωσε τη σελίδα."
        : "The data did not load. Reload the page.";
    });
})();
