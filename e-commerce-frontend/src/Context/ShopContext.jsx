import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

  const [products,setProducts] = useState([]);
  
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = {}; // Initialize as an empty object for sizes
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [wishlistItems, setWishlistItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/allproducts') 
          .then((res) => res.json()) 
          .then((data) => setProducts(data))

    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/getcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {setCartItems(data)});
    }

}, [])
  
const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        const itemInfo = products.find((product) => product.id === Number(itemId));
        totalAmount += cartItems[itemId][size] * itemInfo.new_price;
      }
    }
  }
  return totalAmount;
};


const getTotalCartItems = () => {
  let totalItem = 0;
  for (const item in cartItems) {
    for (const size in cartItems[item]) {
      totalItem += cartItems[item][size];
    }
  }
  return totalItem;
};


  const addToCart = (itemId, selectedSize) => {
  
    setCartItems((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [selectedSize]: (prev[itemId][selectedSize] || 0) + 1, // Increment or initialize to 1
      },
    }));
  
    if (localStorage.getItem("auth-token")) {
      fetch('http://localhost:4000/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId, "size": selectedSize }),
      })
        .then((resp) => resp.json())
        .then((data) => { console.log(data); });
    }
    console.log("Adding to Cart - Item ID:", itemId, "Size:", selectedSize);
  };




  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem("auth-token"))
    {
      fetch('http://localhost:4000/removefromcart', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem("auth-token")}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({"itemId":itemId}),
    })
      .then((resp) => resp.json())
      .then((data) => {console.log(data)});
    }
  };

  const contextValue = {products, getTotalCartItems, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;