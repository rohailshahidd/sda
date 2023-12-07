import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from 'react-router-dom';


const CartItems = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext);

  const totalCartAmount = getTotalCartAmount();

  if (totalCartAmount === 0) {
    return (
      <div className="cartitems-empty">
        <p>Your cart is empty. Select items to add to the cart.</p>
      </div>
    );
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Size</p>
        <p>Price</p>
        <p>Quantity</p>   
        <p>Remove</p>
       
      </div>
      <hr />
      {products.map((e) => {
  const itemSizes = cartItems[e.id];
  if (itemSizes && Object.keys(itemSizes).length > 0) {
    return Object.keys(itemSizes).map((size) => (
      <div key={`${e.id}_${size}`}>
        <div className="cartitems-format">
          <img className="cartitems-product-icon" src={e.image} alt="" />
          <p cartitems-product-title>{e.name}</p>
          <p className="cartitems-size">{size}</p>
          <p>${e.new_price}</p>
          <p className="cartitems-quatity">{itemSizes[size]}</p>
         
          <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
        </div>
        <hr />
      </div>
    ));
  }
  return null;
})}
      
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <Link to='/checkout' style={{ textDecoration: 'none', padding: '10px', backgroundColor: 'black', color: 'white', borderRadius: '5px' }}>
    PROCEED TO CHECKOUT
        </Link>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button >Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;