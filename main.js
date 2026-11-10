// Dr. Ahmed Bekhet | Learn Arabic: small site helpers (no libraries).

// Where form messages go. Replace with Dr. Ahmed's real address.
var CONTACT_EMAIL = "hello@drahmedbekhet.com";

// Mobile menu
var navEl = document.querySelector("nav.top");
var menuBtn = document.querySelector(".menu-btn");
if (navEl && menuBtn) {
  menuBtn.addEventListener("click", function () {
    var open = navEl.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

// Videos: click a thumbnail to load the YouTube player.
// To publish a video, put its YouTube id in data-yt, e.g. data-yt="dQw4w9WgXcQ".
document.querySelectorAll(".vthumb").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var id = btn.getAttribute("data-yt");
    if (!id) {
      var s = btn.querySelector(".soon");
      if (s) { s.textContent = "Video coming soon"; }
      return;
    }
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    f.title = btn.getAttribute("aria-label") || "Video";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    btn.replaceChildren(f);
  });
});

// Filter buttons (videos and articles pages)
document.querySelectorAll(".filters").forEach(function (bar) {
  var target = document.querySelector(bar.getAttribute("data-target"));
  bar.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () {
      bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      var f = b.getAttribute("data-filter");
      target.querySelectorAll("[data-cat]").forEach(function (item) {
        item.hidden = f !== "all" && item.getAttribute("data-cat") !== f;
      });
    });
  });
});

// Forms open the visitor's email app with the details filled in.
document.querySelectorAll("form[data-mail]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var lines = [];
    Array.prototype.forEach.call(form.elements, function (el) {
      if (el.name && el.value) { lines.push(el.name + ": " + el.value); }
    });
    var subject = form.getAttribute("data-mail");
    window.location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n"));
    var t = form.parentNode.querySelector(".thanks");
    if (t) { t.hidden = false; }
  });
});

// Pre-select a course on the booking page from ?course=...
var params = new URLSearchParams(window.location.search);
var courseSel = document.getElementById("course");
if (courseSel && params.get("course")) { courseSel.value = params.get("course"); }

var yr = document.getElementById("yr");
if (yr) { yr.textContent = new Date().getFullYear(); }
