import { defineConfig } from "vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  build: {
    // 1. TẮT SOURCEMAP (Quan trọng nhất)
    // Nếu bật, người khác có thể xem được toàn bộ code gốc của bạn trên tab Sources của DevTools.
    sourcemap: false,

    // 2. SỬ DỤNG TERSER ĐỂ MINIFY
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Xóa toàn bộ console.log, console.info...
        drop_debugger: true, // Xóa các câu lệnh debugger
      },
      format: {
        comments: false, // Xóa toàn bộ ghi chú (comments) trong file khi build
      },
    },

    // 3. TỐI ƯU HÓA FILE ĐẦU RA (Tránh cache)
    rollupOptions: {
      output: {
        // Tự động thêm mã hash vào tên file (VD: index-a1b2c3d4.js) để tránh lỗi cache trình duyệt
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },

  plugins: [
    // 4. LÀM RỐI MÃ NGUỒN (OBFUSCATION)
    // Biến code JS của bạn thành các ký tự không thể đọc hiểu, chống dịch ngược.
    obfuscatorPlugin({
      include: ["**/*.js"],
      apply: "build", // Chỉ chạy plugin này khi build đẩy lên server (không chạy lúc dev)
      options: {
        compact: true,
        controlFlowFlattening: true, // Phá vỡ luồng điều khiển (if, for...) làm code rất khó theo dõi
        controlFlowFlatteningThreshold: 0.7,
        deadCodeInjection: true, // Bơm thêm code rác vào để đánh lừa người đọc code
        deadCodeInjectionThreshold: 0.4,

        // BẢO MẬT MẠNH: Chống mở DevTools (F12). Nếu họ cố tình mở tab Console, trình duyệt sẽ bị treo liên tục.
        debugProtection: true,
        debugProtectionInterval: 2000,

        disableConsoleOutput: true,
        identifierNamesGenerator: "hexadecimal", // Biến đổi tên biến thành hệ thập lục phân (VD: _0x1a2b)
        log: false,
        numbersToExpressions: true,
        renameGlobals: false,
        selfDefending: true, // Tự bảo vệ, nếu họ cố gắng định dạng lại (Beautify) code, code sẽ bị lỗi không chạy
        simplify: true,
        stringArray: true, // Mã hóa toàn bộ các chuỗi text (như thông báo SweetAlert2 của bạn)
        stringArrayEncoding: ["base64"],
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
      },
    }),
  ],
});
