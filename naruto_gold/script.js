document.addEventListener("DOMContentLoaded", () => {
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
      title: "Thông báo ưu tiên",
      icon: "info",
      html: `Ưu tiên khách hàng có phôi giao dịch ám <strong>450</strong>, Nếu có <strong>10</strong> hoặc nhiều hơn thì liên hệ ngay!`,
      confirmButtonText: "Đã hiểu",
      timer: 10000,
      timerProgressBar: true,
      allowOutsideClick: true,
      showCloseButton: true,
    });
  }

  showLandingNotice();

  /* 3. Logic xử lý Form DUY NHẤT */
  const form = document.getElementById("orderForm");

  const escapeHTML = (str) => {
    if (!str) return "";
    return str.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        })[m],
    );
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    // Kiểm tra định dạng bổ sung
    const phone = formData.get("contactPhone").replace(/\D/g, "");
    const gameAccount = formData.get("gameAccount").trim();
    const gamePassword = formData.get("gamePassword");

    // Kiểm tra xem có phải Username truyền thống không (3-30 ký tự)
    const isUsername = /^[A-Za-z0-9_.-]{3,30}$/.test(gameAccount);
    // Kiểm tra xem có phải định dạng Email không (vd: kage@gmail.com)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gameAccount);

    if (!/^0\d{9,10}$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Sai định dạng SĐT",
        text: "SĐT phải bắt đầu bằng 0 và có 10 hoặc 11 chữ số.",
      });
      return;
    }

    if (!isUsername && !isEmail) {
      Swal.fire({
        icon: "error",
        title: "Sai định dạng Tài khoản Game",
        text: "Vui lòng nhập Username (3-30 ký tự) hoặc một địa chỉ Email hợp lệ.",
      });
      return;
    }

    if (gamePassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Sai định dạng Mật khẩu",
        text: "Mật khẩu phải có ít nhất 6 ký tự.",
      });
      return;
    }

    // BƯỚC 1: XÁC NHẬN (Popup dừng lại ở đây)
    const confirmResult = await Swal.fire({
      title: "Xác nhận gửi đơn hàng",
      icon: "question",
      width: 600,
      showCancelButton: true,
      confirmButtonText: "Gửi đơn hàng",
      cancelButtonText: "Kiểm tra lại",
      reverseButtons: true,
      html: `
        <div style="text-align: left; font-size: 14px;">
          <div style="margin-bottom: 15px;">
            <h4 style="margin: 0 0 5px; color: #3085d6;">👤 Thông tin liên hệ</h4>
            <p style="margin: 0;"><b>Tên:</b> ${escapeHTML(formData.get("customerName"))}</p>
            <p style="margin: 0;"><b>SĐT:</b> ${escapeHTML(formData.get("contactPhone"))}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <h4 style="margin: 0 0 5px; color: #3085d6;">🎮 Thông tin Game</h4>
            <p style="margin: 0;"><b>Tài khoản:</b> ${escapeHTML(formData.get("gameAccount"))}</p>
           <p style="margin: 0;"><b>Mật khẩu:</b> ${escapeHTML(formData.get("gamePassword"))}</p>
          </div>
          <div style="background: #fff3cd; padding: 10px; border-radius: 5px; color: #856404;">
            ⚠️ Kiểm tra kỹ thông tin trước khi nhấn "Gửi".
          </div>
        </div>
      `,
    });

    // Nếu người dùng không xác nhận thì thoát
    if (!confirmResult.isConfirmed) return;

    // BƯỚC 2: HIỂN THỊ ĐANG GỬI
    Swal.fire({
      title: "Đang xử lý...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    // BƯỚC 3: GỬI DỮ LIỆU
    try {
      const response = await fetch("http://localhost:3000/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const data = await response.json();

      if (data.success) {
        // Gửi thành công: Ẩn loading và hiện thông báo
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: `Đơn hàng đã tạo [${data.trackingCode}].`,
          confirmButtonText: "Đóng",
        });
        showCyberToast(
          `Đã tạo đơn [${data.trackingCode}]. Kiểm tra Zalo sau 5 phút!`,
        );
        form.reset();
      } else {
        throw new Error(data.message || "Lỗi server");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gửi thất bại",
        text: "Không thể kết nối đến máy chủ hoặc có lỗi xảy ra.",
      });
      console.error(error);
    }
  });
});
