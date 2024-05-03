export enum ECode {
  SUCCESS = 200,
  FAIL = 404,
  BAD_REQUEST = 400,
  NOT_FIND_USER = 2000,
  MONGO_SERVER_ERROR = 500,
  NOT_FOUND = 2001
}

export enum EMessage {
  // Error:
  NOT_FIND_USER = 'Không tìm thấy user',
  NOT_FOUND_PRODUCT = 'Không tìm thấy sản phẩm',
  NOT_FOUND_CATEGORY = 'Không tìm thấy danh mục',
  NOT_FOUND_BRAND = 'Không tìm thấy thương hiệu',
  NO_FILE_CHOOSE = 'Không có file được chọn',
  NOT_FOUND_ORDER = 'Không tìm thấy đơn hàng',
  PASSWORD_ERROR = 'Mật khẩu không chính xác',
  OTP_SUCCESS = 'Lấy mã OTP thành công',
  MONGO_SERVER_ERROR = 'Lỗi cơ sở dữ liệu',
  EMAIL_EXIST = 'Email đã tồn tại, vui lòng chọn email khác',
  PHONE_EXIST = 'Số điện thoại đã tồn tại, vui lòng chọn số điện thoại khác',
  BAD_REQUEST = 'Yêu cầu không hợp lệ',
  LIKE_PRODUCT_FAIL = 'Yêu thích sản phẩm thất bại',

  //Success:
  FIND_USER_SUCCESS = 'Đã tìm thấy user',
  CREATE_USER_SUCCESS = 'Tạo user thành công',
  UPDATE_USER_SUCCESS = 'Cập nhật user thành công',
  UPDATE_STATUS_ORDER_SUCCESSFULLY = 'Cập nhật trạng thái đơn hàng thành công',
  LIKE_PRODUCT_SUCCESS = 'Yêu thích sản phẩm thành công',
  UNLIKE_PRODUCT_SUCCESS = 'Bỏ yêu thích sản phẩm thành công',
  CREATE_PRODUCT_SUCCESS = 'Tạo sản phẩm thành công',
  CREATE_PAYMENT_SUCCESS = 'Thanh toán thành công',
  GET_PRODUCT_SUCCESS = 'Lấy sản phẩm thành công',
  ADD_TO_CART_SUCCESSFULLY = 'Thêm vào giỏ hàng thành công',
  CONFIRM_ORDER_SUCCESSFULLY = 'Xác nhận đơn hàng thành công',
  PAYMENT_SUCCESS = 'Thanh toán thành công',
  CREATE_DISCOUNT_SUCCESS = 'Tạo mã giảm giá thành công',
}
