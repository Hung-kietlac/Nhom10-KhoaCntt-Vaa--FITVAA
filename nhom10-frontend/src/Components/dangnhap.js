import React, { useState, useContext } from "react";
import styles from "../Css/dangnhap.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../Context/FormContext";
import maybayImage from '../image/maybay.jpg';
import googleLogo from '../image/gmail.jpg';
import facebookLogo from '../image/facebook.jpg';
import axios from 'axios';

function Dangnhap() {
  const { formData, setFormData } = useContext(FormContext);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Phone:", formData.Phone);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // Gửi thông tin đăng nhập đến API backend với axios
    axios.post("http://localhost:5000/login/Dangnhap", {
      phone: formData.Phone,
      password: password,
    })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          localStorage.setItem('token', data.token);  // Lưu token vào localStorage
          // Nếu đăng nhập thành công, chuyển hướng đến trang chủ
          navigate("/Trangchu");
        } else {
          alert(data.message || "Thông tin đăng nhập không chính xác");
        }
      })
      .catch((error) => {
        console.error("Error:", error);  // Xử lý lỗi nếu có
      });
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className={styles.loginbody}>
      <div className={styles.loginContainer}>
        <img src={maybayImage} alt="Airplane" className={styles.image} />
        <h2 className={styles.title}>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.Phone}
            onChange={(e) => setFormData({ ...formData, Phone: e.target.value })}
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <div className={styles.rememberMeContainer}>
            <input
              type="checkbox"
              id="remember_me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className={styles.checkbox}
            />
            <label htmlFor="remember_me" className={styles.rememberMeLabel}>
              Nhớ mật khẩu
            </label>
          </div>
          <button type="submit" className={styles.loginButton}>Đăng nhập</button>
        </form>
        <p className={styles.registerPrompt}>
          Bạn chưa có tài khoản? <Link to="/DangKy">Đăng ký ngay</Link>
        </p>
        <p className={styles.forgotPassword}>
          <Link to="/QuenMatKhau">Quên mật khẩu</Link>
        </p>
        <div className={styles.socialLogin}>
          <button
            className={`${styles.socialButton} ${styles.googleButton}`}
            onClick={handleGoogleLogin}
          >
            <img src={googleLogo} alt="Google Logo" className={styles.socialIcon} /> Đăng nhập với Google
          </button>
          <button className={`${styles.socialButton} ${styles.facebookButton}`}>
            <img src={facebookLogo} alt="Facebook Logo" className={styles.socialIcon} /> Đăng nhập với Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dangnhap;