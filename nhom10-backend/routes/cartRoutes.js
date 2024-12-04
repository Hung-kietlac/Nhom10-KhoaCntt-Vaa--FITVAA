const express = require('express');
const router = express.Router();
const Cart = require('../models/cart'); // Giả sử bạn đã có model Cart
const DiaDanh = require('../models/diadanh'); // Model DiaDanh để kiểm tra id địa danh

// Route để POST giỏ hàng theo userId
router.post("/cart/:userId", async (req, res) => {
    const { userId } = req.params;
    const { diadanh_id, diadanhName, quantity } = req.body;

    console.log("Dữ liệu nhận được:", { userId, diadanh_id, diadanhName, quantity });

    // Kiểm tra dữ liệu đầu vào
    if (!diadanh_id || !diadanhName || !quantity) {
        console.error("Thiếu thông tin cần thiết");
        return res.status(400).json({ message: "Thiếu thông tin để thêm vào giỏ hàng!" });
    }

    try {
        // Kiểm tra nếu địa danh có tồn tại trong MongoDB
        const diaDanhExists = await DiaDanh.findById(diadanh_id);
        if (!diaDanhExists) {
            return res.status(404).json({ message: "Địa danh không tồn tại!" });
        }

        // Tìm giỏ hàng của người dùng theo userId
        let cart = await Cart.findOne({ userId });
        console.log("Giỏ hàng hiện tại:", cart);

        if (!cart) {
            // Nếu không tồn tại giỏ hàng, tạo mới
            cart = new Cart({
                userId,
                items: [{ diadanh_id, diadanhName, quantity }]
            });
            console.log("Tạo giỏ hàng mới:", cart);
        } else {
            // Nếu đã có giỏ hàng, kiểm tra sản phẩm
            const itemIndex = cart.items.findIndex(item => item.diadanh_id.toString() === diadanh_id);
            console.log("Index sản phẩm trong giỏ hàng:", itemIndex);

            if (itemIndex > -1) {
                // Nếu sản phẩm đã tồn tại, cập nhật số lượng
                cart.items[itemIndex].quantity += quantity;
                console.log("Cập nhật số lượng sản phẩm:", cart.items[itemIndex]);
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
                cart.items.push({ diadanh_id, diadanhName, quantity });
                console.log("Thêm sản phẩm mới vào giỏ hàng:", cart.items);
            }
        }

        // Lưu giỏ hàng vào MongoDB
        await cart.save();
        console.log("Giỏ hàng sau khi lưu:", cart);

        res.status(200).json({ message: "Thêm vào giỏ hàng thành công!", cart });
    } catch (err) {
        console.error("Lỗi khi thêm giỏ hàng:", err.message);
        res.status(500).json({ message: "Đã xảy ra lỗi khi thêm vào giỏ hàng!", error: err.message });
    }
});

// Route để GET giỏ hàng theo userId
router.get("/cart/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Lấy giỏ hàng của người dùng và populate để hiển thị chi tiết địa danh
        const cart = await Cart.findOne({ userId }).populate('items.diadanh_id');
        if (!cart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
        }

        res.status(200).json(cart);
    } catch (err) {
        console.error("Lỗi khi lấy giỏ hàng:", err.message);
        res.status(500).json({ message: "Lỗi khi lấy giỏ hàng", error: err.message });
    }
});

module.exports = router;