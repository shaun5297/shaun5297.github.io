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
}

const preferredLanguage = window.localStorage.getItem(LANGUAGE_KEY)
  || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");

applyLanguage(preferredLanguage);

toggle?.addEventListener("click", () => {
  applyLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh");
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
