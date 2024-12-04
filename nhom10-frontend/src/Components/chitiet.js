import React from 'react';
import Navbar from '../Components/navbar';
import styles from '../Css/chitiet.module.css';

function Chitiet({ searchData }) {
    // Kiểm tra nếu `searchData` không tồn tại
    if (!searchData) {
        return (
            <div>
                <Navbar />
                <div className={styles.detailContainer}>
                    <h2>Không có thông tin tìm kiếm</h2>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className={styles.detailContainer}>
                <h2>Thông tin chi tiết</h2>
                <div className={styles.searchInfo}>
                    <p><strong>Từ:</strong> {searchData.from || 'Không có thông tin'}</p>
                    <p><strong>Đến:</strong> {searchData.to || 'Không có thông tin'}</p>
                    <p><strong>Ngày đi:</strong> {searchData.departureDate || 'Không có thông tin'}</p>
                    <p><strong>Hành khách:</strong> {searchData.passengers || 'Không có thông tin'}</p>
                    <p><strong>Hạng vé:</strong> {searchData.class || 'Không có thông tin'}</p>
                </div>
                <div className={styles.resultList}>
                    <h3>Kết quả tìm kiếm</h3>
                    {searchData.results && searchData.results.length > 0 ? (
                        searchData.results.map((result, index) => (
                            <div key={index} className={styles.resultItem}>
                                <p><strong>Địa danh:</strong> {result.destination || 'Không có thông tin'}</p>
                                <p><strong>Mô tả:</strong> {result.description || 'Không có thông tin'}</p>
                                <p><strong>Giá tiền:</strong> {result.price ? `${result.price} VND` : 'Không có thông tin'}</p>
                                {result.image ? (
                                    <img src={result.image} alt={`Tour ${result.id}`} />
                                ) : (
                                    <p>Không có hình ảnh</p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Không có kết quả tìm kiếm</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Chitiet;