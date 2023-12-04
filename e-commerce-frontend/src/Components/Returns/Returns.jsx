import React, { useState } from "react";
import { Button } from "antd";
import "./Returns.css";

const Returns = () => {
  const initialFormData = {
    orderNumber: "",
    email: "",
  };
  let [menu, setMenu] = useState('shop');
  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderNumberError, setOrderNumberError] = useState(""); // State to store order number error message

 

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.orderNumber.startsWith("#CN") || !formData.email || !emailRegex.test(formData.email)) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setFormSubmitted(true);
    setFormData(initialFormData);

    setTimeout(() => {
      setFormSubmitted(false);
    }, 10000);
  };

  return (
    <>
      <div className="returns-main">
        <div className="content">
          <div className="form1">
            <p className="head">RETURN AND EXCHANGES</p>
            <div className="items">
              <div className="pic1"></div>
              <div className="pic2"></div>
              <div className="pic3"></div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="order-email">
                <div className="order">
                  <input
                    type="text"
                    id="order"
                    placeholder={"#CN"} // Set the placeholder dynamically
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleInputChange}
                   
                   
                    required
                  />
                  
                </div>
                <div className="email">
                  <input
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button className="square-btn" type="submit">
                  Start Return
                </button>
              </div>
            </form>
            {formSubmitted && (
              <div className="submission-message">
                Thank you for your submission!
              </div>
            )}
          </div>
        </div>
       
        <div className="form2">
          <div className="help">
            <p>Need help with a return?</p>
          </div>
          <div className="email-help">
            <p>
              Contact us at &nbsp;
              <a href="mailto:shop@Nebula.com">shop@Nebula.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Returns;