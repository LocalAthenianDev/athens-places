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
      communityLabel: "Δημοτική κοινότητα",
      allCommunities: "Όλες οι κοινότητες",
      community: (n) => `${n}η Δημοτική Κοινότητα`,
      communityShort: (n) => `${n}η Κοινότητα`,
      near: "Κοντά μου",
      locating: "Εντοπισμός…",
      geoError: "Δεν βρέθηκε η θέση σου. Έλεγξε ότι ο browser έχει άδεια τοποθεσίας.",
      count: (n, total) => n === total ? `${total} τόποι` : `${n} από ${total} τόπους`,
      byDistance: "ταξινόμηση κατά απόσταση",
      empty: "Κανένας τόπος δεν ταιριάζει στα φίλτρα.",
      reset: "Καθαρισμός φίλτρων",
      cats: { square: "Πλατείες", landmark: "Τοπόσημα", monument: "Μνημεία", green: "Πράσινο & ελεύθεροι χώροι" },
      cat1: { square: "Πλατεία", landmark: "Τοπόσημο", monument: "Μνημείο", green: "Χώρος πρασίνου" },
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
      source: 'Δεδομένα από την <a href="https://opendata.cityofathens.gr/dataset/gis-athens-cf2c2f7a-88c0-11ec-8393-0242ac120006">Πύλη Ανοιχτών Δεδομένων του Δήμου Αθηναίων</a>. Χάρτης © συντελεστές <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>.',
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
      communityLabel: "Municipal community",
      allCommunities: "All communities",
      community: (n) => `${ordinal(n)} Municipal Community`,
      communityShort: (n) => `${ordinal(n)} Community`,
      near: "Near me",
      locating: "Locating…",
      geoError: "Your location could not be found. Check that the browser has location permission.",
      count: (n, total) => n === total ? `${total} places` : `${n} of ${total} places`,
      byDistance: "sorted by distance",
      empty: "No place matches these filters.",
      reset: "Clear filters",
      cats: { square: "Squares", landmark: "Landmarks", monument: "Monuments", green: "Green & open spaces" },
      cat1: { square: "Square", landmark: "Landmark", monument: "Monument", green: "Green space" },
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
      source: 'Data from the <a href="https://opendata.cityofathens.gr/dataset/gis-athens-cf2c2f7a-88c0-11ec-8393-0242ac120006">City of Athens Open Data Portal</a>. Map © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
      about: 'An independent open source app, not an official City of Athens app. Part of <a href="https://athensapps.gr/">athensapps.gr</a>, code on <a href="https://github.com/LocalAthenianDev/athens-places">GitHub</a>.',
      docTitle: "Athens Places | Τόποι της Αθήνας",
    },
  };
  function ordinal(n) {
    const s = { 1: "st", 2: "nd", 3: "rd" }[n] || "th";
    return `${n}${s}`;
  }

  const CATS = ["square", "landmark", "monument", "green"];
  const COLORS = {
    square: "#2f6fd6", landmark: "#7d4cb8", monument: "#a3441f", green: "#2e7d4f",
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
  const state = { q: "", cats: new Set(CATS), community: "", me: null, current: null };
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
  const layer = L.layerGroup().addTo(map);
  let meMarker = null;

  function makeMarker(p) {
    const ll = [p.lat, p.lon];
    let m;
    if (p.cat === "green" && p.green_no) {
      m = L.marker(ll, {
        icon: L.divIcon({ className: "", html: `<span class="pin-num">${p.green_no}</span>`, iconSize: [24, 24], iconAnchor: [12, 12], popupAnchor: [0, -10] }),
        keyboard: false,
      });
    } else {
      m = L.circleMarker(ll, {
        radius: p.cat === "square" ? 5.5 : 7,
        color: "#fff", weight: 2,
        fillColor: COLORS[p.cat], fillOpacity: 1,
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
    const rows = [
      [s.district, p.district],
      [s.communityDt, s.communityShort(p.community)],
    ];
    if (p.green_no) rows.push([s.greenNo, p.green_no]);
    if (p.aka) rows.unshift([s.aka, p.aka]);
    const osm = `https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=18/${p.lat}/${p.lon}`;
    const dir = `https://www.openstreetmap.org/directions?route=%3B${p.lat}%2C${p.lon}`;
    const dist = state.me ? ` <span class="item-dist">${fmtDist(p.dist)}</span>` : "";
    return `
      <div class="pop-sign">
        <span class="pop-name">${esc(nameMain)}</span>
        ${nameAlt ? `<span class="pop-en">${esc(nameAlt)}</span>` : ""}
      </div>
      <div class="pop-body">
        <span class="pop-cat" style="--c:${COLORS[p.cat]}"><i></i>${esc(s.cat1[p.cat])}</span>${dist}
        <dl>${rows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
        <div class="pop-links">
          <a href="${dir}" target="_blank" rel="noopener">${esc(s.directions)}</a>
          <a href="${osm}" target="_blank" rel="noopener">${esc(s.osm)}</a>
          <button type="button" data-copy="${p.id}">${esc(s.copy)}</button>
        </div>
      </div>`;
  }

  /* ---------- Filtering & list ---------- */
  const collator = () => new Intl.Collator(lang, { sensitivity: "base", numeric: true });

  function filtered() {
    const q = norm(state.q);
    const words = q ? q.split(" ") : [];
    let out = places.filter((p) =>
      state.cats.has(p.cat) &&
      (!state.community || p.community === +state.community) &&
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
      const mark = p.green_no
        ? `<span class="mark num" style="--c:${COLORS.green};background:var(--c)" aria-hidden="true">${p.green_no}</span>`
        : `<span class="mark" style="--c:${COLORS[p.cat]}" aria-hidden="true"></span>`;
      const meta = `${s.cat1[p.cat]}, ${p.district}`;
      return `<li><button class="item" type="button" data-id="${p.id}"${p.id === state.current ? ' aria-current="true"' : ""}>
        ${mark}<span class="item-name">${esc(name)}</span>${state.me ? `<span class="item-dist">${fmtDist(p.dist)}</span>` : "<span></span>"}
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

  function resetFilters() {
    state.q = ""; state.community = ""; state.cats = new Set(CATS);
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
    sel.innerHTML = `<option value="">${esc(s.allCommunities)}</option>` +
      [1, 2, 3, 4, 5, 6, 7].map((n) => `<option value="${n}">${esc(s.community(n))}</option>`).join("");
    sel.value = state.community;
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
    state.community = e.target.value;
    render();
    const list = filtered();
    if (state.community && list.length) map.flyToBounds(L.latLngBounds(list.map((p) => [p.lat, p.lon])).pad(0.15), { duration: 0.6 });
  });
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
      map.flyToBounds(L.latLngBounds([state.me, ...nearest]).pad(0.25), { duration: 0.6, maxZoom: 17 });
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
  fetch("data/places.geojson")
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((geo) => {
      places = geo.features.map((f) => {
        const p = { id: f.id, ...f.properties, lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1] };
        p.search = norm([p.name, p.aka, p.name_en, p.district, p.green_no ? `#${p.green_no}` : ""].join(" "));
        p.sortEl = p.name.replace(/^ΠΛΑΤΕΙΑ /, "");
        p.marker = makeMarker(p);
        byId.set(p.id, p);
        return p;
      });
      map.fitBounds(L.latLngBounds(places.map((p) => [p.lat, p.lon])).pad(0.03));
      applyLang();
      const m = location.hash.match(/^#p-(\d+)$/);
      if (m) select(+m[1]);
    })
    .catch(() => {
      $("#count").textContent = lang === "el"
        ? "Τα δεδομένα δεν φόρτωσαν. Ανανέωσε τη σελίδα."
        : "The data did not load. Reload the page.";
    });
})();
