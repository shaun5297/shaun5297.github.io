const header = document.querySelector(".site-header");
if (header) {
  const onHeaderScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onHeaderScroll();
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
}

const LANGUAGE_KEY = "yidong-portfolio-language";
const toggle = document.querySelector(".language-toggle");
const enLabel = document.querySelector(".lang-en");
const zhLabel = document.querySelector(".lang-zh");
const backToTop = document.querySelector(".back-to-top");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  backToTop?.setAttribute("aria-label", isChinese ? "返回顶部" : "Back to top");
  document.title = isChinese
    ? "Yidong Shen — 视觉与机器人工程师"
    : "Yidong Shen — CV & Robotics Engineer";

  window.localStorage.setItem(LANGUAGE_KEY, language);
  window.dispatchEvent(new CustomEvent("languagechange"));
}

/* 默认英文；仅在用户手动切换后记住选择 */
const preferredLanguage = window.localStorage.getItem(LANGUAGE_KEY) || "en";

applyLanguage(preferredLanguage);

toggle?.addEventListener("click", () => {
  applyLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
});

if (backToTop) {
  const onScroll = () => backToTop.classList.toggle("visible", window.scrollY > 420);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
}

/* ---------- Navigation: back-to-top links + active state ---------- */
const navLinks = [...document.querySelectorAll(".site-header nav a")];
const workAnchor = document.getElementById("work");

/* #top 锚点指向 sticky header 时浏览器可能不滚动，改用 JS 强制回顶 */
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });
});

const setActiveNav = (href) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === href;
    link.classList.toggle("nav-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => setActiveNav(link.getAttribute("href")));
});

/* Scroll-spy: 高亮当前浏览区域的导航项 */
const updateNavSpy = () => {
  if (!workAnchor) return;
  const workTop = workAnchor.getBoundingClientRect().top + window.scrollY - 170;
  setActiveNav(window.scrollY >= workTop ? "#work" : "#top");
};
window.addEventListener("scroll", updateNavSpy, { passive: true });
updateNavSpy();

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
