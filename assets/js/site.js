(function () {
  "use strict";

  const STORAGE_KEY = "desktop-pet-studio-site-language";
  const supported = ["zh-Hant", "zh-Hans", "en"];
  const labels = {
    "zh-Hant": { product: "產品介紹", privacy: "隱私權政策", terms: "使用條款", support: "支援資訊", language: "語言", menu: "開啟導覽選單", closeMenu: "關閉導覽選單", skip: "跳至主要內容", copyright: "DesktopPetStudio. 保留所有權利。", launch: "發布前設定" },
    "zh-Hans": { product: "产品介绍", privacy: "隐私政策", terms: "使用条款", support: "支持信息", language: "语言", menu: "打开导航菜单", closeMenu: "关闭导航菜单", skip: "跳至主要内容", copyright: "DesktopPetStudio. 保留所有权利。", launch: "发布前设置" },
    en: { product: "Product", privacy: "Privacy", terms: "Terms", support: "Support", language: "Language", menu: "Open navigation menu", closeMenu: "Close navigation menu", skip: "Skip to main content", copyright: "DesktopPetStudio. All rights reserved.", launch: "Pre-launch settings" }
  };

  function initialLanguage() {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (supported.includes(saved)) return saved;
    return navigator.language.toLowerCase().startsWith("zh") ? "zh-Hant" : "en";
  }

  function setLanguage(language) {
    const lang = supported.includes(language) ? language : "zh-Hant";
    document.documentElement.lang = lang === "zh-Hans" ? "zh-CN" : lang === "zh-Hant" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-lang-content]").forEach((element) => {
      const isSelected = element.dataset.langContent === lang;
      element.hidden = !isSelected;
      if (isSelected) {
        element.classList.add("is-visible");
        element.querySelectorAll("[data-reveal]").forEach((child) => child.classList.add("is-visible"));
      }
    });
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const message = labels[lang][element.dataset.i18n];
      if (message) element.textContent = message;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const message = labels[lang][element.dataset.i18nAria];
      if (message) element.setAttribute("aria-label", message);
    });
    document.querySelectorAll(".language-select").forEach((select) => { select.value = lang; });
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  function setupMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.dataset.i18nAria = isOpen ? "closeMenu" : "menu";
      const language = initialLanguage();
      toggle.setAttribute("aria-label", labels[language][toggle.dataset.i18nAria]);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  function renderPublicConfig() {
    const config = window.DESKTOP_PET_SITE_CONFIG || {};
    const email = String(config.supportEmail || "").trim();
    const supportUrl = String(config.supportUrl || "").trim();
    const hasEmail = email && !email.includes("REPLACE_WITH_");
    const hasSupportUrl = /^https:\/\//.test(supportUrl) && !supportUrl.includes("REPLACE_WITH_");
    document.querySelectorAll("[data-config-publisher]").forEach((element) => {
      const value = String(config.publisherName || "").trim();
      if (value && !value.includes("REPLACE_WITH_")) element.textContent = value;
    });
    if (hasEmail) {
      document.querySelectorAll("[data-config-email]").forEach((element) => {
        element.hidden = false;
        element.innerHTML = "";
        const link = document.createElement("a");
        link.href = "mailto:" + email;
        link.className = "config-email";
        link.textContent = email;
        element.appendChild(link);
      });
    }
    if (hasSupportUrl) {
      document.querySelectorAll("[data-config-support-url]").forEach((element) => {
        element.hidden = false;
        element.innerHTML = "";
        const link = document.createElement("a");
        link.href = supportUrl;
        link.className = "config-email";
        link.textContent = "GitHub Issues";
        link.rel = "noopener noreferrer";
        link.target = "_blank";
        element.appendChild(link);
      });
    }
    if (hasEmail || hasSupportUrl) {
      document.querySelectorAll("[data-support-pending]").forEach((element) => { element.hidden = true; });
    }
  }

  function setupMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll(
      ".hero-content, .feature-card, .step, .image-stage, .support-banner, .faq-list, .legal-copy"
    ));
    if (!targets.length) return;

    document.documentElement.classList.add("motion-ready");
    targets.forEach((target, index) => {
      target.dataset.reveal = "";
      target.style.setProperty("--reveal-order", String(index % 4));
    });

    const reveal = (target) => target.classList.add("is-visible");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    targets.forEach((target) => {
      if (!target.closest("[hidden]")) observer.observe(target);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const language = initialLanguage();
    document.querySelectorAll(".language-select").forEach((select) => {
      select.addEventListener("change", (event) => setLanguage(event.target.value));
    });
    setupMenu();
    renderPublicConfig();
    document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
    setLanguage(language);
    setupMotion();
  });
}());
