/* ============================================
   Hero Slideshow
   - First slide fills the stage on load
   - Click a thumbnail → it becomes large with its content
   - Autoplay every 6 seconds
   - Prev / next arrows + keyboard
   ============================================ */

(function () {
  "use strict";

  const slides = Array.from(document.querySelectorAll(".slide"));
  const thumbs = Array.from(document.querySelectorAll(".thumb"));
  const prevBtn = document.querySelector(".controls .prev");
  const nextBtn = document.querySelector(".controls .next");
  const slider = document.querySelector(".slider");

  if (!slides.length) return;

  const AUTOPLAY_MS = 6000;
  let current = 0;
  let timer = null;

  function setActive(index) {
    index = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("is-active", i === index);
    });

    thumbs.forEach(function (thumb, i) {
      const active = i === index;
      thumb.classList.toggle("is-active", active);
      thumb.setAttribute("aria-selected", String(active));
    });

    current = index;
  }

  function next() { setActive(current + 1); }
  function prev() { setActive(current - 1); }

  function startAutoplay() {
    stopAutoplay();
    timer = window.setInterval(next, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  /* Thumbnail click */
  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () {
      if (i === current) return;
      setActive(i);
      startAutoplay();
    });
  });

  /* Arrows */
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      next();
      startAutoplay();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prev();
      startAutoplay();
    });
  }

  /* Pause on hover */
  if (slider) {
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);
  }

  /* Keyboard */
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") { next(); startAutoplay(); }
    else if (event.key === "ArrowLeft") { prev(); startAutoplay(); }
  });

  /* Init */
  setActive(0);
  startAutoplay();
})();