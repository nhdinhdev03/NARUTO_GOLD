const { z } = require("zod");

// 1. Định nghĩa "Hợp đồng dữ liệu" (Schema)
const orderSchema = z.object({
  customerName: z
    .string({ required_error: "Tên liên hệ không được để trống" })
    .trim()
    .min(2, "Tên liên hệ phải có ít nhất 2 ký tự")
    .max(50, "Tên liên hệ không được vượt quá 50 ký tự"),

  contactPhone: z
    .string({ required_error: "SĐT/Zalo không được để trống" })
    .trim()
    .regex(
      /^0\d{9,10}$/,
      "SĐT không hợp lệ (Phải bắt đầu bằng số 0 và có 10-11 chữ số)",
    ),

  customerEmail: z
    .string({ required_error: "Email không được để trống" })
    .trim()
    .email("Địa chỉ Email không đúng định dạng"),

  gameAccount: z
    .string({ required_error: "Tài khoản game không được để trống" })
    .trim()
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isUsername = /^[A-Za-z0-9_.-]{3,30}$/.test(val);
        return isEmail || isUsername;
      },
      {
        message:
          "Tài khoản game phải là Username (3-30 ký tự) hoặc một địa chỉ Email hợp lệ",
      },
    ),

  gamePassword: z
    .string({ required_error: "Mật khẩu không được để trống" })
    .min(6, "Mật khẩu game phải có ít nhất 6 ký tự"),

  note: z
    .string()
    .trim()
    .optional()

});

// 2. Tạo Middleware chặn trước khi vào API
const validateOrderMiddleware = (req, res, next) => {
  const result = orderSchema.safeParse(req.body);

  if (!result.success) {
    // Nếu dữ liệu vi phạm hợp đồng -> Bị chặn ngay tại đây
    const firstError = result.error.issues[0];
    return res.status(400).json({
      success: false,
      message: firstError.message,
      errorField: firstError.path[0], // Trả về tên ô bị lỗi để Frontend focus vào
    });
  }

  // Ghi đè lại req.body bằng dữ liệu đã được Zod bóc tách & làm sạch tuyệt đối
  req.body = result.data;
  next(); // Cho phép đi tiếp vào API
};

module.exports = { validateOrderMiddleware };
