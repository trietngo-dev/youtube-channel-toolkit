const { execSync } = require("child_process");

console.log(
  "🔄 Đang kiểm tra và đóng các tiến trình cũ để tránh bị khóa file (Unlocking)...",
);

if (process.platform === "win32") {
  try {
    execSync('taskkill /F /FI "IMAGENAME eq Gemstone*" 2>nul', {
      stdio: "ignore",
    });
  } catch {}
  try {
    execSync('taskkill /F /FI "IMAGENAME eq electron.exe*" 2>nul', {
      stdio: "ignore",
    });
  } catch {}
}

console.log("✅ Đã dọn sạch tiến trình cũ! Bắt đầu build mới an toàn.");
