const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    diadanh_id: { type: mongoose.Schema.Types.ObjectId, ref: "DiaDanh", required: true },
    diadanhName: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;