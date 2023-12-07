import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  const {addToWishlist} = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState("S"); // Initialize with a default size

  // Function to handle size selection and add to cart
  const handleSizeSelection = (size) => {
    
    setSelectedSize(size); // Set the selected size in state
  };
 

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
          <img src={product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="img" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(15)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          <p>{product.description}</p>
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
  <div
    className={`size-hover ${selectedSize === 'S' ? 'selected-size' : ''}`}
    onClick={() => handleSizeSelection("S")}
  >
    S
  </div>
  <div
    className={`size-hover ${selectedSize === 'M' ? 'selected-size' : ''}`}
    onClick={() => handleSizeSelection("M")}
  >
    M
  </div>
  <div
    className={`size-hover ${selectedSize === 'L' ? 'selected-size' : ''}`}
    onClick={() => handleSizeSelection("L")}
  >
    L
  </div>
  <div
    className={`size-hover ${selectedSize === 'XL' ? 'selected-size' : ''}`}
    onClick={() => handleSizeSelection("XL")}
  >
    XL
  </div>
  <div
    className={`size-hover ${selectedSize === 'XXL' ? 'selected-size' : ''}`}
    onClick={() => handleSizeSelection("XXL")}
  >
    XXL
  </div>
</div>
        </div>
        <button onClick={() => { addToCart(product.id, selectedSize) }}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> {product.category}</p>
        <p className="productdisplay-right-category"><span>Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;