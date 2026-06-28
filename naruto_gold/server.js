require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const nodemailer = require("nodemailer");
const cors = require("cors");
const { validateOrderMiddleware } = require("./validation"); // <-- Nhập middleware vừa tạo

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// 1. Cấu hình Microsoft SQL Server
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT) || 1433,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: false, trustServerCertificate: true },
};

const appPool = new sql.ConnectionPool(sqlConfig);
const poolConnect = appPool.connect();

poolConnect
  .then(() => {
    console.log("✅ Đã kết nối thành công tới Microsoft SQL Server!");
  })
  .catch((err) => console.error("❌ Lỗi kết nối SQL Server:", err));

// 2. Cấu hình robot gửi Email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// API Tạo đơn hàng (Gắn validateOrderMiddleware vào giữa đường dẫn và async function)
app.post("/api/create-order", validateOrderMiddleware, async (req, res) => {
  // Dữ liệu lúc này đảm bảo 100% hợp lệ, sạch sẽ và đúng chuẩn
  const {
    customerName,
    contactPhone,
    customerEmail,
    gameAccount,
    gamePassword,
    note,
  } = req.body;

  try {
    await poolConnect;
    const trackingCode = "NRT-" + Math.floor(100000 + Math.random() * 900000);

    const request = appPool.request();
    request.input("trackingCode", sql.VarChar, trackingCode);
    request.input("customerName", sql.NVarChar, customerName);
    request.input("contactPhone", sql.VarChar, contactPhone);
    request.input("customerEmail", sql.VarChar, customerEmail);
    request.input("gameAccount", sql.NVarChar, gameAccount);
    request.input("gamePassword", sql.NVarChar, gamePassword);
    request.input("note", sql.NVarChar, note);

    const query = `
      INSERT INTO orders (tracking_code, customer_name, contact_phone, customer_email, game_account, game_password, note)
      OUTPUT inserted.id
      VALUES (@trackingCode, @customerName, @contactPhone, @customerEmail, @gameAccount, @gamePassword, @note);
    `;

    const result = await request.query(query);
    const insertedId = result.recordset[0].id;

    // =========================================================================
    // THƯ SỐ 1: BẮN CHO ADMIN
    // =========================================================================
    const adminMailOptions = {
      from: '"NarutoGold System" <no-reply@narutogold.com>',
      to: process.env.ADMIN_EMAIL,
      subject: `[ĐƠN HÀNG MỚI] Mã: ${trackingCode} - Khách: ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin:auto; background:#0b1021; color:#f8fafc; border:1px solid #1e293b; border-radius:10px; overflow:hidden;">
          <div style="background:#ff6a00; color:#fff; padding:18px;">
            <h2 style="margin:0;">⚡ CÓ ĐƠN ĐẶT CÀY VÀNG MỚI</h2>
            <p style="margin:6px 0 0;">Đơn hàng #${insertedId}</p>
          </div>
          <div style="padding:20px;">
            <p style="margin-top:0;">
              <strong>Mã tra cứu:</strong>
              <span style="font-size:18px;color:#00e5ff;">${trackingCode}</span>
            </p>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px;border-bottom:1px solid #334155;"><strong>👤 Khách hàng</strong></td>
                <td style="padding:10px;border-bottom:1px solid #334155;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #334155;"><strong>📧 Email</strong></td>
                <td style="padding:10px;border-bottom:1px solid #334155;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #334155;"><strong>📱 Zalo / SĐT</strong></td>
                <td style="padding:10px;border-bottom:1px solid #334155;">
                  <a href="https://zalo.me/${contactPhone}" style="color:#10b981;text-decoration:none;">${contactPhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #334155;"><strong>🎮 Tài khoản Game</strong></td>
                <td style="padding:10px;border-bottom:1px solid #334155;"><code style="color:#6ef0b2;font-size:15px;">${gameAccount}</code></td>
              </tr>
              <tr>
                <td style="padding:10px;border-bottom:1px solid #334155;"><strong>🔑 Mật khẩu</strong></td>
                <td style="padding:10px;border-bottom:1px solid #334155;"><code style="color:#ff4d4d;font-size:15px;">${gamePassword}</code></td>
              </tr>
              <tr>
                <td style="padding:10px;vertical-align:top;"><strong>📝 Yêu cầu chi tiết</strong></td>
                <td style="padding:10px;white-space:pre-line;">${note || "Không có"}</td>
              </tr>
            </table>
            <div style="margin-top:20px;padding:12px;background:#1e293b;border-radius:6px;font-size:13px;color:#94a3b8;">
              Email được gửi tự động từ hệ thống NarutoGold.
            </div>
          </div>
        </div>
      `,
    };

    // =========================================================================
    // THƯ SỐ 2: BẮN CHO KHÁCH HÀNG
    // =========================================================================
    const customerMailOptions = {
      from: '"NarutoGold Agency" <support@narutogold.com>',
      to: customerEmail,
      subject: `[NarutoGold] Xác nhận đơn hàng #${trackingCode} thành công!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #03050c; color: #f1f5f9; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          <div style="background: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%); padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">NARUTO GOLD</h1>
            <p style="margin: 5px 0 0; font-size: 14px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1px;">Hệ thống Boosting Game Chuyên Nghiệp</p>
          </div>
          <div style="padding: 30px 25px; background-color: #0b1021;">
            <h2 style="color: #00e5ff; margin-top: 0;">Xin chào ${customerName},</h2>
            <p style="line-height: 1.6; color: #cbd5e1;">Cảm ơn bạn đã tin tưởng và lựa chọn dịch vụ của <strong>NarutoGold</strong>. Yêu cầu cày trang bị/vàng của bạn đã được hệ thống ghi nhận và chuyển cho đội ngũ Booster Thách Đấu.</p>
            <div style="background-color: #10172e; border: 1px dashed #00e5ff; border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0;">
              <span style="font-size: 12px; color: #8492a6; text-transform: uppercase; display: block; margin-bottom: 5px;">Mã vận đơn tra cứu của bạn</span>
              <strong style="font-size: 24px; color: #ff6a00; letter-spacing: 2px;">${trackingCode}</strong>
            </div>
            <h3 style="color: #f1f5f9; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Thông tin ghi nhận:</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #8492a6;">Tài khoản game:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #10b981;">${gameAccount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8492a6;">SĐT / Zalo liên hệ:</td>
                <td style="padding: 8px 0; font-weight: bold;">${contactPhone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #8492a6;">Trạng thái:</td>
                <td style="padding: 8px 0;"><span style="background-color: rgba(255, 106, 0, 0.15); color: #ff6a00; padding: 4px 10px; border-radius: 99px; font-size: 12px; font-weight: bold;">ĐANG ĐIỀU PHỐI</span></td>
              </tr>
            </table>
            <div style="margin-top: 30px; padding: 15px; background-color: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981; border-radius: 6px; font-size: 13px; color: #94a3b8;">
              💡 <strong>Lưu ý an toàn:</strong> Trong thời gian Booster thực hiện đơn, vui lòng không đăng nhập vào game để tránh bị văng kết nối. Chúng tôi sẽ nhắn tin qua Zalo ngay khi hoàn tất!
            </div>
          </div>
          <div style="background-color: #03050c; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">
            <p style="margin: 0;">Nếu có bất kỳ thắc mắc nào, hãy phản hồi trực tiếp email này hoặc gọi Hotline: <strong>0987.654.321</strong></p>
            <p style="margin: 8px 0 0;">© 2026 NarutoGold Agency. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    // Gửi song song nhưng có xử lý lỗi ngầm để tránh rớt đơn hàng
    Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]).catch((mailErr) =>
      console.error("⚠️ Gửi email thất bại nhưng đơn đã tạo:", mailErr),
    );

    res.status(200).json({ success: true, trackingCode });
  } catch (error) {
    console.error("❌ Lỗi hệ thống:", error);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
});

app.listen(3000, () =>
  console.log("🚀 Máy chủ Agency đang chạy tại http://localhost:3000"),
);
