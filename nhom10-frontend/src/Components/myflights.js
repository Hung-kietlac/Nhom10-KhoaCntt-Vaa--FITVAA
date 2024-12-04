import React, { useState } from 'react';
import Navbar from '../Components/navbar';
import styles from '../Css/myflights.module.css';

function MyFlights() {
    const [flightData, setFlightData] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        flightCode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/flights`)
            .then(response => response.json())
            .then(data => setFlightData(data))
            .catch(err => console.error('Lỗi khi lấy thông tin chuyến bay:', err));
    };

    return (
        <div>
            <Navbar />
            <div className={styles.flightContainer}>
                <h2>Thông tin chuyến bay của tôi</h2>
                <form onSubmit={handleSubmit} className={styles.flightForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="flightCode">Mã chuyến bay</label>
                        <input
                            type="text"
                            id="flightCode"
                            name="flightCode"
                            value={formData.flightCode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.searchButton}>Tìm kiếm</button>
                </form>
                {flightData && (
                    <div className={styles.flightDetails}>
                        <h3>Thông tin đặt vé</h3>
                        <p><strong>Mã đặt chỗ:</strong> {flightData.bookingCode}</p>
                        <p><strong>Loại vé:</strong> {flightData.ticketType}</p>
                        <p><strong>Hành khách:</strong> {flightData.passengerName}</p>
                        <p><strong>Chuyến đi:</strong> {flightData.departure} - {flightData.arrival}</p>
                        <p><strong>Khoang:</strong> {flightData.cabinClass}; <strong>Ghế:</strong> {flightData.seatNumber}</p>
                        <p><strong>Khởi hành lúc:</strong> {flightData.departureTime}</p>
                        <p><strong>Hạ cánh lúc:</strong> {flightData.arrivalTime}</p>
                        <p><strong>Giá vé:</strong> {flightData.price} VND</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyFlights;