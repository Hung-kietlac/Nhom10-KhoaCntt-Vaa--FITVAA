import React, { useEffect, useState } from "react";
import axios from "axios";

const Giohang = ({ userId }) => {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cart/${userId}`);
                console.log("Giỏ hàng:", response.data); // Kiểm tra dữ liệu nhận được từ API
                setCart(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                setError(error.response?.data?.message || "Lỗi khi lấy giỏ hàng!");
            }
        };

        fetchCart();
    }, [userId]);

    // Trường hợp chưa đăng nhập
    if (!userId) return <p>Vui lòng đăng nhập để xem giỏ hàng</p>;

    // Trường hợp có lỗi
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    // Trường hợp giỏ hàng chưa tải xong
    if (!cart) return <p>Đang tải giỏ hàng...</p>;

    // Tính tổng giá trị giỏ hàng
    const totalPrice = cart.items.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
    );

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Giỏ Hàng</h2>
            {cart.items.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>
                    Giỏ hàng của bạn đang trống.
                </p>
            ) : (
                <table
                    border="1"
                    style={{
                        width: "100%",
                        textAlign: "left",
                        borderCollapse: "collapse",
                        marginBottom: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ padding: "10px" }}>Số thứ tự</th>
                            <th style={{ padding: "10px" }}>Địa danh</th>
                            <th style={{ padding: "10px" }}>Giá tiền (VND)</th>
                            <th style={{ padding: "10px" }}>Số lượng</th>
                            <th style={{ padding: "10px" }}>Tổng giá (VND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => (
                            <tr key={item.diadanh_id || index}>
                                <td style={{ padding: "10px", textAlign: "center" }}>
                                    {index + 1}
                                </td>
                                <td style={{ padding: "10px" }}>{item.diadanhName || "Không rõ"}</td>
                                <td style={{ padding: "10px", textAlign: "right" }}>
                                    {(item.price || 0).toLocaleString()}
                                </td>
                                <td style={{ padding: "10px", textAlign: "center" }}>
                                    {item.quantity || 1}
                                </td>
                                <td style={{ padding: "10px", textAlign: "right" }}>
                                    {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td
                                colSpan="4"
                                style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    padding: "10px",
                                }}
                            >
                                Tổng cộng:
                            </td>
                            <td
                                style={{
                                    fontWeight: "bold",
                                    padding: "10px",
                                    textAlign: "right",
                                }}
                            >
                                {totalPrice.toLocaleString()} VND
                            </td>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default Giohang;