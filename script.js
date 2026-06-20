(function () {
  "use strict";
  var dict = window.EVO_I18N || { en: {}, ar: {} };

  /* ---------- professional line-icon set (injected into [data-icon]) ---------- */
  var ICONS = {
    map: '<path d="M12 21s-6-5.1-6-10a6 6 0 0 1 12 0c0 4.9-6 10-6 10Z"/><circle cx="12" cy="11" r="2.3"/>',
    pin: '<path d="M12 21s-6-5.1-6-10a6 6 0 0 1 12 0c0 4.9-6 10-6 10Z"/><circle cx="12" cy="11" r="2.3"/>',
    qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><path d="M14 14h3v3M20.5 14v.01M14 20.5h.01M20.5 20.5v-3M17 20.5h.01"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.2"/>',
    activity: '<path d="M3 12h3.5l2.5 7 4-14 2.5 7H21"/>',
    award: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13 7 21l5-2.6L17 21l-1.5-8"/>',
    car: '<path d="M5 11l1.6-4.1A2 2 0 0 1 8.5 5.6h7a2 2 0 0 1 1.9 1.3L19 11"/><path d="M3.5 11h17v5.4a.8.8 0 0 1-.8.8H18a.8.8 0 0 1-.8-.8V16H6.8v.4a.8.8 0 0 1-.8.8H4.3a.8.8 0 0 1-.8-.8V11Z"/><path d="M7 14.2h.01M17 14.2h.01"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/>',
    nodes: '<circle cx="6" cy="12" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.2 10.9 15.8 7.1M8.2 13.1 15.8 16.9"/>',
    broadcast: '<circle cx="12" cy="12" r="2"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 15.5a5 5 0 0 0 0-7M6 6a9 9 0 0 0 0 12M18 18a9 9 0 0 0 0-12"/>',
    chat: '<path d="M20.5 11.4a8 8 0 0 1-11.6 7.1L4 20l1.5-4.8A8 8 0 1 1 20.5 11.4Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    receipt: '<path d="M6 3.5h12V21l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3.5Z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17"/>',
    server: '<rect x="3.5" y="4" width="17" height="6.5" rx="1.5"/><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5"/><path d="M7 7.2h.01M7 16.7h.01M10 7.2h3M10 16.7h3"/>',
    gauge: '<path d="M4 15a8 8 0 0 1 16 0"/><path d="M12 15l3.5-3.2"/><circle cx="12" cy="15" r="1"/>',
    truck: '<path d="M3 6.5h10.5v9H3z"/><path d="M13.5 9.5H17l3.5 3.3v2.7h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17.3" cy="17.5" r="1.6"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3.8 19a5.2 5.2 0 0 1 10.4 0"/><path d="M16 5.3a3 3 0 0 1 0 5.8M20.5 19a5 5 0 0 0-3.7-4.8"/>',
    phone: '<path d="M6 3.5h2.6l1.7 4.3-2 1.2a10.5 10.5 0 0 0 4.7 4.7l1.2-2 4.3 1.7V18a2.5 2.5 0 0 1-2.7 2.5C12 20 4 12 3.5 6.2A2.5 2.5 0 0 1 6 3.5Z"/>',
    chart: '<path d="M3.5 20.5h17"/><rect x="5" y="11" width="3" height="6.5" rx=".6"/><rect x="10.5" y="6.5" width="3" height="11" rx=".6"/><rect x="16" y="13.5" width="3" height="4" rx=".6"/>',
    wrench: '<path d="M15 5.2a3.6 3.6 0 0 0-4.7 4.5l-5.6 5.6a1.5 1.5 0 0 0 0 2.1l.9.9a1.5 1.5 0 0 0 2.1 0l5.6-5.6A3.6 3.6 0 0 0 17.8 8l-2 2-1.8-1.8 2-2Z"/>',
    cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"/><path d="M10.5 12.5 12 14l1.5-3"/>',
    flag: '<path d="M5.5 21V4"/><path d="M5.5 4.5h11l-1.6 3.2L16.5 11h-11"/>',
    coins: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v10M14.2 9.3a2.2 2.2 0 0 0-2.2-1.3c-1.4 0-2.4.8-2.4 2 0 2.8 5 1.4 5 4.2 0 1.2-1 2-2.6 2a2.3 2.3 0 0 1-2.4-1.4"/>',
    translate: '<path d="M4 5.5h7"/><path d="M7.5 4v1.5c0 3.6-1.7 6.4-3.5 7.5"/><path d="M5 9.2c.2 2 2.3 4.2 5.5 5"/><path d="M11.5 20.5 15.5 11l4 9.5"/><path d="M13 17.2h5"/>',
    roaming: '<path d="M4 9a8 8 0 0 1 13.3-3.3L20 8"/><path d="M20 15a8 8 0 0 1-13.3 3.3L4 16"/><path d="M20 4.5V8h-3.5M4 19.5V16h3.5"/>',
    station: '<rect x="5.5" y="3.5" width="9" height="17" rx="1.5"/><path d="M8 7h4M8 10h4"/><path d="M14.5 8h2l1.8 1.8v5.4a1.5 1.5 0 0 1-3 0V12h-1.3"/>',
    buildings: '<path d="M3 21V8.5l6-3v15.5"/><path d="M9 21V11l6-2.8V21"/><path d="M15 21v-9l5 2.3V21"/><path d="M2.5 21h19"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7.5 8.5 5.5 8.5-5.5"/>',
    leaf: '<path d="M4 20s.5-7 5-11.5C13 4.5 20 4 20 4s.5 7-4 11.5C11.5 20 4 20 4 20Z"/><path d="M4 20c3-4.5 6.5-7 11-9"/>'
  };
  function injectIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (!ICONS[name] || el.querySelector("svg")) return;
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICONS[name] + "</svg>";
    });
  }

  /* ---------- language ---------- */
  var SUPPORTED = ["en", "ar", "zh", "th", "fr"];
  var SHORT = { en: "EN", ar: "عربي", zh: "中文", th: "ไทย", fr: "FR" };
  function detect() {
    var n = (navigator.language || "en").toLowerCase();
    if (n.indexOf("ar") === 0) return "ar";
    if (n.indexOf("zh") === 0) return "zh";
    if (n.indexOf("th") === 0) return "th";
    if (n.indexOf("fr") === 0) return "fr";
    return "en";
  }
  var saved = null;
  try { saved = localStorage.getItem("evo_lang"); } catch (e) {}
  var lang = (SUPPORTED.indexOf(saved) >= 0 ? saved : null) || detect();

  function applyLang(l) {
    if (SUPPORTED.indexOf(l) < 0) l = "en";
    lang = l;
    var html = document.documentElement;
    html.setAttribute("lang", l);
    html.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
    var table = dict[l] || {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (table[key] != null) el.innerHTML = table[key];
    });
    document.querySelectorAll("[data-ph]").forEach(function (el) {
      var key = el.getAttribute("data-ph");
      if (table[key] != null) el.setAttribute("placeholder", table[key]);
    });
    var cur = document.getElementById("langCurrent");
    if (cur) cur.textContent = SHORT[l] || l.toUpperCase();
    document.querySelectorAll("#langMenu [data-lang]").forEach(function (b) {
      b.setAttribute("aria-selected", b.getAttribute("data-lang") === l ? "true" : "false");
    });
    try { localStorage.setItem("evo_lang", l); } catch (e) {}
    runCounters(true); // re-render numbers in correct numerals
  }

  /* language dropdown */
  var langBtn = document.getElementById("langBtn");
  var langMenu = document.getElementById("langMenu");
  function closeLang() {
    if (langMenu) langMenu.classList.remove("open");
    if (langBtn) langBtn.setAttribute("aria-expanded", "false");
  }
  if (langBtn && langMenu) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = langMenu.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    langMenu.querySelectorAll("[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () {
        var l = b.getAttribute("data-lang");
        applyLang(l);
        closeLang();
        if (window.evoTrack) window.evoTrack("language_change", { language: l });
      });
    });
    document.addEventListener("click", function (e) {
      if (!langMenu.contains(e.target) && e.target !== langBtn) closeLang();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLang();
    });
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () { navLinks.classList.toggle("open"); });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  /* ---------- persona tabs ---------- */
  var ptabs = document.querySelectorAll(".ptab");
  var ppanels = document.querySelectorAll(".ppanel");
  ptabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var key = tab.getAttribute("data-ptab");
      ptabs.forEach(function (x) {
        var on = x === tab;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-selected", on ? "true" : "false");
      });
      ppanels.forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-ppanel") === key);
      });
      if (window.evoTrack) window.evoTrack("persona_select", { persona: key });
    });
  });

  /* ---------- sticky nav shadow ---------- */
  var nav = document.getElementById("nav");
  window.addEventListener("scroll", function () {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + "s";
    io.observe(el);
  });

  /* ---------- animated counters (Arabic-aware numerals) ---------- */
  var counterEls = Array.prototype.slice.call(document.querySelectorAll("[data-counter]"));
  var counted = false;
  function toNumerals(str) {
    if (lang !== "ar") return str;
    var map = { "0":"٠","1":"١","2":"٢","3":"٣","4":"٤","5":"٥","6":"٦","7":"٧","8":"٨","9":"٩" };
    return String(str).replace(/[0-9]/g, function (d) { return map[d]; });
  }
  function renderCounter(el, val) {
    var suffix = (lang === "ar" && el.getAttribute("data-suffix-ar")) || el.getAttribute("data-suffix") || "";
    el.textContent = toNumerals(Math.round(val).toLocaleString("en-US")) + suffix;
  }
  function runCounters(forceFinal) {
    counterEls.forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-counter"));
      var divide = parseFloat(el.getAttribute("data-divide")) || 1;
      var finalVal = target / divide;
      if (forceFinal) { renderCounter(el, finalVal); return; }
      var start = null, dur = 1600;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        renderCounter(el, finalVal * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var statBand = document.querySelector(".network") || document.body;
  var co = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !counted) { counted = true; runCounters(false); }
    });
  }, { threshold: 0.3 });
  if (statBand) co.observe(statBand);

  /* ---------- lightweight QR placeholder (deterministic grid) ---------- */
  function drawQR(box) {
    if (!box) return;
    var n = 21, cell = 8, pad = 3;
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    var size = n * cell + pad * 2 * cell;
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    svg.setAttribute("width", "100%"); svg.setAttribute("height", "100%");
    var bg = document.createElementNS(svgNS, "rect");
    bg.setAttribute("width", size); bg.setAttribute("height", size); bg.setAttribute("fill", "#fff");
    svg.appendChild(bg);
    // pseudo-random but fixed pattern (looks like a QR; not scannable — decorative)
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    function finder(ox, oy) {
      [[0,0,7,"#0c4543"],[1,1,5,"#fff"],[2,2,3,"#0c4543"]].forEach(function (f) {
        var r = document.createElementNS(svgNS, "rect");
        r.setAttribute("x", (ox + f[0] + pad) * cell);
        r.setAttribute("y", (oy + f[1] + pad) * cell);
        r.setAttribute("width", f[2] * cell); r.setAttribute("height", f[2] * cell);
        r.setAttribute("fill", f[3]); r.setAttribute("rx", 2);
        svg.appendChild(r);
      });
    }
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        var inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
        if (inFinder) continue;
        if (rnd() > 0.55) {
          var c = document.createElementNS(svgNS, "rect");
          c.setAttribute("x", (x + pad) * cell); c.setAttribute("y", (y + pad) * cell);
          c.setAttribute("width", cell); c.setAttribute("height", cell);
          c.setAttribute("fill", rnd() > 0.4 ? "#0c4543" : "#0d7956");
          svg.appendChild(c);
        }
      }
    }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
    box.appendChild(svg);
  }
  drawQR(document.getElementById("qrBox"));

  /* ---------- contact form (FormSubmit AJAX -> multiple recipients) ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    var statusEl = document.getElementById("cformStatus");
    var btn = document.getElementById("cformBtn");
    var ENDPOINT = "https://formsubmit.co/ajax/bilal@evoapp.org";
    var t = function (k) { return (dict[lang] && dict[lang][k]) || (dict.en && dict.en[k]) || ""; };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form._honey && form._honey.value) return; // bot trap
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
        _cc: "ibrahim@evoapp.org,dev@evoapp.org",
        _subject: "New EVO website enquiry" + (form.subject.value.trim() ? " — " + form.subject.value.trim() : ""),
        _template: "table"
      };

      btn.disabled = true;
      statusEl.className = "cform__status";
      statusEl.textContent = t("contact.sending");
      track("contact_submit", { subject: payload.subject || "(none)" });

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok, d: d }; }); })
        .then(function (res) {
          if (res.ok && (res.d.success === "true" || res.d.success === true)) {
            statusEl.className = "cform__status ok";
            statusEl.textContent = t("contact.success");
            form.reset();
            track("generate_lead", { form: "contact" });
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          statusEl.className = "cform__status err";
          statusEl.textContent = t("contact.error");
          track("contact_error");
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  /* ---------- analytics (GA4 custom events) ---------- */
  function track(name, params) {
    try { if (typeof window.gtag === "function") window.gtag("event", name, params || {}); } catch (e) {}
  }
  window.evoTrack = track;

  // outbound + CTA click tracking (delegated)
  document.addEventListener("click", function (e) {
    var el = e.target.closest("a, button");
    if (!el) return;
    var href = el.getAttribute("href") || "";
    if (href.indexOf("wa.me") > -1) return track("whatsapp_click", { location: el.classList.contains("wa-fab") ? "floating" : "contact" });
    if (href.indexOf("apps.apple.com") > -1) return track("store_click", { store: "app_store" });
    if (href.indexOf("play.google.com") > -1) return track("store_click", { store: "google_play" });
    if (href.indexOf("linkedin.com") > -1) return track("team_linkedin_click", { url: href });
    var key = el.getAttribute("data-i18n") || "";
    if (key === "hero.cta1" || key === "nav.download" || key === "cta.btn" || key === "app.title" || key === "per.driver.cta")
      return track("app_cta_click", { label: el.textContent.trim() });
    if (key === "biz.cta" || key === "per.network.cta" || key === "per.owner.cta" || key === "per.fleet.cta")
      return track("partner_cta_click", { label: el.textContent.trim() });
    if (href.indexOf("mailto:") === 0) return track("email_click");
    if (href.indexOf("tel:") === 0) return track("phone_click");
    if (el.matches(".nav__links a")) return track("nav_click", { target: href.replace("#", "") });
  });

  // FAQ opens
  document.querySelectorAll(".qa").forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (d.open) {
        var q = d.querySelector("summary");
        track("faq_open", { question: q ? q.textContent.trim().slice(0, 80) : "" });
      }
    });
  });

  /* ---------- cookie consent (GA Consent Mode v2) ---------- */
  var consentEl = document.getElementById("consent");
  if (consentEl) {
    var stored = null;
    try { stored = localStorage.getItem("evo_consent"); } catch (e) {}
    function setConsent(choice) {
      try { localStorage.setItem("evo_consent", choice); } catch (e) {}
      if (typeof window.gtag === "function") {
        var granted = choice === "granted";
        window.gtag("consent", "update", {
          ad_storage: granted ? "granted" : "denied",
          ad_user_data: granted ? "granted" : "denied",
          ad_personalization: granted ? "granted" : "denied",
          analytics_storage: granted ? "granted" : "denied"
        });
      }
      track("consent_" + (choice === "granted" ? "accept" : "decline"));
      consentEl.hidden = true;
    }
    if (stored !== "granted" && stored !== "denied") consentEl.hidden = false;
    var acc = document.getElementById("consentAccept");
    var dec = document.getElementById("consentDecline");
    if (acc) acc.addEventListener("click", function () { setConsent("granted"); });
    if (dec) dec.addEventListener("click", function () { setConsent("denied"); });
  }

  /* ---------- init ---------- */
  injectIcons();
  applyLang(lang);
})();
