const LANGUAGE_KEY = "yidong-portfolio-language";
const toggle = document.querySelector(".language-toggle");
const enLabel = document.querySelector(".lang-en");
const zhLabel = document.querySelector(".lang-zh");

function applyLanguage(language) {
  const isChinese = language === "zh";
  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.body.classList.toggle("lang-zh", isChinese);

  document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
    element.textContent = isChinese ? element.dataset.zh : element.dataset.en;
  });

  enLabel?.classList.toggle("active", !isChinese);
  zhLabel?.classList.toggle("active", isChinese);
  toggle?.setAttribute("aria-pressed", String(isChinese));
  toggle?.setAttribute("aria-label", isChinese ? "Switch to English" : "切换到中文");
  document.title = isChinese
    ? "Yidong Shen — 机器视觉、具身智能与脑机接口"
    : "Yidong Shen — Computer Vision & Embodied AI";

  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new CustomEvent("languagechange"));
}

const preferredLanguage = window.localStorage.getItem(LANGUAGE_KEY)
  || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

applyLanguage(preferredLanguage);

toggle?.addEventListener("click", () => {
  applyLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const carousel = document.querySelector(".hero-carousel");

if (carousel) {
  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const dots = [...carousel.querySelectorAll(".carousel-dot")];
  const previousButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const headingKicker = carousel.querySelector(".carousel-heading-kicker");
  const headingTitle = carousel.querySelector(".carousel-heading-title");
  const counter = carousel.querySelector(".carousel-counter");
  let activeIndex = 0;
  let autoplayTimer;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    const activeSlide = slides[activeIndex];
    if (headingKicker) headingKicker.textContent = activeSlide.querySelector("figcaption span")?.textContent || "";
    if (headingTitle) headingTitle.textContent = activeSlide.querySelector("figcaption strong")?.textContent || "";
    if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  };

  const stopAutoplay = () => window.clearInterval(autoplayTimer);
  const startAutoplay = () => {
    if (reducedMotion) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(() => showSlide(activeIndex + 1), 5500);
  };

  previousButton?.addEventListener("click", () => {
    showSlide(activeIndex - 1);
    startAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    showSlide(activeIndex + 1);
    startAutoplay();
  });

  dots.forEach((dot, dotIndex) => dot.addEventListener("click", () => {
    showSlide(dotIndex);
    startAutoplay();
  }));

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startAutoplay();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
  window.addEventListener("languagechange", () => showSlide(activeIndex));

  showSlide(0);
  startAutoplay();
}

if (reducedMotion || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
