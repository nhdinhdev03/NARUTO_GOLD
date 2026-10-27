function animateCounter(element) {
  if (element.dataset.animated === "true") {
    return;
  }

  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";
  const decimals = Number(element.dataset.decimals || 0);
  const duration = Number(element.dataset.duration || 1500);
  const startTime = performance.now();
  const startValue = Number(element.dataset.start || 0);

  const formatValue = (value) => {
    if (decimals > 0) {
      return `${prefix}${value.toFixed(decimals)}${suffix}`;
    }
    return `${prefix}${Math.round(value).toLocaleString("vi-VN")}${suffix}`;
  };

  const update = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = startValue + (target - startValue) * eased;
    element.textContent = formatValue(value);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = formatValue(target);
      element.classList.add("is-active");
    }
  };

  element.dataset.animated = "true";
  requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    vi: {
      "topbar.status": "SERVER STATUS: ONLINE • LUỒNG ƯU TIÊN ĐANG MỞ",
      "topbar.requirement": "Quy định phôi: Tối thiểu 5 - 10 phôi 450",
      "nav.services": "DỊCH VỤ",
      "nav.process": "QUY TRÌNH",
      "nav.pricing": "BẢNG GIÁ",
      "nav.duration": "GÓI NGÀY",
      "nav.showcase": "KẾT QUẢ",
      "nav.contact": "LIÊN HỆ",
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
      "services.tag": "TIÊU CHUẨN DỊCH VỤ",
      "services.title": "Quy trình rõ ràng và bảo mật tối ưu.",
      "services.feature1.title": "An toàn tuyệt đối",
      "services.feature1.desc":
        "Luồng xử lý riêng biệt, bảo mật tài khoản và minh bạch từng bước.",
      "services.feature2.title": "Tốc độ tối ưu",
      "services.feature2.desc":
        "Nhanh chóng, đúng tiến độ cam kết và luôn có người hỗ trợ kịp thời.",
      "services.feature3.title": "Gói dịch vụ đa dạng",
      "services.feature3.desc":
        "Bao gồm các mức cơ bản, khuyên dùng và nâng cao để phù hợp nhu cầu.",
      "process.tag": "SECURITY PROTOCOL",
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
      "pricing.plans_label": "PRICING PLANS",
      "pricing.title": "Bảng giá niêm yết",
      "pricing.note":
        "Ghi chú: Gửi kèm Server, mục tiêu, nội dung yêu cầu và thông tin tài khoản game.",
      "pricing.basic.name": "Cơ bản",
      "pricing.basic.select": "Chọn gói này",
      "pricing.basic.feature1": "Cam kết 400.000 Vàng",
      "pricing.basic.feature2": "Hoàn nhanh chóng",
      "pricing.basic.feature3": "Ưu tiên khách có phôi 10 phôi 450",
      "pricing.basic.feature4":
        "Luồng ưu tiên (Xong trong 2 - 3h sau khi đã chốt)",
      "pricing.recommended.name": "Khuyên dùng",
      "pricing.recommended.ribbon": "KHUYÊN DÙNG",
      "pricing.recommended.select": "Chọn gói này",
      "pricing.recommended.feature1": "Cam kết 1.000.000 Vàng",
      "pricing.recommended.feature2": "Tối thiểu khách phải có 5 - 10 phôi 450",
      "pricing.recommended.feature3": "Bảo hiểm tài khoản 100%",
      "pricing.recommended.feature4":
        "Luồng ưu tiên (Xong trong 10 - 15h sau khi đã chốt)",
      "pricing.advanced.name": "Nâng cao",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Chọn gói này",
      "pricing.advanced.feature1": "Cam kết 15.000.000 Vàng",
      "pricing.advanced.feature2": "Tối thiểu khách phải có 20 ám 450",
      "pricing.advanced.feature3": "Ưu đãi cao nhất",
      "pricing.advanced.feature4": "Hỗ trợ trực tiếp 1-1 bởi nhdinh",
      "pricing.advanced.response":
        "Thời gian phản hồi: 24/7, nhanh trong 35 phút",
      "pricing.duration.label": "GÓI THEO THỜI GIAN",
      "pricing.duration.title": "Gói cày vàng linh hoạt theo ngày",
      "pricing.duration.subtitle":
        "Ưu đãi rõ ràng và giá tốt hơn, Tối thiểu khách phải có 5 - 10 phôi 450.",
      "pricing.duration.daily_label": "Mỗi ngày",
      "pricing.duration.total_label": "Tổng vàng",
      "pricing.duration.original_label": "Giá gốc",
      "pricing.duration.discount_label": "Ưu đãi",
      "pricing.duration.sale_label": "Giá bán",
      "pricing.duration.select": "Chọn gói này",
      "pricing.duration.day7.badge": "7 NGÀY",
      "pricing.duration.day7.title": "7 ngày",
      "pricing.duration.day15.badge": "15 NGÀY",
      "pricing.duration.day15.title": "15 ngày",
      "pricing.duration.day30.badge": "30 NGÀY",
      "pricing.duration.day30.title": "30 ngày",
      "showcase.tag": "HÌNH ẢNH MINH HỌA",
      "showcase.title": "Kết quả sau khi chạy vàng",
      "showcase.subtitle":
        "Nhấp vào bất kỳ hình ảnh nào để xem chi tiết thông số kiểm định trước khi bàn giao.",
      "contact.support_label": "DIRECT SUPPORT & DISPATCH",
      "contact.title": "Kênh điều phối dịch vụ",
      "contact.desc":
        "Bạn gặp khó khăn trong việc định hình gói? Kết nối trực tiếp với tổng đài viên để được thẩm định acc miễn phí.",
      "order.box_title": "⚡ Trạm Khởi Tạo Đơn Nhanh",
      "order.plan_label": "Gói dịch vụ đã chọn",
      "order.server_label": "Server / Máy chủ",
      "order.embryo_label": "Số phôi / Ám 450 hiện có",
      "contact.open_zalo": "SAO CHÉP ĐƠN & MỞ ZALO NGAY",
      "contact.email_label": "Email Hỗ Trợ",
      "contact.sla_label": "Cam kết SLA",
      "qr.title": "Thanh toán chuyển khoản nhanh",
      "qr.subtitle":
        "Quét mã QR bằng ứng dụng Ngân hàng hoặc Ví điện tử bất kỳ để thanh toán chính xác tuyệt đối.",
      "qr.copy": "Sao chép",
      "footer.copy": "© 2026 NarutoGold Agency. All Rights Reserved.",
      "footer.privacy": "CHÍNH SÁCH BẢO MẬT",
    },
    en: {
      "topbar.status": "SERVER STATUS: ONLINE • PRIORITY QUEUE OPEN",
      "topbar.requirement": "Requirement: Minimum 5 - 10 Embryos (Phôi 450)",
      "nav.services": "SERVICES",
      "nav.process": "PROCESS",
      "nav.pricing": "PRICING",
      "nav.duration": "DAILY PLANS",
      "nav.showcase": "RESULTS",
      "nav.contact": "CONTACT",
      "cta.order": "ORDER NOW",
      "cta.contact": "Contact on Zalo",
      "cta.view_pricing": "View pricing",
      "hero.eyebrow": "SECURE STANDARD 2026",
      "hero.title": "Fast, secure <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Gold farming solution, optimize combat power. Challenger team online 24/7, guaranteed absolute account safety.",
      "hero.highlights.operational": "Operational",
      "hero.highlights.insurance": "Account Insured",
      "hero.highlights.response": "Responses",
      "hero.badge": "Verified Pro Tier",
      "hero.card.title": "Top Tier Service",
      "hero.card.desc":
        "Optimized order flow with dual SSL encryption, delivered right on schedule.",
      "stats.completed": "Completed",
      "stats.rating": "Rating (1.2k reviews)",
      "trust.delivered": "Accounts delivered",
      "trust.safety": "Absolute safety rate",
      "trust.avg_time": "Average handling time",
      "trust.compensation": "200% compensation on violation",
      "services.tag": "SERVICE STANDARDS",
      "services.title": "Clear process and optimal security.",
      "services.feature1.title": "Absolute safety",
      "services.feature1.desc":
        "Isolated processing flows, account security and step-by-step transparency.",
      "services.feature2.title": "Optimized speed",
      "services.feature2.desc":
        "Fast, on-time delivery with timely 24/7 human support.",
      "services.feature3.title": "Diverse service packages",
      "services.feature3.desc":
        "Includes Basic, Recommended and Advanced tiers to match your goals.",
      "process.tag": "SECURITY PROTOCOL",
      "process.title": "3-step closed process",
      "process.step1.title": "Init & Quote",
      "process.step1.desc":
        "Choose target package, system auto-calculates cost and generates tracking ID.",
      "process.step2.title": "Anonymous Execution",
      "process.step2.desc":
        "Booster logs in via isolated VPN matching your geo-location. Messages are never read.",
      "process.step3.title": "Handover & Acceptance",
      "process.step3.desc":
        "Complete targets, capture reconciliation proof, logout and notify via Zalo/phone.",
      "pricing.plans_label": "PRICING PLANS",
      "pricing.title": "Listed prices",
      "pricing.note":
        "Note: Include Server, target, request details, and game account info.",
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
      "pricing.recommended.feature1": "Guaranteed 1,000,000 Gold",
      "pricing.recommended.feature2": "Minimum requirement: 5 - 10 phôi 450",
      "pricing.recommended.feature3": "100% account insurance",
      "pricing.recommended.feature4":
        "Priority queue (Done within 10-15h after confirmation)",
      "pricing.advanced.name": "Advanced",
      "pricing.advanced.ribbon": "GOD TIER",
      "pricing.advanced.select": "Select plan",
      "pricing.advanced.feature1": "Guaranteed 15,000,000 Gold",
      "pricing.advanced.feature2": "Minimum requirement: 20 ám 450",
      "pricing.advanced.feature3": "Top perks & priority",
      "pricing.advanced.feature4": "1-on-1 direct support by nhdinh",
      "pricing.advanced.response": "Response time: 24/7, within 35 minutes",
      "pricing.duration.label": "TIME-BASED PACKAGES",
      "pricing.duration.title": "Flexible gold farming packages by duration",
      "pricing.duration.subtitle":
        "Clear discounts and better pricing. Minimum requirement: 5 - 10 phôi 450.",
      "pricing.duration.daily_label": "Per day",
      "pricing.duration.total_label": "Total gold",
      "pricing.duration.original_label": "Original price",
      "pricing.duration.discount_label": "Discount",
      "pricing.duration.sale_label": "Sale price",
      "pricing.duration.select": "Select plan",
      "pricing.duration.day7.badge": "7 DAYS",
      "pricing.duration.day7.title": "7 days",
      "pricing.duration.day15.badge": "15 DAYS",
      "pricing.duration.day15.title": "15 days",
      "pricing.duration.day30.badge": "30 DAYS",
      "pricing.duration.day30.title": "30 days",
      "showcase.tag": "VERIFIED SHOWCASE",
      "showcase.title": "Results after gold farming",
      "showcase.subtitle":
        "Click on any image to inspect our pre-handover verification checklist.",
      "contact.support_label": "DIRECT SUPPORT & DISPATCH",
      "contact.title": "Service coordination",
      "contact.desc":
        "Need help choosing a package? Connect directly with an agent for a free account assessment.",
      "order.box_title": "⚡ Quick Order Dispatch",
      "order.plan_label": "Selected Package",
      "order.server_label": "Server ID",
      "order.embryo_label": "Current Phôi / Ám 450",
      "contact.open_zalo": "COPY ORDER & OPEN ZALO",
      "contact.email_label": "Support Email",
      "contact.sla_label": "SLA Commitment",
      "qr.title": "Instant VietQR Transfer",
      "qr.subtitle":
        "Scan with any Banking App or E-Wallet for instant and accurate payment.",
      "qr.copy": "Copy",
      "footer.copy": "© 2026 NarutoGold Agency. All Rights Reserved.",
      "footer.privacy": "PRIVACY POLICY",
    },
  };

  const prefersReducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function showToast(message) {
    const toast = document.getElementById("toast-notification");
    const msgEl = document.getElementById("toast-message");
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.dataset.timer);
    toast.dataset.timer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

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
    const langToggle = document.getElementById("lang-toggle");
    const langMenu = document.getElementById("lang-menu");
    const langOptions = document.querySelectorAll(".lang-option");

    const updateLanguageUI = (lang) => {
      if (langToggle) {
        const flag = langToggle.querySelector(".lang-flag");
        const label = langToggle.querySelector(".lang-label");
        if (flag) {
          flag.src =
            lang === "en"
              ? "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
              : "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg";
        }
        if (label) {
          label.textContent = lang === "en" ? "EN" : "VI";
        }
      }

      langOptions.forEach((option) => {
        const active = option.dataset.lang === lang;
        option.classList.toggle("is-active", active);
        option.setAttribute("aria-selected", String(active));
      });

      if (langSelect) {
        langSelect.value = lang;
      }
    };

    const applyLanguage = (lang) => {
      if (!translations[lang]) return;
      localStorage.setItem("site_lang", lang);
      translatePage(lang);
      updateLanguageUI(lang);
      langMenu?.classList.remove("is-open");
      langToggle?.setAttribute("aria-expanded", "false");
    };

    langToggle?.addEventListener("click", () => {
      const isOpen = langMenu.classList.toggle("is-open");
      langToggle.setAttribute("aria-expanded", String(isOpen));
    });

    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        applyLanguage(option.dataset.lang);
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".language-select")) {
        langMenu?.classList.remove("is-open");
        langToggle?.setAttribute("aria-expanded", "false");
      }
    });

    const savedLang =
      localStorage.getItem("site_lang") ||
      (globalThis.navigator.language?.startsWith("en") ? "en" : "vi");

    applyLanguage(savedLang);
  }

  function initHeaderAndMobileNav() {
    const header = document.getElementById("site-header");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("site-nav");

    if (header) {
      const updateHeaderState = () =>
        header.classList.toggle("scrolled", globalThis.scrollY > 12);
      updateHeaderState();
      window.addEventListener("scroll", updateHeaderState, { passive: true });
    }

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
      });

      navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("is-open");
          mobileToggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function initSpotlightAndTilt() {
    if (prefersReducedMotion) return;

    const spotlightCards = document.querySelectorAll(".spotlight-card");
    spotlightCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });

    const tiltCard = document.querySelector(".tilt-card");
    if (tiltCard) {
      tiltCard.addEventListener("mousemove", (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        tiltCard.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      });
      tiltCard.addEventListener("mouseleave", () => {
        tiltCard.style.transform = "";
      });
    }
  }

  function initChakraParticles() {
    const canvas = document.getElementById("chakra-canvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 34 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.2 + 0.8,
      vy: -(Math.random() * 0.45 + 0.15),
      vx: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.55 + 0.2,
      color: Math.random() > 0.3 ? "#ff6a00" : "#00e5ff",
    }));

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      requestAnimationFrame(render);
    }
    render();
  }

  function initRevealEffects() {
    const animatedElements = document.querySelectorAll(".animate");
    if (!animatedElements.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in globalThis)) {
      animatedElements.forEach((el) => el.classList.add("visible"));
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  function initCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) return;

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
      { threshold: 0.35 },
    );

    counters.forEach((counter) => observer.observe(counter));
  }

  function initShowcaseModal() {
    const track = document.getElementById("showcase-track");
    if (track && !track.dataset.cloned) {
      // Nhân đôi các thẻ để chạy vòng lặp vô tận mượt mà không bị giật
      const clones = Array.from(track.children).map((node) =>
        node.cloneNode(true),
      );
      clones.forEach((clone) => track.appendChild(clone));
      track.dataset.cloned = "true";
    }

    const modal = document.getElementById("showcase-modal");
    const image = document.getElementById("showcase-modal-image");
    const title = document.getElementById("showcase-modal-title");
    const list = document.getElementById("showcase-modal-list");
    const closeButton = document.querySelector(".showcase-modal-close");
    const prevBtn = document.getElementById("modal-prev-btn");
    const nextBtn = document.getElementById("modal-next-btn");
    const cards = Array.from(document.querySelectorAll(".showcase-card"));

    if (!modal || !image || !title || !list || !closeButton) return;

    let currentIndex = 0;

    const openModalAt = (index) => {
      currentIndex = (index + cards.length) % cards.length;
      const card = cards[currentIndex];
      const img = card.querySelector("img");
      const items = (card.dataset.items || "").split("|");

      image.src = img?.src || "";
      image.alt = img?.alt || "Hình ảnh minh họa";
      title.textContent = card.dataset.title || "Chi tiết";
      list.innerHTML = items
        .filter(Boolean)
        .map((item) => `<li>${item}</li>`)
        .join("");

      modal.classList.add("is-active");
      modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
      modal.classList.remove("is-active");
      modal.setAttribute("aria-hidden", "true");
    };

    cards.forEach((card, idx) => {
      card.addEventListener("click", () => openModalAt(idx));
    });

    prevBtn?.addEventListener("click", () => openModalAt(currentIndex - 1));
    nextBtn?.addEventListener("click", () => openModalAt(currentIndex + 1));
    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-active")) return;
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowLeft") openModalAt(currentIndex - 1);
      if (event.key === "ArrowRight") openModalAt(currentIndex + 1);
    });
  }

  function initPlanSelectorAndOrder() {
    const planButtons = document.querySelectorAll(".btn-select-plan");
    const selectInput = document.getElementById("selected-plan-input");
    const serverInput = document.getElementById("server-input");
    const embryoInput = document.getElementById("embryo-input");
    const copyAndZaloBtn = document.getElementById("copy-and-zalo-btn");
    const copyStkBtn = document.getElementById("copy-stk-btn");

    planButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosenPlan = btn.dataset.plan;
        if (chosenPlan && selectInput) {
          selectInput.value = chosenPlan;
          showToast(`Đã chọn: ${chosenPlan}`);
          setTimeout(() => serverInput?.focus(), 600);
        }
      });
    });

    copyAndZaloBtn?.addEventListener("click", async () => {
      const plan = selectInput?.value || "Gói Khuyên Dùng";
      const server = serverInput?.value.trim() || "Chưa nhập";
      const embryo = embryoInput?.value.trim() || "Đủ phôi theo quy định";

      const orderSummary = `[NHDINHGOLD - ĐẶT ĐƠN]\n• Gói: ${plan}\n• Server: ${server}\n• Số phôi/Ám: ${embryo}\nNhờ ad chạy vàng và xếp lịch chạy giúp mình!`;

      try {
        await navigator.clipboard.writeText(orderSummary);
        showToast("Đã sao chép thông tin đơn! Đang mở Zalo...");
      } catch {
        showToast("Đang chuyển hướng sang Zalo...");
      }

      setTimeout(() => {
        window.open(
          "https://zalo.me/0389307257",
          "_blank",
          "noopener,noreferrer",
        );
      }, 650);
    });

    copyStkBtn?.addEventListener("click", async () => {
      const stk = copyStkBtn.dataset.copy || "19074486671011";
      try {
        await navigator.clipboard.writeText(stk);
        showToast("Đã sao chép STK Techcombank: 1907 4486 6710 11");
      } catch {
        showToast("STK: 19074486671011");
      }
    });
  }

  function initSystemModal() {
    const modal = document.getElementById("overload-modal");
    const openBtn = document.getElementById("open-rule-btn");
    const closeX = document.getElementById("close-overload-x");
    const closeBtn = document.getElementById("close-overload-btn");
    const viewPlansBtn = document.getElementById("modal-view-plans-btn");

    const showModal = () => modal?.classList.add("is-active");
    const hideModal = () => {
      modal?.classList.remove("is-active");
      sessionStorage.setItem("nhdinh_rule_seen", "true");
    };

    openBtn?.addEventListener("click", showModal);
    closeX?.addEventListener("click", hideModal);
    closeBtn?.addEventListener("click", hideModal);
    viewPlansBtn?.addEventListener("click", () => {
      hideModal();
      document
        .getElementById("pricing")
        ?.scrollIntoView({ behavior: "smooth" });
    });

    // Giữ tương thích ngược với các hàm global nếu cần
    window.showOverloadAlert = showModal;
    window.closeOverloadAlert = hideModal;

    if (!sessionStorage.getItem("nhdinh_rule_seen")) {
      showModal();
    }
  }

  function initLiveTicker() {
    const ticker = document.getElementById("live-ticker");
    const titleEl = document.getElementById("ticker-title");
    const descEl = document.getElementById("ticker-desc");
    const closeBtn = document.getElementById("ticker-close");

    if (!ticker || !titleEl || !descEl) return;

    const events = [
      {
        title: "Khách hàng Server S62 • Vừa xong",
        desc: "Vừa chốt Gói Khuyên Dùng (+1.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S51 • 1 phút trước",
        desc: "Vừa hoàn tất Gói 15 Ngày (+6.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S41 • Vừa xong",
        desc: "Vừa đăng ký Gói 30 Ngày (Ưu đãi 30% - 12M Vàng)",
      },
      {
        title: "Khách hàng Server S67 • 2 phút trước",
        desc: "Đã nghiệm thu Gói Cơ Bản (+400.000 Vàng trong 2h)",
      },
      {
        title: "Khách hàng Server S78 • Vừa xong",
        desc: "Vừa kích hoạt Gói Nâng Cao GOD TIER (+15.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S80 • 1 phút trước",
        desc: "Vừa đăng ký Gói 7 Ngày (+2.800.000 Vàng)",
      },
      {
        title: "Khách hàng Server S21 • 3 phút trước",
        desc: "Vừa hoàn tất Gói Khuyên Dùng (Đủ 10 phôi 450)",
      },
      {
        title: "Khách hàng Server S56 • Vừa xong",
        desc: "Vừa chốt Gói 15 Ngày (Luồng ưu tiên 2.100.000đ)",
      },
      {
        title: "Khách hàng Server S71 • 2 phút trước",
        desc: "Đã bàn giao xong 1.000.000 Vàng (Bảo hiểm 100%)",
      },
      {
        title: "Khách hàng Server S41 • 4 phút trước",
        desc: "Gia hạn tiếp Gói 30 Ngày (+12.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S89 • Vừa xong",
        desc: "Vừa hoàn tất Gói 15 Ngày (+6.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S62 • 3 phút trước",
        desc: "Đã nghiệm thu Gói 7 Ngày (+2.800.000 Vàng)",
      },
      {
        title: "Khách hàng Server S142 • Vừa xong",
        desc: "Vừa chốt Gói Khuyên Dùng (+1.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S55 • 2 phút trước",
        desc: "Vừa đăng ký Gói 30 Ngày (Tiết kiệm 30%)",
      },
      {
        title: "Khách hàng Server S78 • 5 phút trước",
        desc: "Đã bàn giao Gói Cơ Bản (+400.000 Vàng siêu tốc)",
      },
      {
        title: "Khách hàng Server S201 • Vừa xong",
        desc: "Đã nghiệm thu Gói Cơ Bản trong 2h15p",
      },
      {
        title: "Khách hàng Server S51 • 3 phút trước",
        desc: "Vừa chốt Gói GOD TIER (Hỗ trợ 1-1 bởi nhdinh)",
      },
      {
        title: "Khách hàng Server S67 • Vừa xong",
        desc: "Vừa thanh toán VietQR Gói 15 Ngày (+6.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S80 • 2 phút trước",
        desc: "Đã nhận bàn giao 2.800.000 Vàng đúng tiến độ",
      },
      {
        title: "Khách hàng Server S21 • Vừa xong",
        desc: "Vừa đăng ký Gói Khuyên Dùng (Luồng ưu tiên VIP)",
      },
      {
        title: "Khách hàng Server S56 • 4 phút trước",
        desc: "Đã nghiệm thu Gói 30 Ngày (+12.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S71 • Vừa xong",
        desc: "Vừa chốt Gói Cơ Bản (Có sẵn 10 phôi 450)",
      },
    ];

    // Xáo trộn ngẫu nhiên danh sách mỗi lần tải trang để không bị lặp thứ tự
    const shuffledEvents = [...events].sort(() => Math.random() - 0.5);

    let idx = 0;
    let dismissed = false;
    let hideTimeout;

    closeBtn?.addEventListener("click", () => {
      dismissed = true;
      ticker.classList.remove("is-visible");
      clearTimeout(hideTimeout);
    });

    const showNextTicker = () => {
      if (dismissed) return;
      const item = shuffledEvents[idx % shuffledEvents.length];
      titleEl.textContent = item.title;
      descEl.textContent = item.desc;
      ticker.classList.add("is-visible");

      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        ticker.classList.remove("is-visible");
      }, 4200); // Hiện trong 4.2 giây

      idx++;
    };

    // Hiển thị thông báo đầu tiên ngay sau 2 giây khi vừa vào web
    setTimeout(() => {
      showNextTicker();
      // Sau đó cứ mỗi 6.5 giây lại nhảy 1 server mới liên tục
      setInterval(showNextTicker, 6500);
    }, 2000);
  }

  initLanguageSwitcher();
  initHeaderAndMobileNav();
  initSpotlightAndTilt();
  initChakraParticles();
  initRevealEffects();
  initCounters();
  initShowcaseModal();
  initPlanSelectorAndOrder();
  initSystemModal();
  initLiveTicker();
});
