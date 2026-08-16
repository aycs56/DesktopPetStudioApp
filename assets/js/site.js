(function () {
  "use strict";

  const STORAGE_KEY = "desktop-pet-studio-site-language";
  const supported = ["zh-Hant", "zh-Hans", "en"];
  const languagePickerCodes = { "zh-Hant": "繁", "zh-Hans": "简", en: "EN" };
  const labels = {
    "zh-Hant": { product: "產品介紹", streamer: "實況模式", createPet: "製作專屬桌寵", makePetTutorial: "製作專屬桌寵教學", workshop: "自訂與工作坊", privacy: "隱私權政策", terms: "使用條款", support: "支援資訊", language: "語言", menu: "開啟導覽選單", closeMenu: "關閉導覽選單", skip: "跳至主要內容", copyright: "DesktopPetStudio. 保留所有權利。", launch: "發布前設定" },
    "zh-Hans": { product: "产品介绍", streamer: "主播模式", createPet: "制作专属桌宠", makePetTutorial: "制作专属桌宠教学", workshop: "自定义与创意工坊", privacy: "隐私政策", terms: "使用条款", support: "支持信息", language: "语言", menu: "打开导航菜单", closeMenu: "关闭导航菜单", skip: "跳至主要内容", copyright: "DesktopPetStudio. 保留所有权利。", launch: "发布前设置" },
    en: { product: "Product", streamer: "Streamer Mode", createPet: "Make Your Pet", makePetTutorial: "Make your own pet guide", workshop: "Customize & Workshop", privacy: "Privacy", terms: "Terms", support: "Support", language: "Language", menu: "Open navigation menu", closeMenu: "Close navigation menu", skip: "Skip to main content", copyright: "DesktopPetStudio. All rights reserved.", launch: "Pre-launch settings" }
  };

  const creatorTopicCatalogs = {
    "zh-Hant": {
      heading: "8 個主題，各有可直接參考的 JSON 範例",
      lead: "先從最想做的一項開始。以下片段可配合完整創作者指南使用，欄位會以目前版本支援的安全 JSON 設定為準。",
      cardLink: "查看對應 JSON 範例",
      topics: [
        { id: "character", title: "角色與動畫", description: "以姿勢包帶入多張動畫影格，並設定播放速度。", code: "{\n  \"type\": \"pose\",\n  \"pose\": {\n    \"animation_paths\": [\"assets/idle_01.png\", \"...\"],\n    \"playback_speed\": 1.0\n  }\n}" },
        { id: "movement", title: "移動與動作演出", description: "使用白名單的移動參數，安全設定走動、巡邏、跳躍或漂浮。", code: "\"movement\": {\n  \"enabled\": true,\n  \"mode\": \"patrol\",\n  \"speed\": 1.1,\n  \"distance_px\": 380,\n  \"gravity\": false\n}" },
        { id: "dialogue", title: "氣泡、音效與快捷鍵", description: "替同一個姿勢安排隨機對話、WAV 音效與建議快捷鍵。", code: "\"sound_path\": \"assets/chime.wav\",\n\"hotkey\": \"F6\",\n\"hotkey_enabled\": true,\n\"bubble_texts\": [\"嗨，今天也一起加油！\", \"需要我提醒你嗎？\"],\n\"bubble_interval_sec\": 30" },
        { id: "focus", title: "專注模式與按鍵反應", description: "完整桌寵可提供固定專注姿勢與可選的按鍵速度氣泡。", code: "\"focus\": {\n  \"animation_paths\": [\"assets/focus_01.png\", \"...\"],\n  \"playback_speed\": 1.0,\n  \"focus_key_speed_enabled\": true,\n  \"focus_key_speed_prefix\": \"按鍵速度 \",\n  \"focus_key_speed_suffix\": \"，主人手速快到出現殘影!!\"\n}" },
        { id: "twitch", title: "Twitch Bits 實況反應", description: "用金額範圍與持續秒數觸發專屬姿勢，不包含任何帳號或權杖。", code: "\"twitch_trigger\": {\n  \"enabled\": true,\n  \"min_bits\": 100,\n  \"max_bits\": 499,\n  \"duration_sec\": 8,\n  \"bubble_texts\": [\"感謝 {viewer_name} 的 {amount} {currency}！\"]\n}" },
        { id: "ai", title: "AI 素材提示與多語系", description: "提供多語系 Prompt，清楚要求至少六格、中心點對齊的宮格動畫素材。", code: "\"ai_asset_prompts\": [{\n  \"id\": \"wave_prompt\",\n  \"pose_id\": \"wave\",\n  \"zh\": \"輸出至少六格的透明背景動畫宮格；每格中心點對齊、間距 5px，並以 #00D9FF 虛線只標記裁切邊框。\",\n  \"en\": \"Output a transparent animation grid with at least six cells; align every center, use 5px gaps, and mark crop borders only with #00D9FF dashed guides.\"\n}]" },
        { id: "care", title: "工作、商城與日常事件", description: "用養成包建立物品、工作、心情和可重複發生的角色事件。", code: "{\n  \"type\": \"care\",\n  \"shop_items\": [{ \"id\": \"snack\", \"price\": 12, \"hunger_delta\": 18 }],\n  \"work_jobs\": [{ \"id\": \"desk_tidy\", \"duration_minutes\": 5, \"coin_reward\": 36 }],\n  \"care_events\": [{ \"id\": \"hungry\", \"trigger\": \"hunger_low\" }]\n}" },
        { id: "sharing", title: "安全打包與分享", description: "素材使用相對路徑；帳號、權杖與玩家私密設定不會放進作品。", code: "{\n  \"type\": \"pet\",\n  \"content_kind\": \"full_pet\",\n  \"config_path\": \"pet_config.json\",\n  \"assets_mode\": \"bundled\"\n}" }
      ]
    },
    "zh-Hans": {
      heading: "8 个主题，各有可直接参考的 JSON 示例",
      lead: "先从最想做的一项开始。以下片段可配合完整创作者指南使用，字段以当前版本支持的安全 JSON 设置为准。",
      cardLink: "查看对应 JSON 示例",
      topics: [
        { id: "character", title: "角色与动画", description: "以姿势包带入多张动画帧，并设置播放速度。", code: "{\n  \"type\": \"pose\",\n  \"pose\": {\n    \"animation_paths\": [\"assets/idle_01.png\", \"...\"],\n    \"playback_speed\": 1.0\n  }\n}" },
        { id: "movement", title: "移动与动作演出", description: "使用白名单移动参数，安全设置走动、巡逻、跳跃或漂浮。", code: "\"movement\": {\n  \"enabled\": true,\n  \"mode\": \"patrol\",\n  \"speed\": 1.1,\n  \"distance_px\": 380,\n  \"gravity\": false\n}" },
        { id: "dialogue", title: "气泡、音效与快捷键", description: "为同一个姿势安排随机对话、WAV 音效与建议快捷键。", code: "\"sound_path\": \"assets/chime.wav\",\n\"hotkey\": \"F6\",\n\"hotkey_enabled\": true,\n\"bubble_texts\": [\"嗨，今天也一起加油！\", \"需要我提醒你吗？\"],\n\"bubble_interval_sec\": 30" },
        { id: "focus", title: "专注模式与按键反应", description: "完整桌宠可提供固定专注姿势与可选的按键速度气泡。", code: "\"focus\": {\n  \"animation_paths\": [\"assets/focus_01.png\", \"...\"],\n  \"playback_speed\": 1.0,\n  \"focus_key_speed_enabled\": true,\n  \"focus_key_speed_prefix\": \"按键速度 \",\n  \"focus_key_speed_suffix\": \"，主人手速快到出现残影!!\"\n}" },
        { id: "twitch", title: "Twitch Bits 直播反应", description: "用金额范围与持续秒数触发专属姿势，不包含任何账号或令牌。", code: "\"twitch_trigger\": {\n  \"enabled\": true,\n  \"min_bits\": 100,\n  \"max_bits\": 499,\n  \"duration_sec\": 8,\n  \"bubble_texts\": [\"感谢 {viewer_name} 的 {amount} {currency}！\"]\n}" },
        { id: "ai", title: "AI 素材提示与多语言", description: "提供多语言 Prompt，明确要求至少六格、中心点对齐的宫格动画素材。", code: "\"ai_asset_prompts\": [{\n  \"id\": \"wave_prompt\",\n  \"pose_id\": \"wave\",\n  \"zh\": \"输出至少六格的透明背景动画宫格；每格中心点对齐、间距 5px，并以 #00D9FF 虚线只标记裁切边框。\",\n  \"en\": \"Output a transparent animation grid with at least six cells; align every center, use 5px gaps, and mark crop borders only with #00D9FF dashed guides.\"\n}]" },
        { id: "care", title: "工作、商城与日常事件", description: "用养成包建立物品、工作、心情和可重复发生的角色事件。", code: "{\n  \"type\": \"care\",\n  \"shop_items\": [{ \"id\": \"snack\", \"price\": 12, \"hunger_delta\": 18 }],\n  \"work_jobs\": [{ \"id\": \"desk_tidy\", \"duration_minutes\": 5, \"coin_reward\": 36 }],\n  \"care_events\": [{ \"id\": \"hungry\", \"trigger\": \"hunger_low\" }]\n}" },
        { id: "sharing", title: "安全打包与分享", description: "素材使用相对路径；账号、令牌与玩家私密设置不会放进作品。", code: "{\n  \"type\": \"pet\",\n  \"content_kind\": \"full_pet\",\n  \"config_path\": \"pet_config.json\",\n  \"assets_mode\": \"bundled\"\n}" }
      ]
    },
    en: {
      heading: "Eight topics, each with a practical JSON example",
      lead: "Start with the part you want to build most. These short examples complement the full creator guide and use only safe JSON fields supported in the current version.",
      cardLink: "View matching JSON example",
      topics: [
        { id: "character", title: "Character and animation", description: "Bring multiple animation frames and a playback rate into a pose pack.", code: "{\n  \"type\": \"pose\",\n  \"pose\": {\n    \"animation_paths\": [\"assets/idle_01.png\", \"...\"],\n    \"playback_speed\": 1.0\n  }\n}" },
        { id: "movement", title: "Movement and action staging", description: "Use allow-listed movement values for walking, patrols, hops, or drifting.", code: "\"movement\": {\n  \"enabled\": true,\n  \"mode\": \"patrol\",\n  \"speed\": 1.1,\n  \"distance_px\": 380,\n  \"gravity\": false\n}" },
        { id: "dialogue", title: "Bubbles, sound, and hotkeys", description: "Give one pose random dialogue, WAV audio, and an optional suggested hotkey.", code: "\"sound_path\": \"assets/chime.wav\",\n\"hotkey\": \"F6\",\n\"hotkey_enabled\": true,\n\"bubble_texts\": [\"Hi, let's do this today!\", \"Need a reminder?\"],\n\"bubble_interval_sec\": 30" },
        { id: "focus", title: "Focus mode and key response", description: "A full pet can offer a fixed focus pose and an optional key-speed bubble.", code: "\"focus\": {\n  \"animation_paths\": [\"assets/focus_01.png\", \"...\"],\n  \"playback_speed\": 1.0,\n  \"focus_key_speed_enabled\": true,\n  \"focus_key_speed_prefix\": \"Key speed \",\n  \"focus_key_speed_suffix\": \" ms - lightning fast!\"\n}" },
        { id: "twitch", title: "Twitch Bits reactions", description: "Use an amount range and duration for a pose without sharing account details or tokens.", code: "\"twitch_trigger\": {\n  \"enabled\": true,\n  \"min_bits\": 100,\n  \"max_bits\": 499,\n  \"duration_sec\": 8,\n  \"bubble_texts\": [\"Thanks {viewer_name} for {amount} {currency}!\"]\n}" },
        { id: "ai", title: "AI asset prompts and languages", description: "Give players multilingual prompts that ask for a centered animation grid with at least six cells.", code: "\"ai_asset_prompts\": [{\n  \"id\": \"wave_prompt\",\n  \"pose_id\": \"wave\",\n  \"zh\": \"輸出至少六格的透明背景動畫宮格；每格中心點對齊、間距 5px，並以 #00D9FF 虛線只標記裁切邊框。\",\n  \"en\": \"Output a transparent animation grid with at least six cells; align every center, use 5px gaps, and mark crop borders only with #00D9FF dashed guides.\"\n}]" },
        { id: "care", title: "Jobs, shop items, and daily events", description: "Build items, jobs, moods, and repeatable events as a care gameplay pack.", code: "{\n  \"type\": \"care\",\n  \"shop_items\": [{ \"id\": \"snack\", \"price\": 12, \"hunger_delta\": 18 }],\n  \"work_jobs\": [{ \"id\": \"desk_tidy\", \"duration_minutes\": 5, \"coin_reward\": 36 }],\n  \"care_events\": [{ \"id\": \"hungry\", \"trigger\": \"hunger_low\" }]\n}" },
        { id: "sharing", title: "Safe packaging and sharing", description: "Use relative assets while keeping account details, tokens, and private player data out of a pack.", code: "{\n  \"type\": \"pet\",\n  \"content_kind\": \"full_pet\",\n  \"config_path\": \"pet_config.json\",\n  \"assets_mode\": \"bundled\"\n}" }
      ]
    }
  };

  function topicAnchor(language, topicId) {
    return "topic-" + language.toLowerCase() + "-" + topicId;
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }

  function syncLanguagePicker(picker) {
    const select = picker.previousElementSibling;
    if (!(select instanceof HTMLSelectElement)) return;
    const option = select.options[select.selectedIndex];
    const language = select.value;
    const label = option ? option.textContent.trim() : language;
    picker.querySelector(".language-picker-code").textContent = languagePickerCodes[language] || language;
    picker.querySelector(".language-picker-label").textContent = label;
    picker.querySelector(".language-picker-toggle").setAttribute("aria-label", (labels[language] || labels["zh-Hant"]).language + ": " + label);
    picker.querySelectorAll(".language-picker-option").forEach((button) => {
      const selected = button.dataset.languageValue === language;
      button.setAttribute("aria-selected", String(selected));
      button.querySelector(".language-picker-option-check").textContent = selected ? "✓" : "";
    });
  }

  function setupLanguageMenus() {
    document.querySelectorAll(".language-select").forEach((select, index) => {
      if (select.dataset.enhanced) return;
      const picker = createElement("div", "language-picker");
      const listId = (select.id || "language-" + index) + "-options";
      const toggle = createElement("button", "language-picker-toggle");
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", listId);
      const code = createElement("span", "language-picker-code", languagePickerCodes[select.value]);
      code.setAttribute("aria-hidden", "true");
      const label = createElement("span", "language-picker-label");
      const chevron = createElement("span", "language-picker-chevron");
      chevron.setAttribute("aria-hidden", "true");
      toggle.append(code, label, chevron);

      const options = createElement("div", "language-picker-options");
      options.id = listId;
      options.setAttribute("role", "listbox");
      Array.from(select.options).forEach((option) => {
        const item = createElement("button", "language-picker-option");
        item.type = "button";
        item.dataset.languageValue = option.value;
        item.setAttribute("role", "option");
        const itemCode = createElement("span", "language-picker-code", languagePickerCodes[option.value] || option.value);
        itemCode.setAttribute("aria-hidden", "true");
        const itemLabel = createElement("span", "", option.textContent.trim());
        const check = createElement("span", "language-picker-option-check");
        check.setAttribute("aria-hidden", "true");
        item.append(itemCode, itemLabel, check);
        item.addEventListener("click", () => {
          select.value = option.value;
          select.dispatchEvent(new Event("change", { bubbles: true }));
          picker.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        });
        options.append(item);
      });

      toggle.addEventListener("click", () => {
        const isOpen = picker.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
      document.addEventListener("click", (event) => {
        if (!picker.contains(event.target)) {
          picker.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && picker.classList.contains("is-open")) {
          picker.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });

      picker.append(toggle, options);
      select.classList.add("is-enhanced");
      select.dataset.enhanced = "true";
      select.setAttribute("aria-hidden", "true");
      select.tabIndex = -1;
      select.after(picker);
      syncLanguagePicker(picker);
    });
  }

  function setupCreatorTopicExamples() {
    const mounts = Array.from(document.querySelectorAll("[data-topic-examples]"));
    if (!mounts.length) return;

    mounts.forEach((mount) => {
      const languageBlock = mount.closest("[data-lang-content]");
      const language = languageBlock ? languageBlock.dataset.langContent : "zh-Hant";
      const catalog = creatorTopicCatalogs[language];
      if (!catalog) return;

      const heading = createElement("div", "creator-topic-examples-heading");
      heading.append(createElement("p", "section-kicker", "JSON BY TOPIC"));
      heading.append(createElement("h2", "", catalog.heading));
      heading.append(createElement("p", "", catalog.lead));

      const grid = createElement("div", "creator-topic-example-grid");
      catalog.topics.forEach((topic, index) => {
        const article = createElement("article", "creator-topic-example");
        article.id = topicAnchor(language, topic.id);
        const head = createElement("div", "creator-topic-example-head");
        head.append(createElement("span", "creator-topic-example-number", String(index + 1).padStart(2, "0")));
        const copy = document.createElement("div");
        copy.append(createElement("h3", "", topic.title));
        copy.append(createElement("p", "", topic.description));
        head.append(copy);
        const codePanel = createElement("pre", "creator-topic-code");
        codePanel.append(createElement("code", "", topic.code));
        article.append(head, codePanel);
        grid.append(article);
      });

      mount.replaceChildren(heading, grid);
    });

    document.querySelectorAll(".creator-guide-topic-map").forEach((map) => {
      const languageBlock = map.closest("[data-lang-content]");
      const language = languageBlock ? languageBlock.dataset.langContent : "zh-Hant";
      const topics = creatorTopicCatalogs[language] && creatorTopicCatalogs[language].topics;
      if (!topics) return;
      map.querySelectorAll("ol > li").forEach((item, index) => {
        const topic = topics[index];
        if (!topic || item.querySelector("a")) return;
        const link = document.createElement("a");
        link.href = "#" + topicAnchor(language, topic.id);
        link.textContent = item.textContent.trim();
        item.replaceChildren(link);
      });
    });

    document.querySelectorAll(".creator-capability-card").forEach((card, index) => {
      if (card.querySelector(".creator-example-link")) return;
      const languageBlock = card.closest("[data-lang-content]");
      const language = languageBlock ? languageBlock.dataset.langContent : "zh-Hant";
      const catalog = creatorTopicCatalogs[language];
      if (!catalog) return;
      const topic = catalog.topics[index % catalog.topics.length];
      const link = document.createElement("a");
      link.className = "creator-example-link";
      link.href = "#" + topicAnchor(language, topic.id);
      link.textContent = catalog.cardLink;
      (card.querySelector(".creator-capability-copy") || card).append(link);
    });

    if (window.location.hash.startsWith("#topic-")) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(window.location.hash);
        if (target) target.scrollIntoView({ block: "start" });
      });
    }
  }

  function setupCreatorTutorialLinks() {
    document.querySelectorAll(".creator-path:not(.creator-path-accent)").forEach((path) => {
      if (path.querySelector(".creator-tutorial-link")) return;
      const languageBlock = path.closest("[data-lang-content]");
      const language = languageBlock && supported.includes(languageBlock.dataset.langContent)
        ? languageBlock.dataset.langContent
        : "zh-Hant";
      const link = document.createElement("a");
      link.className = "button button-teal creator-tutorial-link";
      link.href = "make-your-pet.html";
      link.textContent = labels[language].makePetTutorial;
      path.appendChild(link);
    });
  }

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
    document.querySelectorAll(".language-picker").forEach((picker) => syncLanguagePicker(picker));
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      const label = lang === "zh-Hans" ? "回到页首" : lang === "en" ? "Back to top" : "回到頁首";
      backToTop.setAttribute("aria-label", label);
      backToTop.title = label;
    }
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
    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupPageTools() {
    const header = document.querySelector(".site-header");
    const footer = document.querySelector(".site-footer");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "Back to top");
    button.title = "Back to top";
    button.innerHTML = '<span class="back-to-top-mark" aria-hidden="true">^</span><span>Top</span>';
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.append(button);

    const update = () => {
      const visualViewport = window.visualViewport;
      const viewportHeight = visualViewport && visualViewport.height
        ? visualViewport.height
        : window.innerHeight;
      const shouldShow = window.scrollY > Math.max(260, viewportHeight * 0.35);
      if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);

      const baseOffset = window.innerWidth <= 600 ? 104 : 80;
      let offset = baseOffset;
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        if (footerTop < viewportHeight) {
          offset = Math.max(baseOffset, Math.ceil(viewportHeight - footerTop + 28));
        }
      }
      const maximumOffset = Math.max(0, viewportHeight - button.offsetHeight - 18);
      const fitsAboveFooter = offset <= maximumOffset;
      button.style.setProperty("--back-to-top-offset", Math.min(offset, maximumOffset) + "px");
      button.classList.toggle("is-visible", shouldShow && fitsAboveFooter);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", update);
      window.visualViewport.addEventListener("scroll", update);
    }
    update();
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
      ".hero-content, .feature-card, .step, .image-stage, .reminder-scene, .creator-path, .creator-care-highlight, .creator-pet-rail, .creator-guide-intro, .creator-overview-heading, .creator-pack-grid, .creator-pack-card, .creator-pack-action, .creator-overview-cta, .page-hero-grid, .streamer-page-hero-layout, .streamer-section-heading, .streamer-setup-card, .streamer-rule-board, .obs-capture-board, .streamer-trust-card, .streamer-mode-cta, .legal-summary-grid, .legal-copy, .legal-aside, .support-banner"
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
    // Long articles can never show 12% of their full height in a phone viewport.
    // Reveal as soon as a small, visible portion enters the viewport instead.
    }, { threshold: 0.01 });

    targets.forEach((target) => {
      if (!target.closest("[hidden]")) observer.observe(target);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const language = initialLanguage();
    document.querySelectorAll(".language-select").forEach((select) => {
      select.addEventListener("change", (event) => setLanguage(event.target.value));
    });
    setupLanguageMenus();
    setupCreatorTopicExamples();
    setupCreatorTutorialLinks();
    setupMenu();
    setupPageTools();
    renderPublicConfig();
    document.querySelectorAll("[data-year]").forEach((element) => { element.textContent = String(new Date().getFullYear()); });
    setLanguage(language);
    setupMotion();
  });
}());
