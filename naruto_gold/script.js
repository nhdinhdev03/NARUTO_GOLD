document.addEventListener("DOMContentLoaded", () => {
  // --- i18n translations for English and Vietnamese ---
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
      "pricing.recommended.name": "Khuyên dùng",
      "pricing.recommended.ribbon": "KHUYÊN DÙNG",
      "pricing.recommended.select": "Chọn gói này",
      "pricing.advanced.name": "Nâng cao",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Chọn gói này",
      "contact.support_label": "Direct Support",
      "contact.title": "Kênh điều phối dịch vụ",
      "contact.desc":
        "Bạn gặp khó khăn trong việc định hình gói? Kết nối trực tiếp với tổng đài viên để được thẩm định acc miễn phí.",
      "contact.form_title": "Đặt hàng qua Zalo",
      "contact.form_desc":
        "Vui lòng liên hệ trực tiếp qua Zalo để đặt đơn, gửi thông tin tài khoản và nhận phản hồi nhanh.",
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
      "pricing.recommended.name": "Recommended",
      "pricing.recommended.ribbon": "RECOMMENDED",
      "pricing.recommended.select": "Select plan",
      "pricing.advanced.name": "Advanced",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Select plan",
      "contact.support_label": "Direct Support",
      "contact.title": "Service coordination",
      "contact.desc":
        "Need help choosing a package? Connect directly with an agent for a free account assessment.",
      "contact.form_title": "Order via Zalo",
      "contact.form_desc":
        "Please contact via Zalo to place orders, send account info and receive fast replies.",
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

  function translatePage(lang) {
    document.documentElement.lang = lang;
    const els = document.querySelectorAll("[data-i18n]");
    els.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const txt =
        (translations[lang] && translations[lang][key]) ||
        (translations.vi && translations.vi[key]) ||
        el.innerHTML;
      el.innerHTML = txt;
    });
  }

  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("site_lang", lang);
      translatePage(lang);
    });
  }

  // initialize language from localStorage or browser
  const savedLang =
    localStorage.getItem("site_lang") ||
    (navigator.language && navigator.language.startsWith("en") ? "en" : "vi");
  // set selector value if present
  if (langSelect) langSelect.value = savedLang;
  translatePage(savedLang);
  /* 1. Hiệu ứng cuộn trang Fade-in */
  const animatedElements = document.querySelectorAll(".animate");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    animatedElements.forEach((el) => observer.observe(el));
  }

  /* 2. Hàm hiển thị Toast */
  function showCyberToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "cyber-toast";
    toast.innerHTML = `<span>⚡ ${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* 2a. Thông báo khi mở trang */
  function showLandingNotice() {
    Swal.fire({
      title:
        (translations[savedLang] && translations[savedLang]["notice.title"]) ||
        translations.vi["notice.title"],
      icon: "info",
      html:
        (translations[savedLang] && translations[savedLang]["notice.html"]) ||
        translations.vi["notice.html"],
      confirmButtonText:
        (translations[savedLang] &&
          translations[savedLang]["notice.confirm"]) ||
        translations.vi["notice.confirm"],
      timer: 10000,
      timerProgressBar: true,
      allowOutsideClick: true,
      showCloseButton: true,
    });
  }

  showLandingNotice();

  /* 3. Nếu trang vẫn còn form đặt hàng, chuyển hướng người dùng sang Zalo */
  const form = document.getElementById("orderForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title:
          (translations[savedLang] &&
            translations[savedLang]["form.modal.title"]) ||
          translations.vi["form.modal.title"],
        html:
          (translations[savedLang] &&
            translations[savedLang]["form.modal.html"]) ||
          translations.vi["form.modal.html"],
        confirmButtonText:
          (translations[savedLang] &&
            translations[savedLang]["form.modal.open"]) ||
          translations.vi["form.modal.open"],
        showCancelButton: true,
        cancelButtonText:
          (translations[savedLang] &&
            translations[savedLang]["form.modal.cancel"]) ||
          translations.vi["form.modal.cancel"],
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://zalo.me/0389307257", "_blank");
        }
      });
    });
  }
});
