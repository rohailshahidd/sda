import React, { useState } from "react";
import "./Contact.css";
import { Link } from 'react-router-dom';

const Contact = () => {
  const initialFormData = {
    name: "",
    email: "",
    service: "General Inquiry",
    message: "",
  };

  // Define state variables to store form input values and submission status
  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here (e.g., validate email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name || !formData.email || !emailRegex.test(formData.email) || !formData.message) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/submitcontactform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData(initialFormData);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 10000);
      } else {
        console.error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  return (
    <>
      <div className="main">
        <div className="page-content">
          <div className="form-content">
            <section>
              <div className="headers">
                <div className="Header1">
                  <p>Send Us A Message</p>
                </div>
                <div className="Header2">
                  <p>Contact</p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="inquiry">
                    <div className="name-field">
                      <label />
                      Name
                      <span style={{ color: "rgb(236,23,18)" }}>
                        &#160;&#42;
                      </span>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter..."
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="query">
                      <span>Queries</span>
                      <br />
                      <a target="blank">Shopat@Nebula.com</a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="inquiry">
                    <div className="email-field">
                      <label />
                      Email
                      <span style={{ color: "rgb(236,23,18)" }}>
                        &#160;&#42;
                      </span>
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
                    <div className="query">
                      <span>Returns</span>
                      <li onClick={() => { /* Your return page logic */ }}>
                        <Link to='/Returnspage' style={{ textDecoration: 'none' }}>
                          <a>RETURNS.NEBULA.COM</a>
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="service">
                    <label />
                    Type of Service
                    <select
                      id="selectBox"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Return and Exchanges">
                        Return and Exchanges
                      </option>
                      <option value="My Account">My Account</option>
                      <option value="Damages">Damages</option>
                      <option value="Cancellation Request">
                        Cancellation Request
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <label />
                  Message
                  <textarea
                    id="myMessage"
                    name="message"
                    rows="6"
                    cols="50"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button className="square-big-button" type="submit">
                  Submit
                </button>
              </form>

              {formSubmitted && (
                <div className="submission-message">
                  Thank you for your submission!
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
