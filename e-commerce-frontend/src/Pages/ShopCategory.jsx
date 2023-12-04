import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { Link } from "react-router-dom";


const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default"); // "default" or "priceLowToHigh" or "priceHighToLow"
  const [showFilters, setShowFilters] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchInfo = () => {
    fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])


    useEffect(() => {
      fetchInfo();
    }, [])
    const handleSortChange = (value) => {
      setSortBy(value);
      // Create a copy of the products array to avoid mutating the original state
      let sortedProducts = [...allproducts];
    
      switch (value) {
        case "priceLowToHigh":
          sortedProducts.sort((a, b) => a.new_price - b.new_price);
          break;
        case "priceHighToLow":
          sortedProducts.sort((a, b) => b.new_price - a.new_price);
          break;
        default:
          // No sorting or default sorting logic
          break;
      }
    
      setAllProducts(sortedProducts);
    };
    const handleFilterChange = (filterType, value) => {
      if (filterType === "color") {
        setSelectedColor(value);
      } else if (filterType === "category") {
        setSelectedCategory(value);
      }
    };

    const applyFilters = () => {
      // Apply your filtering logic here
      // For simplicity, let's assume you have a filter function that filters products based on selectedColor and selectedCategory
      const filteredProducts = allproducts.filter((item) => {
        return (
          (!selectedColor || item.color === selectedColor) &&
          (!selectedCategory || item.category === selectedCategory)
        );
      });
  
      return filteredProducts;
    };
  

   return (
    <div className="shopcategory">
      {/* ... (existing code) */}
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - 12</span> out of 54 Products</p>
        <div className="shopcategory-sort">
          Sort by
          <select onChange={(e) => handleSortChange(e.target.value)}>
            <option value="default">Default</option>
            <option value="priceLowToHigh">Price Low to High</option>
            <option value="priceHighToLow">Price High to Low</option>
          </select>
        </div>
        <button onClick={() => setShowFilters(true)}>Filter</button>
      </div>
      <div className="shopcategory-products">
        {applyFilters().map((item, i) => {
          if (props.category === item.category) {
            return <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>

      {/* Popup form for filters */}
      {showFilters && (
        <div className="popup-form">
          <h2>Filters</h2>
          <label>
            Color:
            <select onChange={(e) => handleFilterChange("color", e.target.value)}>
              <option value="">All Colors</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              {/* Add more color options as needed */}
            </select>
          </label>
          <label>
            Category:
            <select onChange={(e) => handleFilterChange("category", e.target.value)}>
              <option value="">All Categories</option>
              <option value="NEW">New</option>
              <option value="SHIRTS">Shirt</option>
              <option value="SWEATPANTS">Sweatpants</option>
              {/* Add more category options as needed */}
            </select>
          </label>
          <button onClick={() => setShowFilters(false)}>Apply Filters</button>
        </div>
      )}

      {/* ... (existing code) */}
    </div>
  );
};

export default ShopCategory;
