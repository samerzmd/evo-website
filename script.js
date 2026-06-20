(function () {
  "use strict";
  var dict = window.EVO_I18N || { en: {}, ar: {} };

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
        applyLang(b.getAttribute("data-lang"));
        closeLang();
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
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          statusEl.className = "cform__status err";
          statusEl.textContent = t("contact.error");
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  /* ---------- init ---------- */
  applyLang(lang);
})();
