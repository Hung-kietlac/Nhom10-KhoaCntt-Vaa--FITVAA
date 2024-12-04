import React, { useState } from "react";
import styles from "../Css/admin.module.css";

function Admin() {
  const [activeSection, setActiveSection] = useState("customer-management");

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <h2>AirPass</h2>
        <div className={styles["menu-item"]} onClick={() => showSection("customer-management")}>
          Quản lý Khách Hàng
        </div>
        <div className={styles["menu-item"]} onClick={() => showSection("tour-management")}>
          Quản lý Tour
        </div>
        <div className={styles["menu-item"]} onClick={() => showSection("airlinetickets-management")}>
          Quản lý Vé Máy Bay
        </div>
        <div className={styles["menu-item"]} onClick={() => showSection("statistics-report")}>
          Báo Cáo Thống Kê
        </div>
      </div>

      {/* Main Content Area */}
      <div className={styles["content-area"]}>
        {/* Header */}
        <div className={styles.header}>Xin chào: admin</div>

        {/* Sections */}
        {activeSection === "customer-management" && <CustomerManagement />}
        {activeSection === "tour-management" && <TourManagement />}
        {activeSection === "airlinetickets-management" && <AirlineTicketsManagement />}
        {activeSection === "statistics-report" && <StatisticsReport showSection={showSection} />}
      </div>
    </div>
  );
}

const CustomerManagement = () => (
  <div id="customer-management" className={styles["main-content"]}>
    <h1>Quản lý Khách Hàng</h1>
    {/* Form */}
    <div className={styles["form-group"]}>
      <label>Tên Khách Hàng</label>
      <input type="text" placeholder="Nhập tên khách hàng" />
    </div>
    <div className={styles["form-group"]}>
      <label>Số điện thoại</label>
      <input type="number" placeholder="Nhập số điện thoại" />
    </div>
    <div className={styles["form-group"]}>
      <label>Giới tính</label>
      <select>
        <option value="male">Nam</option>
        <option value="female">Nữ</option>
      </select>
    </div>
    <div className={styles["form-group"]}>
      <label>Email</label>
      <input type="text" placeholder="Nhập email" />
    </div>
    <div className={styles["form-group"]}>
      <label>Địa chỉ</label>
      <input type="text" placeholder="Nhập địa chỉ" />
    </div>
    <div className={styles["button-group"]}>
      <button className={styles["add-btn"]}>Thêm mới</button>
      <button className={styles["update-btn"]}>Cập nhật</button>
      <button className={styles["delete-btn"]}>Xóa</button>
    </div>
    {/* Table */}
    <table>
      <thead>
        <tr>
          <th>Tên Khách Hàng</th>
          <th>Số điện thoại</th>
          <th>Giới tính</th>
          <th>Email</th>
          <th>Địa chỉ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Nguyễn Văn A</td>
          <td>0912345678</td>
          <td>Nam</td>
          <td>nguyenvana@gmail.com</td>
          <td>123 Cộng Hòa, Tân Bình</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const TourManagement = () => (
  <div id="tour-management" className={styles["main-content"]}>
    <h2>QUẢN LÝ TOUR</h2>
    {/* Form */}
    <div className={styles["form-group"]}>
      <label>Tên Tour</label>
      <input type="text" placeholder="Nhập tên tour" />
    </div>
    {/* Table */}
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên Tour</th>
          <th>Thời Gian</th>
          <th>Địa Điểm</th>
          <th>Giá Tiền</th>
          <th>Phương tiện</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>TOUR Phú Quốc</td>
          <td>3 ngày 2 đêm</td>
          <td>Phú Quốc - Thiên đường giải trí</td>
          <td>8,079,000</td>
          <td>Vietnam Airlines</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const AirlineTicketsManagement = () => (
  <div id="airlinetickets-management" className={styles["main-content"]}>
    <h2>QUẢN LÝ VÉ MÁY BAY</h2>
    <div className={styles["form-group"]}>
      <label>Chuyến Bay</label>
      <input type="text" placeholder="Nhập chuyến bay" />
    </div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Chuyến bay</th>
          <th>Nơi đi</th>
          <th>Nơi đến</th>
          <th>Số lượng khách hàng</th>
          <th>Giá vé</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>PQ201</td>
          <td>TP. Hồ Chí Minh</td>
          <td>Hà Nội</td>
          <td>2</td>
          <td>3,500,000</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const StatisticsReport = ({ showSection }) => (
  <div id="statistics-report" className={styles["main-content"]}>
    <h2>BÁO CÁO THỐNG KÊ</h2>
    <div className={styles["report-button-group"]}>
      <div className={styles["report-button"]} onClick={() => showSection("customer-management")}>
        Số lượng Khách Hàng
        <div className={styles["report-number"]}>1</div>
      </div>
      <div className={styles["report-button"]} onClick={() => showSection("tour-management")}>
        Số lượng Tour
        <div className={styles["report-number"]}>2</div>
      </div>
      <div className={styles["report-button"]} onClick={() => showSection("airlinetickets-management")}>
        Số lượng Vé Máy Bay
        <div className={styles["report-number"]}>3</div>
      </div>
    </div>
  </div>
);

export default Admin;