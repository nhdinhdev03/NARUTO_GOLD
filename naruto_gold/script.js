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
      "topbar.status":
        "SERVER STATUS: ONLINE (S1 - S81) • LUỒNG ƯU TIÊN ĐANG MỞ",
      "topbar.requirement": "Quy định phôi: Tối thiểu 5 - 10 phôi 450",
      "nav.services": "DỊCH VỤ",
      "nav.pricing": "BẢNG GIÁ",
      "nav.showcase": "KẾT QUẢ",
      "nav.contact": "LIÊN HỆ",
      "cta.order": "ĐẶT ĐƠN NGAY",
      "cta.contact": "Liên hệ Zalo",
      "cta.view_pricing": "Xem bảng giá",
      "hero.eyebrow": "HỆ THỐNG AN TOÀN TIÊU CHUẨN 2026",
      "hero.title": "Nhanh chóng, bảo mật <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Giải pháp cày vàng, tối ưu lực chiến cho toàn bộ máy chủ S1 - S81. Đội ngũ trực chiến 24/7, cam kết an toàn tài khoản tuyệt đối.",
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
      "pricing.plans_label": "PRICING PLANS",
      "pricing.title": "Bảng giá niêm yết",
      "pricing.note":
        "Ghi chú: Gửi kèm Server (S1 - S81), mục tiêu, nội dung yêu cầu và thông tin tài khoản game.",
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
      "pricing.recommended.feature1": "Cam kết 1.200.000 Vàng",
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
      "order.server_label": "Server / Máy chủ (S1 - S81)",
      "order.embryo_label": "Số phôi / Ám 450 hiện có",
      "contact.open_zalo": "SAO CHÉP ĐƠN & MỞ ZALO NGAY",
      "contact.email_label": "Email Hỗ Trợ",
      "contact.sla_label": "Cam kết SLA",
      "qr.title": "Thanh toán chuyển khoản nhanh",
      "qr.subtitle":
        "Quét mã QR bằng ứng dụng Ngân hàng hoặc Ví điện tử bất kỳ để thanh toán chính xác tuyệt đối.",
      "qr.copy": "Sao chép",
      "footer.copy": "© 2026 NarutoGold Agency. All Rights Reserved.",
    },
    en: {
      "topbar.status": "SERVER STATUS: ONLINE (S1 - S81) • PRIORITY QUEUE OPEN",
      "topbar.requirement": "Requirement: Minimum 5 - 10 Embryos (Phôi 450)",
      "nav.services": "SERVICES",
      "nav.pricing": "PRICING",
      "nav.showcase": "RESULTS",
      "nav.contact": "CONTACT",
      "cta.order": "ORDER NOW",
      "cta.contact": "Contact on Zalo",
      "cta.view_pricing": "View pricing",
      "hero.eyebrow": "SECURE STANDARD 2026",
      "hero.title": "Fast, secure <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Gold farming solution, optimize combat power across Servers S1 - S81. Challenger team online 24/7, guaranteed absolute account safety.",
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
      "pricing.plans_label": "PRICING PLANS",
      "pricing.title": "Listed prices",
      "pricing.note":
        "Note: Include Server (S1 - S81), target, request details, and game account info.",
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
      "order.server_label": "Server ID (S1 - S81)",
      "order.embryo_label": "Current Phôi / Ám 450",
      "contact.open_zalo": "COPY ORDER & OPEN ZALO",
      "contact.email_label": "Support Email",
      "contact.sla_label": "SLA Commitment",
      "qr.title": "Instant VietQR Transfer",
      "qr.subtitle":
        "Scan with any Banking App or E-Wallet for instant and accurate payment.",
      "qr.copy": "Copy",
      "footer.copy": "© 2026 NarutoGold Agency. All Rights Reserved.",
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

  function initHeaderScrollAndSpy() {
    const header = document.getElementById("site-header");
    const progressBar = document.getElementById("scroll-progress-bar");
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("site-nav");
    const navLinks = document.querySelectorAll(".nav-menu .nav-link");
    const sections = document.querySelectorAll(".nav-section");

    const onScroll = () => {
      const scrollY = window.scrollY;
      header?.classList.toggle("scrolled", scrollY > 12);

      if (progressBar) {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const pct =
          docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;
        progressBar.style.width = `${pct}%`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if ("IntersectionObserver" in globalThis && sections.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("id");
              navLinks.forEach((link) => {
                link.classList.toggle(
                  "is-active",
                  link.getAttribute("href") === `#${id}`,
                );
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" },
      );

      sections.forEach((sec) => spyObserver.observe(sec));
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
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      });
    });

    const tiltCard = document.querySelector(".tilt-card");
    if (tiltCard) {
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let rafId = null;

      const updateTilt = () => {
        currentX += (targetX - currentX) * 0.14;
        currentY += (targetY - currentY) * 0.14;
        tiltCard.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${currentY}deg)`;

        if (
          Math.abs(targetX - currentX) > 0.05 ||
          Math.abs(targetY - currentY) > 0.05
        ) {
          rafId = requestAnimationFrame(updateTilt);
        } else {
          rafId = null;
        }
      };

      tiltCard.addEventListener("mousemove", (e) => {
        const rect = tiltCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        targetX = x * 10;
        targetY = -y * 10;
        if (!rafId) rafId = requestAnimationFrame(updateTilt);
      });

      tiltCard.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(updateTilt);
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
    const marquee = document.getElementById("showcase-marquee");
    const track = document.getElementById("showcase-track");
    const togglePlayBtn = document.getElementById("showcase-toggle-play");
    const openFirstBtn = document.getElementById("showcase-open-first");

    const originalCards = track ? Array.from(track.children) : [];
    const totalUnique = originalCards.length || 7;

    if (track && !track.dataset.cloned) {
      const clones = originalCards.map((node) => node.cloneNode(true));
      clones.forEach((clone) => track.appendChild(clone));
      track.dataset.cloned = "true";
    }

    const modal = document.getElementById("showcase-modal");
    const image = document.getElementById("showcase-modal-image");
    const title = document.getElementById("showcase-modal-title");
    const list = document.getElementById("showcase-modal-list");
    const counterEl = document.getElementById("showcase-modal-counter");
    const closeButton = document.querySelector(".showcase-modal-close");
    const prevBtn = document.getElementById("modal-prev-btn");
    const nextBtn = document.getElementById("modal-next-btn");
    const allCards = Array.from(document.querySelectorAll(".showcase-card"));

    if (!modal || !image || !title || !list || !closeButton) return;

    let currentIndex = 0;

    const openModalAt = (index) => {
      currentIndex = ((index % totalUnique) + totalUnique) % totalUnique;
      const card = originalCards[currentIndex] || allCards[currentIndex];
      const img = card.querySelector("img");
      const items = (card.dataset.items || "").split("|");

      image.src = img?.src || "";
      image.alt = img?.alt || "Hình ảnh minh họa";
      title.textContent = card.dataset.title || "Chi tiết";
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1} / ${totalUnique}`;
      }
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

    allCards.forEach((card, idx) => {
      card.addEventListener("click", () => openModalAt(idx % totalUnique));
    });

    togglePlayBtn?.addEventListener("click", () => {
      const isPaused = marquee?.classList.toggle("is-paused");
      togglePlayBtn.textContent = isPaused
        ? "▶ Tiếp tục trượt"
        : "⏸ Tạm dừng trượt";
    });

    openFirstBtn?.addEventListener("click", () => openModalAt(0));
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
    const quickOrderBox = document.getElementById("quick-order-box");
    const selectInput = document.getElementById("selected-plan-input");
    const serverInput = document.getElementById("server-input");
    const embryoInput = document.getElementById("embryo-input");
    const previewText = document.getElementById("order-preview-text");
    const serverChips = document.querySelectorAll(".server-chip");
    const copyAndZaloBtn = document.getElementById("copy-and-zalo-btn");
    const copyStkBtn = document.getElementById("copy-stk-btn");

    // Kiểm tra và chuẩn hóa Server nằm trong khoảng S1 - S81
    const normalizeServerInput = (rawVal) => {
      const trimmed = rawVal.trim();
      if (!trimmed) return "Chưa nhập (S1 - S81)";

      const match = trimmed.match(/^s?(\d+)$/i);
      if (match) {
        let num = parseInt(match[1], 10);
        if (num > 81) {
          num = 81;
          if (serverInput) serverInput.value = "S81";
          showToast("Hiện tại hệ thống chỉ có từ Server S1 đến S81!");
        } else if (num < 1) {
          num = 1;
          if (serverInput) serverInput.value = "S1";
        }
        return `S${num}`;
      }
      return trimmed.toUpperCase();
    };

    const buildOrderMessage = () => {
      const plan =
        selectInput?.value || "GÓI KHUYÊN DÙNG (400.000 cá - 1.200.000 Vàng)";
      const server = normalizeServerInput(serverInput?.value || "");
      const embryo = embryoInput?.value.trim() || "Đủ 5 - 10 phôi 450";
      return `[NHDINHGOLD - ĐẶT ĐƠN]\n• Gói: ${plan}\n• Server: ${server}\n• Số phôi/Ám: ${embryo}\nNhờ ad chạy vàng và xếp lịch chạy giúp mình!`;
    };

    const updateLivePreview = () => {
      if (previewText) {
        previewText.textContent = buildOrderMessage();
      }
    };

    updateLivePreview();
    selectInput?.addEventListener("change", updateLivePreview);
    serverInput?.addEventListener("input", updateLivePreview);
    embryoInput?.addEventListener("input", updateLivePreview);

    serverChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        serverChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        if (serverInput) {
          serverInput.value = chip.dataset.server || "";
          updateLivePreview();
        }
      });
    });

    planButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosenPlan = btn.dataset.plan;
        if (chosenPlan && selectInput) {
          selectInput.value = chosenPlan;
          updateLivePreview();
          showToast(`Đã chọn: ${chosenPlan}`);

          quickOrderBox?.classList.add("is-highlighted");
          setTimeout(() => {
            quickOrderBox?.classList.remove("is-highlighted");
            serverInput?.focus();
          }, 800);
        }
      });
    });

    copyAndZaloBtn?.addEventListener("click", async () => {
      const orderSummary = buildOrderMessage();
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

    // 100% các Server nằm trong dải S1 -> S81 theo đúng thực tế game hiện tại
    const events = [
      {
        title: "Khách hàng Server S62 • Vừa xong",
        desc: "Vừa chốt Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S51 • 1 phút trước",
        desc: "Đã bàn giao Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S41 • Vừa xong",
        desc: "Vừa kích hoạt Gói GOD TIER (+15.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S67 • 2 phút trước",
        desc: "Đã nghiệm thu Gói Cơ Bản (+400.000 Vàng trong 2h)",
      },
      {
        title: "Khách hàng Server S78 • Vừa xong",
        desc: "Vừa chốt Gói Nâng Cao GOD TIER (+15.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S80 • 1 phút trước",
        desc: "Vừa đăng ký Gói Khuyên Dùng (400k cá - 1.2M Vàng)",
      },
      {
        title: "Khách hàng Server S21 • 3 phút trước",
        desc: "Đã hoàn tất Gói Khuyên Dùng (Đủ 10 phôi 450)",
      },
      {
        title: "Khách hàng Server S56 • Vừa xong",
        desc: "Vừa thanh toán VietQR Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S71 • 2 phút trước",
        desc: "Đã bàn giao xong 1.200.000 Vàng (Bảo hiểm 100%)",
      },
      {
        title: "Khách hàng Server S81 • Vừa xong",
        desc: "Vừa chốt Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S41 • 4 phút trước",
        desc: "Đã nghiệm thu Gói Cơ Bản (+400.000 Vàng siêu tốc)",
      },
      {
        title: "Khách hàng Server S18 • Vừa xong",
        desc: "Vừa chốt Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S62 • 3 phút trước",
        desc: "Vừa chốt Gói GOD TIER (Hỗ trợ 1-1 bởi nhdinh)",
      },
      {
        title: "Khách hàng Server S35 • Vừa xong",
        desc: "Đã nhận bàn giao 1.200.000 Vàng đúng tiến độ",
      },
      {
        title: "Khách hàng Server S78 • 5 phút trước",
        desc: "Đã bàn giao Gói Cơ Bản (+400.000 Vàng trong 2h10p)",
      },
      {
        title: "Khách hàng Server S9 • Vừa xong",
        desc: "Vừa đăng ký Gói Khuyên Dùng (Luồng ưu tiên VIP)",
      },
      {
        title: "Khách hàng Server S51 • 3 phút trước",
        desc: "Đã nghiệm thu Gói GOD TIER (+15.000.000 Vàng)",
      },
      {
        title: "Khách hàng Server S74 • 2 phút trước",
        desc: "Vừa chốt Gói Cơ Bản (Có sẵn 10 phôi 450)",
      },
      {
        title: "Khách hàng Server S29 • Vừa xong",
        desc: "Đã hoàn tất Gói Khuyên Dùng (+1.200.000 Vàng)",
      },
      {
        title: "Khách hàng Server S80 • 4 phút trước",
        desc: "Đã bàn giao 1.200.000 Vàng (An toàn tuyệt đối)",
      },
    ];

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
      }, 4200);

      idx++;
    };

    setTimeout(() => {
      showNextTicker();
      setInterval(showNextTicker, 6500);
    }, 2000);
  }

  initLanguageSwitcher();
  initHeaderScrollAndSpy();
  initSpotlightAndTilt();
  initChakraParticles();
  initRevealEffects();
  initCounters();
  initShowcaseModal();
  initPlanSelectorAndOrder();
  initSystemModal();
  initLiveTicker();
});
