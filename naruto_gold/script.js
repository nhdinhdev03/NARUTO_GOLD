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

  /* 3. Nếu trang vẫn còn form đặt hàng, chuyển hướng người dùng sang Zalo */
  const form = document.getElementById("orderForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Đặt hàng qua Zalo",
        html: `Hiện tại hệ thống đơn online tạm dừng. Vui lòng nhấn vào nút để mở Zalo và gửi yêu cầu trực tiếp đến <strong>0389 307 257</strong>.`,
        confirmButtonText: "Mở Zalo",
        showCancelButton: true,
        cancelButtonText: "Đóng",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://zalo.me/0389307257", "_blank");
        }
      });
    });
  }
});
