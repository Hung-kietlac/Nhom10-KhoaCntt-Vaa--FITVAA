import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Navbar from '../Components/navbar';
import axios from 'axios';
import styles from '../Css/trangchu.module.css';

function Trangchu() {
    const [diadanhs, setDiadanhs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token từ localStorage:", token); // Kiểm tra token trong localStorage
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded._id); // Lấy ObjectId từ token
                console.log("Decoded token:", decoded); // In ra thông tin giải mã được
            } catch (error) {
                console.error("Token không hợp lệ:", error);
            }
        } else {
            console.log("Token không hợp lệ hoặc không có");
        }
    }, []);

    // Lấy danh sách địa danh
    useEffect(() => {
        const fetchDiadanhs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/diadanhs');
                setDiadanhs(response.data);
                setLoading(false);
            } catch (err) {
                setError('Không thể tải dữ liệu địa danh. Vui lòng thử lại sau!');
                setLoading(false);
            }
        };

        fetchDiadanhs();
    }, []);

    // Thay đổi hình ảnh tự động mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                diadanhs.length > 0 ? (prevIndex + 1) % diadanhs.length : 0
            );
        }, 5000);

        return () => clearInterval(interval); // Dọn dẹp khi component unmount
    }, [diadanhs]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className={styles.loadingText}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <p className={styles.error}>{error}</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Navbar />
            {diadanhs.length > 0 && (
                <div className={styles.carousel}>
                    <img
                        src={diadanhs[currentIndex]?.hinhanh || 'https://via.placeholder.com/800x400'}
                        alt={`Địa danh ${diadanhs[currentIndex]?.tendd}`}
                        className={styles.carouselImage}
                    />
                    <h2 className={styles.carouselTitle}>
                        {diadanhs[currentIndex]?.tendd || 'Tên địa danh'}
                    </h2>
                </div>
            )}

            <div className={styles.tourContainer}>
                <h1 className={styles.heading}>Danh sách Địa Danh</h1>
                <div className={styles.tourList}>
                    {diadanhs.map((diadanh) => (
                        <div key={diadanh._id} className={styles.tourItem}>
                            <div className={styles.tourBox}>
                                <div className={styles.imageContainer}>
                                    <img
                                        src={diadanh.hinhanh || 'https://via.placeholder.com/150'}
                                        alt={`Địa danh ${diadanh.tendd}`}
                                        className={styles.tourImage}
                                    />
                                </div>
                                <h2 className={styles.tourTitle}>{diadanh.tendd}</h2>
                                <p><strong>Địa chỉ:</strong> {diadanh.diachi}</p>
                                <p><strong>Giá:</strong> {diadanh.giatien || 'Chưa có giá'} VND</p>
                                <Link
                                    to={`/xemchitiet/${diadanh._id}`}
                                    state={{
                                        diadanh,
                                        userId,
                                        token: localStorage.getItem('token') // Lấy token từ localStorage
                                    }}
                                    className={styles.bookButton}
                                >
                                    Xem Chi Tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Trangchu;