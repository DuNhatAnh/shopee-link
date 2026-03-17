# TikTok-Style Shopee Affiliate Web App 🚀

Một ứng dụng web di động hiện đại, mô phỏng trải nghiệm người dùng của TikTok để tối ưu hóa tỷ lệ chuyển đổi cho các chiến dịch Shopee Affiliate.

## 🎯 Bài toán giải quyết

Trong thị trường Affiliate hiện nay, người dùng thường cảm thấy nhàm chán với các danh sách sản phẩm tĩnh truyền thống. Dự án này giải quyết các vấn đề sau:
- **Tăng tính tương tác**: Thay thế việc lướt danh sách bằng trải nghiệm vuốt (swipe) gây nghiện như TikTok.
- **Tập trung tối đa**: Mỗi lần chỉ hiển thị duy nhất 1 sản phẩm toàn màn hình, giúp loại bỏ sự xao nhãng.
- **Tối ưu di động**: Giao diện được thiết kế mobile-first 100%, phù hợp với hành vi mua sắm trên điện thoại của người dùng hiện nay.
- **Rút ngắn phễu mua hàng**: Nút "Mua ngay" nổi bật giúp chuyển đổi trực tiếp sang Shopee chỉ với một chạm.

## ✨ Điểm nổi bật (Core Features)

- **🎬 Trải nghiệm Fullscreen (100vh)**: Tối ưu hóa không gian hiển thị hình ảnh/video sản phẩm chất lượng cao.
- **🔄 Infinite Scroll (Snap Scrolling)**: Hiệu ứng cuộn dọc mượt mà, tự động căn chỉnh vị trí như ứng dụng TikTok thực thụ.
- **💎 Thiết kế Glassmorphism**: Giao diện Overlay hiện đại với hiệu ứng kính mờ, tạo cảm giác cao cấp và chuyên nghiệp.
- **🔥 Shopee Branding**: Sử dụng tone màu cam chủ đạo (`#ee4d2d`) giúp tạo sự tin tưởng và nhất quán với thương hiệu Shopee.
- **☁️ Firebase Integration**: Kết nối thời gian thực với Firestore để quản lý danh sách sản phẩm linh hoạt.
- **🛡️ Cơ chế Fallback thông minh**: Tự động hiển thị dữ liệu mẫu nếu kết nối Firebase gặp sự cố, đảm bảo website không bao giờ bị "trống".
- **⚡ Tối ưu hiệu năng**: Sử dụng Vite + React giúp tốc độ tải trang cực nhanh và mượt mà.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Vanilla CSS, Framer Motion (Animations), Lucide React (Icons)
- **Backend**: Firebase (Firestore)
- **Hosting**: Vercel

## 🚀 Hướng dẫn nhanh

1. **Cài đặt**: `npm install`
2. **Chạy local**: `npm run dev`
3. **Cấu hình**: Cập nhật thông số Firebase trong `src/firebase.js`.

---
*Dự án hướng tới việc mang lại trải nghiệm mua sắm giải trí cho người dùng cuối và lợi nhuận tối ưu cho người làm Affiliate.*
