import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/navbar";
import Giohang from "../Components/giohang";
import axios from "axios";

function XemChiTiet() {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const location = useLocation();
    const { diadanh, userId: userIdFromState, token: tokenFromState } = location.state || {};

    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const userFromStorage = localStorage.getItem("currentUser");
        if (userFromStorage) {
            try {
                setCurrentUser(JSON.parse(userFromStorage));
            } catch (error) {
                console.error("Dữ liệu người dùng không hợp lệ trong localStorage:", error);
            }
        }
    }, []);

    // Kiểm tra nếu không có thông tin địa danh
    if (!diadanh) {
        return <p>Không tìm thấy thông tin địa danh!</p>;
    }

    // Lấy userId và token từ state hoặc localStorage
    const validUserId = userIdFromState || currentUser?.id;
    const validToken = tokenFromState || currentUser?.token;

    // Hàm xử lý khi thêm vào giỏ hàng
    const addToCartHandler = async () => {
        if (!validUserId) {
            console.error("Không tìm thấy userId! Hãy đăng nhập để thêm sản phẩm vào giỏ hàng.");
            return;
        }

        try {
            const requestData = {
                diadanh_id: diadanh?._id,
                quantity: 1,
                diadanhName: diadanh?.tendd,
            };

            const response = await axios.post(
                `http://localhost:5000/cart/${validUserId}`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${validToken}`, // Truyền token nếu cần
                    },
                }
            );

            setIsAddedToCart(true);
            console.log("Thêm vào giỏ hàng thành công:", response.data);
        } catch (error) {
            console.error(
                "Lỗi khi thêm vào giỏ hàng:",
                error.response?.data?.message || error.message
            );
            alert("Đã xảy ra lỗi khi thêm vào giỏ hàng. Vui lòng thử lại!");
        }
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    return (
        <>
            <Navbar />
            <div style={{ padding: "20px" }}>
                <img
                    src={diadanh.hinhanh || "https://via.placeholder.com/400"}
                    alt={`Địa danh ${diadanh.tendd}`}
                    style={{ maxWidth: "400px", borderRadius: "10px", marginTop: "20px" }}
                />
                <h1>Chi tiết địa danh: {diadanh.tendd}</h1>
                <p>
                    <strong>Địa chỉ:</strong> {diadanh.diachi}
                </p>
                <p>
                    <strong>Giá:</strong> {diadanh.giatien} VND
                </p>
                <p>
                    <strong>Mô tả:</strong> {diadanh.mota}
                </p>

                <button
                    onClick={addToCartHandler}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: isAddedToCart ? "#6c757d" : "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: isAddedToCart ? "not-allowed" : "pointer",
                        marginTop: "20px",
                    }}
                    disabled={isAddedToCart}
                >
                    {isAddedToCart ? "Đã thêm vào giỏ hàng" : "Đặt vào giỏ hàng"}
                </button>

                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={toggleCartVisibility}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: isCartVisible ? "#dc3545" : "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {isCartVisible ? "Ẩn giỏ hàng" : "Xem giỏ hàng"}
                    </button>

                    {isCartVisible && <Giohang userId={validUserId} />}
                </div>
            </div>
        </>
    );
}

export default XemChiTiet;