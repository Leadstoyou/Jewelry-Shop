const HttpStatusCode = {
  OK: 200, // Thành công
  CREATED: 201, // Đã tạo thành công (thường dùng cho POST)
  NO_CONTENT: 204, // khong co du lieu tra ve
  BAD_REQUEST: 400, // Yêu cầu không hợp lệ
  UNAUTHORIZED: 401, // Không xác thực
  FORBIDDEN: 403, // Bị từ chối truy cập
  NOT_FOUND: 404, // Không tìm thấy tài nguyên
  INTERNAL_SERVER_ERROR: 500, // Lỗi máy chủ nội bộ
  SERVICE_UNAVAILABLE: 503, // Dịch vụ không khả dụng
  GATEWAY_TIMEOUT: 504, // Lỗi thời gian chờ cổng
};

export default HttpStatusCode;
