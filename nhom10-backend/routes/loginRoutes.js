const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Đảm bảo đúng đường dẫn tới model User

// Đăng nhập
router.post("/Dangnhap", async (req, res) => {
    const { phone, password } = req.body;
  
    try {
      // Tìm người dùng theo số điện thoại
      const user = await User.findOne({ phone });
      if (!user) {
        return res.status(400).json({ success: false, message: "Người dùng không tồn tại" });
      }
  
      // So sánh mật khẩu trực tiếp (không sử dụng bcrypt)
      if (password !== user.password) {
        return res.status(400).json({ success: false, message: "Mật khẩu không đúng" });
      }

      const token = jwt.sign({ _id: user._id }, "secret_key");
  
      // Đăng nhập thành công
      res.json({ success: true, message: "Đăng nhập thành công", token: token, userId: user._id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại" });
    }
  });

module.exports = router;