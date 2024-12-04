const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('./auth/auth');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const order = require('./routes/order');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cartRoutes = require('./routes/cartRoutes');
const Diadanh = require('./models/diadanh');
const login = require('./routes/loginRoutes');
const User = require('./models/User');
const Cart = require("./models/cart");

const app = express();

// Cấu hình view (nếu sử dụng view, nhưng API hiện không cần)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.set('strictQuery', false); // Chuẩn bị cho Mongoose 7 (hoặc bạn có thể chọn `true` nếu muốn giữ hành vi cũ)

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/UD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Cấu hình session
app.use(session({
  secret: 'Hung12345',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/login', login);
app.use('/cart', cartRoutes);
app.use('/order', order);

// Route chuyển hướng người dùng đến Google OAuth
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']  // Các quyền truy cập cần thiết
}));

// Route callback khi Google gửi kết quả xác thực
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),  // Đảm bảo chuyển hướng nếu thất bại
  (req, res) => {
      res.redirect('http://localhost:3000/Trangchu');  // Sau khi đăng nhập thành công, chuyển hướng đến trang chủ
  }
);

app.post('/Dangky', async (req, res) => {
  console.log("Đã nhận được yêu cầu đăng ký:", req.body);
  const { customerName, phone, gender, password, dateOfBirth } = req.body;

  try {
    // Kiểm tra nếu người dùng đã tồn tại
    console.log(`Kiểm tra người dùng với số điện thoại: ${phone}`);
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      console.log(`Số điện thoại ${phone} đã được sử dụng.`);
      return res.status(400).json({ message: 'Số điện thoại đã được sử dụng!' });
    }
    console.log(`Số điện thoại ${phone} chưa được sử dụng.`);

    // Tạo người dùng mới
    console.log("Tạo người dùng mới với thông tin:", { customerName, phone, gender, password, dateOfBirth });
    const newUser = new User({
      customerName,
      phone,
      gender,
      password,
      dateOfBirth,
    });

    // Lưu người dùng vào MongoDB
    console.log("Đang lưu người dùng vào cơ sở dữ liệu...");
    await newUser.save(); // Lưu vào MongoDB

    console.log("Đăng ký thành công! Người dùng đã được lưu.");
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    console.error('Lỗi khi đăng ký người dùng:', error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi đăng ký.' });
  }
});

// Route xử lý yêu cầu thêm vào giỏ hàng
app.post("/cart/:userId", (req, res) => {
  const { diadanh_id, quantity, diadanhName } = req.body;
  const { userId } = req.params;

  if (!diadanh_id || !diadanhName || !userId) {
      return res.status(400).json({ error: "Thiếu thông tin trong yêu cầu!" });
  }

  // Xử lý lưu giỏ hàng
  res.status(200).json({ message: "Thêm vào giỏ hàng thành công!" });
});

app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
      // Tìm giỏ hàng của user
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ message: "Không tìm thấy giỏ hàng!" });
      }

      res.status(200).json(cart);
  } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);
      res.status(500).json({ message: "Lỗi server!" });
  }
});

app.get('/api/diadanhs', async (req, res) => {
  try {
    // Lấy tất cả các địa danh từ collection Diadanh
    const diadanhs = await Diadanh.find(); // Chỉ lấy các trường cần thiết

    // Kiểm tra nếu không có dữ liệu địa danh
    if (diadanhs.length === 0) {
      return res.status(404).json({ message: "Không có dữ liệu địa danh" });
    }

    // Trả về tất cả dữ liệu địa danh với các trường tên, mô tả, giá tiền và hình ảnh
    res.json(diadanhs);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu địa danh:', error);
    res.status(500).json({ error: 'Có lỗi xảy ra khi lấy dữ liệu địa danh' });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send('Token không hợp lệ');
    req.user = user;
    next();
  });
};

// Middleware xử lý lỗi
app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Không tìm thấy tài nguyên yêu cầu.',
  });
});

// Xử lý lỗi server
app.use(function (err, req, res, next) {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Có lỗi xảy ra.',
      status: err.status || 500,
    },
  });
});

// Khởi động server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});