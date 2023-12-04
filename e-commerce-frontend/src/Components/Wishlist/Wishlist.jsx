import React, { useContext } from "react";
import "./Wishlist.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const Wishlist = () => {
  const {products} = useContext(ShopContext);
  const {cartItems,removeFromCart} = useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((e)=>{

        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format">
                      <img className="cartitems-product-icon" src={e.image} alt="" />
                      <p cartitems-product-title>{e.name}</p>
                      <img onClick={()=>{removeFromCart(e.id)}} className="cartitems-remove-icon" src={cross_icon} alt="" />
                    </div>
                     <hr />
                  </div>;
        }
        return null;
      })}
      
      
          </div>
      
      
    
  );
};

export default Wishlist;
