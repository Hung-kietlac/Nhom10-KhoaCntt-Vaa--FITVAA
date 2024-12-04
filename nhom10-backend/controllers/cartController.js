const addToCart = async (req, res) => {
    const { diadanh_id, quantity } = req.body;
    const userId = req.params.userId;  // Lấy userId từ URL parameters

    // Debug thông tin nhận được từ client
    console.log("Received request with userId:", userId);
    console.log("Received diadanh_id:", diadanh_id);
    console.log("Received quantity:", quantity);

    if (!userId) {
        return res.status(400).json({ success: false, message: "Thiếu thông tin người dùng" });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.diadanh_id === diadanh_id);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity; // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
            } else {
                cart.items.push({ diadanh_id, quantity }); // Thêm sản phẩm mới vào giỏ
            }
        } else {
            cart = new Cart({
                userId,
                items: [{ diadanh_id, quantity }],
            });
        }

        await cart.save();
        res.json({ success: true, cart });
    } catch (error) {
        console.error("Error while adding to cart:", error); // Log lỗi chi tiết để debug
        res.status(500).json({ success: false, message: "Lỗi khi thêm vào giỏ hàng" });
    }
};

const getCartHandler = () => {
    if (!userId) {
        console.error("Không tìm thấy userId! Hãy chắc chắn rằng nó được truyền qua state.");
        return;
    }

    axios.get(`http://localhost:5000/api/cart/${userId}`)
        .then(response => {
            console.log("Giỏ hàng:", response.data);
        })
        .catch(error => {
            console.error("Lỗi khi lấy giỏ hàng:", error.response?.data || error.message);
        });
};

module.exports = {
    addToCart, getCartHandler
};