import React, { useState } from "react";
import styles from '../Css/timkiem.module.css';

function Timkiem() {
  const [formData, setFormData] = useState({
    from: "TP HCM (SGN)",
    to: "Hà Nội (HAN)",
    departureDate: "",
    passengers: 1,
    class: "economy"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="from">Từ</label>
            <input
              type="text"
              id="from"
              name="from"
              value={formData.from}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="to">Đến</label>
            <input
              type="text"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="departureDate">Ngày đi</label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="passengers">Hành khách</label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="class">Hạng vé</label>
            <select
              id="class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
            >
              <option value="economy">Phổ thông</option>
              <option value="business">Thương gia</option>
              <option value="first">Hạng nhất</option>
            </select>
          </div>
          <button type="submit" className={styles.searchButton}>Tìm kiếm</button>
        </div>
      </form>
    </div>
  );
}

export default Timkiem;