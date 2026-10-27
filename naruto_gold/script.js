function animateCounter(element) {
  if (element.dataset.animated === "true") {
    return;
  }

  const target = Number(element.dataset.target || 0);
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";
  const decimals = Number(element.dataset.decimals || 0);
  const duration = Number(element.dataset.duration || 1600);
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
        "ENTERPRISE NETWORK: 81/81 CLUSTERS (S1 - S81) ONLINE • 10M+ USERS",
      "topbar.requirement": "Quy định phôi: Tối thiểu 5 - 10 phôi 450",
      "nav.services": "DỊCH VỤ",
      "nav.pricing": "BẢNG GIÁ",
      "nav.showcase": "KẾT QUẢ",
      "nav.contact": "LIÊN HỆ",
      "cta.order": "ĐẶT ĐƠN NGAY",
      "cta.contact": "Kết nối Zalo Tổng Đài",
      "cta.view_pricing": "Trạm tính vàng & Bảng giá",
      "hero.eyebrow":
        "HỆ SINH THÁI 10.000.000+ GAME THỦ TIN DÙNG • CHUẨN 2026",
      "hero.title":
        "Đế chế Cày Vàng & Tối ưu <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Hạ tầng tự động hóa & đội ngũ trực chiến 24/7 phủ sóng toàn bộ cụm máy chủ <strong>S1 – S81</strong>. Bảo mật VPN cô lập kép, cam kết bảo hiểm tài khoản 100%.",
      "hero.highlights.operational": "Hệ sinh thái User",
      "hero.highlights.insurance": "Bảo hiểm Tuyệt đối",
      "hero.highlights.response": "Phủ sóng toàn Server",
      "hero.badge": "ENTERPRISE PRO TIER",
      "hero.card.title": "NHDINH Core Engine™",
      "hero.card.desc":
        "Trung tâm điều phối đơn hàng công suất lớn với mã hóa SSL 256-bit kép, cam kết bàn giao chuẩn từng phút.",
      "stats.completed": "Người dùng tin cậy",
      "stats.rating": "5.0★ (98.5k Đánh giá)",
      "trust.delivered": "Cộng đồng & Lượt truy cập",
      "trust.gold_total": "Tổng lượng Vàng đã bàn giao",
      "trust.safety": "Tỷ lệ an toàn tài khoản",
      "trust.compensation": "Cam kết đền bù nếu vi phạm",
      "services.tag": "HẠ TẦNG DỊCH VỤ ENTERPRISE",
      "services.title": "Quy trình chuẩn tập đoàn & bảo mật tối đa.",
      "services.subtitle":
        "Vận hành trên hệ thống phân luồng độc lập cho toàn bộ 81 máy chủ, đảm bảo tốc độ bàn giao nhanh gấp 3 lần tiêu chuẩn thông thường.",
      "services.feature1.title": "An toàn tuyệt đối",
      "services.feature1.desc":
        "Mỗi tài khoản được gán một IP VPN riêng biệt trùng khớp vị trí địa lý. Tuyệt đối bảo mật thông tin và vật phẩm.",
      "services.feature2.title": "Tốc độ tối ưu",
      "services.feature2.desc":
        "Hệ thống phân bổ Booster tự động ngay khi chốt đơn, hoàn tất nhiệm vụ trong 2h – 15h kèm báo cáo trực tiếp.",
      "services.feature3.title": "Gói dịch vụ đa dạng",
      "services.feature3.desc":
        "Từ gói Cơ Bản chạy siêu tốc đến gói GOD TIER 15.000.000 Vàng do đích thân CEO nhdinh giám sát 1-1.",
      "cluster.title": "Trạng thái 81 Máy Chủ (S1 – S81) Thời Gian Thực",
      "cluster.sub":
        "Nhấp vào cụm Server của bạn để chuyển thẳng tới Trạm Đặt Đơn",
      "pricing.plans_label": "PRICING & GOLD SIMULATOR",
      "pricing.title": "Bảng giá niêm yết chuẩn 2026",
      "pricing.note":
        "Áp dụng đồng nhất trên toàn bộ máy chủ S1 – S81. Cam kết đúng tiến độ và bảo hiểm 100%.",
      "sim.title": "Ước tính nhanh sản lượng Vàng & Chi phí",
      "sim.desc":
        "Kéo thanh trượt để mô phỏng ngân sách dự kiến theo tỷ lệ chuẩn <strong>400.000 cá = 1.200.000 Vàng</strong>.",
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
      "showcase.tag": "BẰNG CHỨNG NGHIỆM THU THỰC TẾ",
      "showcase.title": "Kết quả sau khi chạy vàng",
      "showcase.subtitle":
        "Nhấp vào bất kỳ hình ảnh nào để mở Báo Cáo Kiểm Định (Inspection Report) độ phân giải cao.",
      "contact.support_label": "DIRECT SUPPORT & DISPATCH CONSOLE",
      "contact.title": "Kênh điều phối dịch vụ",
      "contact.desc":
        "Kết nối trực tiếp với tổng đài điều phối viên để thẩm định acc miễn phí và kích hoạt luồng chạy vàng ưu tiên ngay lập tức.",
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
      "footer.copy":
        "© 2026 NarutoGold Enterprise (10M+ Users Ecosystem). All Rights Reserved.",
    },
    en: {
      "topbar.status":
        "ENTERPRISE NETWORK: 81/81 CLUSTERS (S1 - S81) ONLINE • 10M+ USERS",
      "topbar.requirement": "Requirement: Minimum 5 - 10 Embryos (Phôi 450)",
      "nav.services": "SERVICES",
      "nav.pricing": "PRICING",
      "nav.showcase": "RESULTS",
      "nav.contact": "CONTACT",
      "cta.order": "ORDER NOW",
      "cta.contact": "Connect on Zalo",
      "cta.view_pricing": "Gold Simulator & Pricing",
      "hero.eyebrow": "10,000,000+ GAMERS ECOSYSTEM • 2026 ENTERPRISE STANDARD",
      "hero.title": "Gold & Power Empire for <span>Naruto Online MMORPG</span>",
      "hero.desc":
        "Automated infrastructure & 24/7 challenger team covering all servers <strong>S1 – S81</strong>. Dual isolated VPN security, 100% account insurance.",
      "hero.highlights.operational": "User Ecosystem",
      "hero.highlights.insurance": "Account Insured",
      "hero.highlights.response": "All Servers Covered",
      "hero.badge": "ENTERPRISE PRO TIER",
      "hero.card.title": "NHDINH Core Engine™",
      "hero.card.desc":
        "High-throughput order dispatch engine with dual 256-bit SSL encryption, delivered right on schedule.",
      "stats.completed": "Trusted Users",
      "stats.rating": "5.0★ (98.5k reviews)",
      "trust.delivered": "Community & Reach",
      "trust.gold_total": "Total Gold Delivered",
      "trust.safety": "Account Safety Rate",
      "trust.compensation": "Compensation on violation",
      "services.tag": "ENTERPRISE SERVICE INFRASTRUCTURE",
      "services.title": "Corporate-grade process & maximum security.",
      "services.subtitle":
        "Operating on isolated dispatch queues across all 81 servers, delivering 3x faster than standard services.",
      "services.feature1.title": "Absolute safety",
      "services.feature1.desc":
        "Each account is assigned a dedicated geo-matched VPN IP. Total protection for your items and privacy.",
      "services.feature2.title": "Optimized speed",
      "services.feature2.desc":
        "Automated booster allocation upon confirmation, completing orders in 2h – 15h with live updates.",
      "services.feature3.title": "Diverse service packages",
      "services.feature3.desc":
        "From rapid Starter packs to 15,000,000 Gold GOD TIER supervised 1-on-1 by CEO nhdinh.",
      "cluster.title": "Real-time 81 Servers (S1 – S81) Telemetry",
      "cluster.sub":
        "Click your Server Cluster to jump directly to the Order Console",
      "pricing.plans_label": "PRICING & GOLD SIMULATOR",
      "pricing.title": "Official 2026 Listed Prices",
      "pricing.note":
        "Uniformly applied across Servers S1 – S81. On-time guarantee and 100% account insurance.",
      "sim.title": "Instant Gold & Cost Simulator",
      "sim.desc":
        "Slide to simulate your budget based on our standard rate: <strong>400,000 cá = 1,200,000 Gold</strong>.",
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
      "showcase.tag": "VERIFIED INSPECTION REPORTS",
      "showcase.title": "Results after gold farming",
      "showcase.subtitle":
        "Click on any image to inspect our high-resolution pre-handover verification checklist.",
      "contact.support_label": "DIRECT SUPPORT & DISPATCH CONSOLE",
      "contact.title": "Service coordination",
      "contact.desc":
        "Connect directly with our dispatchers for a free account assessment and instant VIP queue activation.",
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
      "footer.copy":
        "© 2026 NarutoGold Enterprise (10M+ Users Ecosystem). All Rights Reserved.",
    },
  };

  const prefersReducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)"
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
                  link.getAttribute("href") === `#${id}`
                );
              });
            }
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
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

    const cursorAura = document.getElementById("cursor-aura");
    window.addEventListener(
      "mousemove",
      (e) => {
        if (cursorAura) {
          cursorAura.style.transform = `translate(${e.clientX - 275}px, ${e.clientY - 275}px)`;
        }
      },
      { passive: true }
    );

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
        targetX = x * 11;
        targetY = -y * 11;
        if (!rafId) rafId = requestAnimationFrame(updateTilt);
      });

      tiltCard.addEventListener("mouseleave", () => {
        targetX = 0;
        targetY = 0;
        if (!rafId) rafId = requestAnimationFrame(updateTilt);
      });
    }
  }

  // Mạng lưới hạt Chakra kết nối tia năng lượng tương tác với chuột
  function initChakraParticles() {
    const canvas = document.getElementById("chakra-canvas");
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -9999, y: -9999 };
    window.addEventListener(
      "mousemove",
      (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true }
    );

    const count = window.innerWidth < 768 ? 28 : 58;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.4 + 1,
      vy: -(Math.random() * 0.5 + 0.18),
      vx: (Math.random() - 0.5) * 0.45,
      alpha: Math.random() * 0.6 + 0.25,
      color: Math.random() > 0.32 ? "#ff6a00" : "#00e5ff",
    }));

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    function render() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Tương tác lực đẩy nhẹ khi di chuột lại gần
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 130 && distMouse > 0) {
          p.x += (dxMouse / distMouse) * 1.2;
          p.y += (dyMouse / distMouse) * 1.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Vẽ tia liên kết năng lượng giữa các hạt gần nhau
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - dist / 115) * 0.16;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(render);
    }
    render();
  }

  function initLiveTelemetryMetrics() {
    const ccuEl = document.getElementById("live-ccu");
    const pingEl = document.getElementById("live-ping");

    setInterval(() => {
      if (ccuEl) {
        const base = 14800 + Math.floor(Math.random() * 190);
        ccuEl.textContent = base.toLocaleString("vi-VN");
      }
      if (pingEl) {
        const ping = 10 + Math.floor(Math.random() * 5);
        pingEl.textContent = `${ping}ms`;
      }
    }, 3500);
  }

  function initGoldSimulator() {
    const rangeInput = document.getElementById("sim-range");
    const budgetDisplay = document.getElementById("sim-budget-display");
    const goldOutput = document.getElementById("sim-gold-output");
    const reqOutput = document.getElementById("sim-req-output");
    const timeOutput = document.getElementById("sim-time-output");
    const applyBtn = document.getElementById("sim-apply-btn");
    const selectInput = document.getElementById("selected-plan-input");

    if (!rangeInput) return;

    const updateSimulator = () => {
      const budget = Number(rangeInput.value);
      budgetDisplay.textContent = `${budget.toLocaleString("vi-VN")} cá`;

      let gold = 0;
      let req = "5 - 10 phôi 450";
      let time = "10 - 15 giờ (Luồng ưu tiên)";

      if (budget <= 200000) {
        gold = 400000;
        req = "Ưu tiên 10 phôi 450";
        time = "2 - 3 giờ (Siêu tốc)";
      } else if (budget >= 4000000) {
        gold = 15000000;
        req = "Tối thiểu 20 ám 450";
        time = "Hỗ trợ 1-1 trực tiếp bởi nhdinh";
      } else {
        // Chuẩn 400.000 cá = 1.200.000 Vàng (1 cá = 3 Vàng)
        gold = budget * 3;
      }

      goldOutput.textContent = `${gold.toLocaleString("vi-VN")} Vàng`;
      reqOutput.textContent = req;
      timeOutput.textContent = time;
    };

    rangeInput.addEventListener("input", updateSimulator);
    updateSimulator();

    applyBtn?.addEventListener("click", () => {
      const budget = Number(rangeInput.value);
      if (selectInput) {
        if (budget <= 200000) {
          selectInput.value = "GÓI CƠ BẢN (200.000 cá - 400.000 Vàng)";
        } else if (budget >= 4000000) {
          selectInput.value =
            "GÓI NÂNG CAO GOD TIER (4.000.000 cá - 15.000.000 Vàng)";
        } else {
          selectInput.value = "GÓI KHUYÊN DÙNG (400.000 cá - 1.200.000 Vàng)";
        }
        selectInput.dispatchEvent(new Event("change"));
      }
      showToast(
        `Đã áp dụng mức ${budget.toLocaleString("vi-VN")} cá vào Trạm Đặt Đơn!`
      );
    });
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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
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
      { threshold: 0.35 }
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
    const clusterNodes = document.querySelectorAll(".cluster-node");
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

    clusterNodes.forEach((node) => {
      node.addEventListener("click", () => {
        const srv = node.dataset.selectServer || "S62";
        if (serverInput) {
          serverInput.value = srv;
          updateLivePreview();
        }
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        showToast(`Đã chọn cụm máy chủ ${srv}!`);
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
          "noopener,noreferrer"
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
  initLiveTelemetryMetrics();
  initGoldSimulator();
  initRevealEffects();
  initCounters();
  initShowcaseModal();
  initPlanSelectorAndOrder();
  initSystemModal();
  initLiveTicker();
});