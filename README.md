# Shopee Affiliate Bio Link 🔗

Một giải pháp đơn giản, chuyên nghiệp để tổng hợp và quản lý các link tiếp thị liên kết (Affiliate) Shopee, tối ưu hoàn toàn cho Bio của TikTok và Instagram.

## 🎯 Chức năng chính

Dự án này tập trung vào sự đơn giản và hiệu quả:
- **Trang Bio Link**: Hiển thị danh sách sản phẩm trực quan với hình ảnh, giá tiền và mã sản phẩm.
- **Điều hướng nhanh**: Click trực tiếp vào sản phẩm sẽ tự động mở trang Shopee tương ứng.
- **Trang Quản Trị (Admin)**: Quản lý (thêm/xóa) link sản phẩm dễ dàng thông qua bảng điều khiển bảo mật.

## ✨ Điểm nổi bật

- **⚡ Siêu nhanh**: Khởi tạo bằng Vite + React cho tốc độ tải trang gần như tức thì.
- **📱 Giao diện Mobile-First**: Được thiết kế để hiển thị hoàn hảo trên các trình duyệt mobile tích hợp của TikTok/Instagram.
- **🛡️ Quản lý tập trung**: Không cần sửa đổi mã nguồn (code) mỗi khi muốn thêm link mới, mọi thứ đều được quản lý qua Admin Dashboard.
- **☁️ Dữ liệu Cloud**: Sử dụng Firebase Firestore để lưu trữ link sản phẩm mọi lúc mọi nơi.
- **🛠️ Cơ chế Fallback**: Luôn có dữ liệu dự phòng để đảm bảo Bio của bạn không bao giờ bị lỗi hiển thị.

## 🛠 Hướng dẫn sử dụng

### 1. Cho người dùng (Trang chủ)
Chỉ cần truy cập trang chủ để xem danh sách các deal hot nhất. Mỗi sản phẩm kèm theo mã (`Code`) giúp bạn dễ dàng tìm kiếm hoặc đối chiếu.

### 2. Cho người quản lý (Admin)
- **Truy cập**: Thêm `/admin` vào sau địa chỉ web của bạn.
- **Mật khẩu**: `123` (Có thể thay đổi trong cấu hình).
- **Tính năng**: 
  - Thêm sản phẩm: Nhập tên, mã, giá, link ảnh và link Shopee.
  - Xóa sản phẩm: Gỡ bỏ các link đã hết hạn hoặc không còn kinh doanh.

## 🚀 Cài đặt nhanh

1. `npm install`
2. `npm run dev` (Local: http://localhost:5173)

---
*Giải pháp giúp bạn tối ưu hóa thu nhập từ tiếp thị liên kết một cách chuyên nghiệp nhất.*
