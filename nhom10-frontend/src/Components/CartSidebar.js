import React from 'react';
import { useCart } from '../Context/CartContext';

const CartSidebar = () => {
  const { cartItems } = useCart();

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '300px',
        height: '100%',
        backgroundColor: '#fff',
        boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.2)',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      <h2>Giỏ hàng</h2>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        cartItems.map((diadanh, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <h4>{diadanh.tendd}</h4>
            <p>{diadanh.diachi}</p>
            <p>{diadanh.giatien} VND</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CartSidebar;