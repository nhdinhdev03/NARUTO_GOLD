function animateCounter(element) {
  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const duration = 1200;
  const startTime = performance.now();

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    element.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  };

  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    vi: {
      "nav.services": "Dịch vụ",
      "nav.process": "Quy trình",
      "nav.pricing": "Bảng giá",
      "nav.contact": "Liên hệ",
      "cta.order": "ĐẶT ĐƠN NGAY",
      "cta.contact": "Liên hệ Zalo",
      "cta.view_pricing": "Xem bảng giá",
      "hero.eyebrow": "HỆ THỐNG AN TOÀN TIÊU CHUẨN 2026",
      "hero.title": "Nhanh chóng, bảo mật <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Giải pháp cày vàng, tối ưu lực chiến, Đội ngũ trực chiến 24/7, cam kết an toàn tài khoản tuyệt đối.",
      "hero.highlights.operational": "Hoạt động",
      "hero.highlights.insurance": "Bảo hiểm Acc",
      "hero.highlights.response": "Phản hồi",
      "hero.badge": "Verified Pro Tier",
      "hero.card.title": "Top Tier Service",
      "hero.card.desc":
        "Luồng xử lý đơn hàng tối ưu với mã hóa SSL kép, bàn giao đúng tiến độ cam kết.",
      "stats.completed": "Hoàn thành",
      "stats.rating": "Rating (1.2k Đánh giá)",
      "trust.delivered": "Tài khoản đã bàn giao",
      "trust.safety": "Tỷ lệ an toàn tuyệt đối",
      "trust.avg_time": "Thời gian xử lý trung bình",
      "trust.compensation": "Đền bù 200% nếu vi phạm",
      "process.title": "Quy trình 3 bước khép kín",
      "process.step1.title": "Khởi tạo & Định giá",
      "process.step1.desc":
        "Lựa chọn gói mục tiêu, hệ thống tự động tính toán chi phí và gửi mã vận đơn theo dõi.",
      "process.step2.title": "Thực thi ẩn danh",
      "process.step2.desc":
        "Booster đăng nhập thông qua VPN riêng biệt trùng khớp vị trí địa lý của bạn. Tuyệt đối không đọc tin nhắn.",
      "process.step3.title": "Bàn giao & Nghiệm thu",
      "process.step3.desc":
        "Hoàn tất chỉ tiêu, chụp ảnh đối soát hệ thống, đăng xuất và gửi thông báo qua Zalo/SĐT.",
      "pricing.plans_label": "Pricing Plans",
      "pricing.title": "Bảng giá niêm yết",
      "pricing.basic.name": "Cơ bản",
      "pricing.basic.select": "Chọn gói này",
      "pricing.basic.feature1": "Cam kết 400.000 Vàng",
      "pricing.basic.feature2": "Hoàn nhanh chóng",
      "pricing.basic.feature3": "Ưu tiên khách có phôi 10 ám 450",
      "pricing.basic.feature4":
        "Luồng ưu tiên (Xong trong 2 - 3h sau khi đã chốt)",
      "pricing.recommended.name": "Khuyên dùng",
      "pricing.recommended.ribbon": "KHUYÊN DÙNG",
      "pricing.recommended.select": "Chọn gói này",
      "pricing.recommended.feature1": "Cam kết 1.200.000 Vàng",
      "pricing.recommended.feature2": "Tối thiểu khách phải có 10 phôi 450",
      "pricing.recommended.feature3": "Bảo hiểm tài khoản 100%",
      "pricing.recommended.feature4":
        "Luồng ưu tiên (Xong trong 10 - 15h sau khi đã chốt)",
      "pricing.advanced.name": "Nâng cao",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Chọn gói này",
      "pricing.advanced.feature1": "Cam kết 20.000.000 Vàng",
      "pricing.advanced.feature2": "Tối thiểu khách phải có 20 ám 450",
      "pricing.advanced.feature3": "Ưu đãi cao nhất",
      "pricing.advanced.feature4": "Hỗ trợ trực tiếp 1-1 bởi nhdinh",
      "pricing.advanced.response":
        "Thời gian phản hồi: 24/7, nhanh trong 35 phút",
      "pricing.note":
        "Ghi chú: Gửi kèm Server, mục tiêu, nội dung yêu cầu và thông tin tài khoản game.",
      "contact.support_label": "Direct Support",
      "contact.title": "Liên hệ",
      "contact.desc":
        "Bạn gặp khó khăn trong việc định hình gói? Kết nối trực tiếp với tổng đài viên để được tư vấn phù hợp và thẩm định acc miễn phí.",
      "contact.form_title": "Liên hệ trực tiếp",
      "contact.form_desc":
        "Gửi thông tin tài khoản, nêu mục tiêu và nhận phản hồi nhanh trong vòng 35 phút.",
      "contact.response":
        "<strong>Thời gian phản hồi:</strong> 24/7, nhanh trong 35 phút",
      "contact.note":
        "<strong>Ghi chú:</strong> Gửi kèm Server, mục tiêu, nội dung yêu cầu và thông tin tài khoản game.",
      "contact.open_zalo": "MỞ ZALO ĐẶT NGAY",
      "footer.copy": "© 2026 NarutoGold Agency.",
      "footer.privacy": "Chính sách bảo mật",
      "notice.title": "Thông báo quan trọng",
      "notice.html":
        'Ưu tiên khách hàng có phôi giao dịch <strong>450</strong>, Nếu có <strong>10</strong> hoặc nhiều hơn thì liên hệ ngay!<br><span style="color:#ff4d6d; font-weight:700;">Kèm phí chuyển vàng phôi + Mua lại phôi.</span>',
      "notice.confirm": "Đã hiểu",
      "form.modal.title": "Đặt hàng qua Zalo",
      "form.modal.html":
        "Hiện tại hệ thống đơn online tạm dừng. Vui lòng nhấn vào nút để mở Zalo và gửi yêu cầu trực tiếp đến <strong>0389 307 257</strong>.",
      "form.modal.open": "Mở Zalo",
      "form.modal.cancel": "Đóng",
    },
    en: {
      "nav.services": "Services",
      "nav.process": "Process",
      "nav.pricing": "Pricing",
      "nav.contact": "Contact",
      "cta.order": "ORDER NOW",
      "cta.contact": "Contact on Zalo",
      "cta.view_pricing": "View pricing",
      "hero.eyebrow": "SECURE STANDARD 2026",
      "hero.title": "Fast, secure <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Gold farming solution, optimize combat power, raid faster. Challenger team online 24/7, guaranteed account safety.",
      "hero.highlights.operational": "Operational",
      "hero.highlights.insurance": "Account insured",
      "hero.highlights.response": "Response",
      "hero.badge": "Verified Pro Tier",
      "hero.card.title": "Top Tier Service",
      "hero.card.desc":
        "Optimized order flow with dual SSL encryption, delivered on schedule.",
      "stats.completed": "Completed",
      "stats.rating": "Rating (1.2k reviews)",
      "trust.delivered": "Accounts delivered",
      "trust.safety": "Absolute safety rate",
      "trust.avg_time": "Average handling time",
      "trust.compensation": "200% compensation on violation",
      "process.title": "3-step closed process",
      "process.step1.title": "Init & Quote",
      "process.step1.desc":
        "Choose target package, system auto-calculates cost and sends tracking code.",
      "process.step2.title": "Anonymous Execution",
      "process.step2.desc":
        "Booster logs in via isolated VPN matching your geo-location. Never read messages.",
      "process.step3.title": "Handover & Acceptance",
      "process.step3.desc":
        "Complete targets, capture reconciliation, logout and notify via Zalo/phone.",
      "pricing.plans_label": "Pricing Plans",
      "pricing.title": "Listed prices",
      "pricing.basic.name": "Basic",
      "pricing.basic.select": "Select plan",
      "pricing.basic.feature1": "Guaranteed 400,000 Gold",
      "pricing.basic.feature2": "Fast completion",
      "pricing.basic.feature3": "Priority for customers with 10 phôi 450",
      "pricing.basic.feature4":
        "Priority queue (Done within 2-3h after confirmation)",
      "pricing.recommended.name": "Recommended",
      "pricing.recommended.ribbon": "RECOMMENDED",
      "pricing.recommended.select": "Select plan",
      "pricing.recommended.feature1": "Guaranteed 1,200,000 Gold",
      "pricing.recommended.feature2": "Minimum requirement: 10 phôi 450",
      "pricing.recommended.feature3": "100% account insurance",
      "pricing.recommended.feature4":
        "Priority queue (Done within 10-15h after confirmation)",
      "pricing.advanced.name": "Advanced",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Select plan",
      "pricing.advanced.feature1": "Guaranteed 20,000,000 Gold",
      "pricing.advanced.feature2": "Minimum requirement: 20 ám 450",
      "pricing.advanced.feature3": "Top perks",
      "pricing.advanced.feature4": "1-on-1 support by nhdinh",
      "pricing.advanced.response": "Response time: 24/7, within 35 minutes",
      "pricing.note":
        "Note: Include Server, target, request details, and game account info.",
      "contact.support_label": "Direct Support",
      "contact.title": "Service coordination",
      "contact.desc":
        "Need help choosing a package? Connect directly with an agent for a free account assessment.",
      "contact.form_title": "Direct contact",
      "contact.form_desc":
        "Send your account details, state your goal, and receive a fast reply within 35 minutes.",
      "contact.response":
        "<strong>Response time:</strong> 24/7, within 35 minutes",
      "contact.note":
        "<strong>Note:</strong> Include Server, target, request details and game account info.",
      "contact.open_zalo": "OPEN ZALO",
      "footer.copy": "© 2026 NarutoGold Agency.",
      "footer.privacy": "Privacy Policy",
      "notice.title": "Important notice",
      "notice.html":
        'Priority for customers with voucher <strong>450</strong>. If you have <strong>10</strong> or more, contact us immediately!<br><span style="color:#ff4d6d; font-weight:700;">Includes voucher transfer fee + buyback.</span>',
      "notice.confirm": "Understood",
      "form.modal.title": "Order via Zalo",
      "form.modal.html":
        "Online ordering is temporarily suspended. Please click the button to open Zalo and send your request directly to <strong>0389 307 257</strong>.",
      "form.modal.open": "Open Zalo",
      "form.modal.cancel": "Close",
    },
  };

  const prefersReducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  let currentLang = "vi";

  function translatePage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const translation =
        translations[lang]?.[key] || translations.vi?.[key] || el.innerHTML;
      el.innerHTML = translation;
    });
  }

  function initLanguageSwitcher() {
    const langSelect = document.getElementById("lang-select");
    if (langSelect) {
      langSelect.addEventListener("change", (event) => {
        const lang = event.target.value;
        localStorage.setItem("site_lang", lang);
        currentLang = lang;
        translatePage(lang);
      });
    }

    const savedLang =
      localStorage.getItem("site_lang") ||
      (globalThis.navigator.language?.startsWith("en") ? "en" : "vi");

    if (langSelect) {
      langSelect.value = savedLang;
    }

    currentLang = savedLang;
    translatePage(savedLang);
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".nav-menu");

    if (header) {
      const updateHeaderState = () =>
        header.classList.toggle("scrolled", globalThis.scrollY > 12);
      updateHeaderState();
      window.addEventListener("scroll", updateHeaderState, { passive: true });
    }

    if (!toggle || !nav) {
      return;
    }

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    nav
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  function initRevealEffects() {
    const animatedElements = document.querySelectorAll(".animate");

    if (!animatedElements.length) {
      return;
    }

    if (prefersReducedMotion || !("IntersectionObserver" in globalThis)) {
      animatedElements.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    animatedElements.forEach((element) => observer.observe(element));
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) {
      return;
    }

    if (prefersReducedMotion || !("IntersectionObserver" in globalThis)) {
      counters.forEach((counter) => animateCounter(counter));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function createModal({ title, html, confirmText, cancelText, onConfirm }) {
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <h3 id="modal-title">${title}</h3>
          <button class="modal-close" type="button" aria-label="Đóng">×</button>
        </div>
        <div class="modal-body">${html}</div>
        <div class="modal-actions">
          ${cancelText ? '<button class="btn btn-secondary modal-cancel" type="button">' + cancelText + "</button>" : ""}
          <button class="btn btn-primary modal-confirm" type="button">${confirmText}</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.classList.add("modal-open");

    const closeModal = () => {
      backdrop.remove();
      document.body.classList.remove("modal-open");
    };

    backdrop
      .querySelector(".modal-close")
      ?.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeModal();
      }
    });

    backdrop
      .querySelector(".modal-cancel")
      ?.addEventListener("click", closeModal);
    backdrop.querySelector(".modal-confirm")?.addEventListener("click", () => {
      closeModal();
      onConfirm?.();
    });

    document.addEventListener("keydown", function handleEscape(event) {
      if (event.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", handleEscape);
      }
    });
  }

  function showLandingNotice() {
    createModal({
      title:
        translations[currentLang]?.["notice.title"] ||
        translations.vi["notice.title"],
      html:
        translations[currentLang]?.["notice.html"] ||
        translations.vi["notice.html"],
      confirmText:
        translations[currentLang]?.["notice.confirm"] ||
        translations.vi["notice.confirm"],
      cancelText: "",
      onConfirm: () => {},
    });
  }

  const form = document.getElementById("orderForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      createModal({
        title:
          translations[currentLang]?.["form.modal.title"] ||
          translations.vi["form.modal.title"],
        html:
          translations[currentLang]?.["form.modal.html"] ||
          translations.vi["form.modal.html"],
        confirmText:
          translations[currentLang]?.["form.modal.open"] ||
          translations.vi["form.modal.open"],
        cancelText:
          translations[currentLang]?.["form.modal.cancel"] ||
          translations.vi["form.modal.cancel"],
        onConfirm: () =>
          window.open(
            "https://zalo.me/0389307257",
            "_blank",
            "noopener,noreferrer",
          ),
      });
    });
  }

  initLanguageSwitcher();
  initHeader();
  initRevealEffects();
  initCounters();
  showLandingNotice();
});
