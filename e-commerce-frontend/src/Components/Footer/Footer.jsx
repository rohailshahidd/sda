import React, { useState, useEffect } from 'react';
import './Footer.css';
import {  Modal } from "antd";
import { Link } from 'react-router-dom';



const Footer = () => {
  let [menu, setMenu] = useState('shop');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openLegal, setOpenLegal] = useState(false);

  const handleClickTerms = () => {
    setOpenTerms(true);
  };

  const handleClickPolicy = () => {
    setOpenPolicy(true);
  };

  const handleClickLegal = () => {
    setOpenLegal(true);
  };

  const handleModalCloseTerms = () => {
    setOpenTerms(false);
  };

  const handleModalClosePolicy = () => {
    setOpenPolicy(false);
  };

  const handleModalCloseLegal = () => {
    setOpenLegal(false);
  };

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
        setError('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showError]);

  const initialFormData = {
    email: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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

    // Regular expression to match a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered email is in a valid format
    if (!emailRegex.test(formData.email)) {
      // If not in a valid format, show an alert
      alert("Please enter a valid email address.");
      setFormData({
        ...formData,
        email: "",
      });
      return;
    }

    // Clear the input field
    setFormData({
      ...formData,
      email: "",
    });
  };


  return (
    <> <div className="error-box">
    {showError && <div className="error-message">{error}</div>}
  </div>
      <div className="footer-container">
        <div className="bnav">
          <div className="lbnav">
            <ul>
              <li><a
           
            onClick={() => handleClickTerms()}
          >
            Terms of Services
          </a></li>
              <li><a   onClick={() => handleClickPolicy()}>Privacy Policy</a></li>
              <li><a   onClick={() => handleClickLegal()}>Legal</a></li>
            </ul>
          </div>
         
          <Modal
        className="form-modal"
        visible={openTerms}
        destroyOnClose
        title="TERMS AND SERVICES"
        width={1000}
        onCancel={handleModalCloseTerms}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
     >
      <hr></hr>
    
     <div className='terms'>
      <div className='head-terms'>
          <div className='heading-term'>
           <p> ORDERING</p>
          </div>
          <div className='text-term'>
           <p>By placing an order with NEBULA you agree to our terms and conditions.</p>
          </div>
          <div className='heading-term'>
           <p>SHIPPING</p>
          </div>
          <div className='text-term'>
           <p>We offer global shipping. Shipping times and fees may vary. Please check our shipping page for details.</p>
          </div>
          <div className='heading-term'>
           <p>RETURNS</p>
          </div>
          <div className='text-term'>
           <p>We accept returns within 30 days of purchase. Items must be unused and in their original packaging.</p>
          </div>
          <div className='heading-term'>
           <p>PRIVACY</p>
          </div>
          <div className='text-term'>
           <p>Your privacy is important to us. We use your personal information only for order processing and communication.</p>
          </div>
          <div className='heading-term'>
           <p> PAYMENT</p>
          </div>
          <div className='text-term'>
           <p>We accept various payment methods, including credit cards and PayPal.</p>
          </div>
          <div className='heading-term'>
           <p>PRODUCT DESCRIPTION</p>
          </div>
          <div className='text-term'>
           <p>Product descriptions and images are for reference. Actual colors and sizes may vary.</p>
          </div>
          <div className='heading-term'>
           <p> CONTACT US</p>
          </div>
          <div className='text-term'>
           <p>If you have any questions or concerns, please contact us at SHOP@NEBULA.com</p>
          </div>
          <div className='heading-term'>
           <p>CHANGE TO TERMS</p>
          </div>
          <div className='text-term'>
           <p>We reserve the right to update these terms and conditions at any time. Please review them periodically.</p>
          </div>
      </div>
     
     </div>
     </Modal>
     <Modal
        className="form-modal"
        visible={openPolicy}
        destroyOnClose
        title="PRIVACY POLICY"
        width={1000}
        onCancel={handleModalClosePolicy}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
     >
      <hr></hr>
    
     <div className='terms'>
      <p>This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.</p>
      <div className='head-terms'>
          <div className='heading-term'>
           <p>INFORMATION WE COLLECT</p>
          </div>
          <div className='text-term'>
          <p>1. &nbps; Personal Information: When you make a purchase or sign up for an account, we may collect your name, email address, and contact information.</p>
          <p>2. &nbps; Usage Data: We may collect information about how you use our website, such as your browsing history and the pages you visit.</p>

          </div>
          <div className='heading-term'>
           <p>HOW WE USE YOUR INFORMATION</p>
          </div>
          <div className='text-term'>
           <p>&nbsp;&nbsp;Order Processing: To process and fulfill your orders.</p>
           <p>&nbsp;&nbsp;Communication: To communicate with you about your orders and provide customer support.</p>
          <p>Website Improvement: To analyze how our website is used and make improvements.</p>
          </div>
          <div className='heading-term'>
           <p>DATA SECURITY</p>
          </div>
          <div className='text-term'>
           <p>We take the security of your data seriously. We implement measures to protect your information from unauthorized access.</p>
          </div>
          <div className='heading-term'>
           <p>THIRD-PARTY SERVICES</p>
          </div>
          <div className='text-term'>
           <p>We may use third-party services for payment processing and analytics. These services have their own privacy policies, and we encourage you to review them.</p>
          </div>
          <div className='heading-term'>
           <p>YOUR CHOICES</p>
          </div>
          <div className='text-term'>
           <p>You have the right to access, correct, or delete your personal information. You can contact us to exercise these rights.</p>
          </div>
          <div className='heading-term'>
           <p>CHANGE TO THIS POLICY</p>
          </div>
          <div className='text-term'>
           <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
          </div>
          <div className='heading-term'>
           <p> CONTACT US</p>
          </div>
          <div className='text-term'>
           <p>If you have any questions about our Privacy Policy, please contact us at SHOP@NEBULA.com</p>
          </div>
        
      </div>
     
     </div>
     </Modal>
     <Modal
        className="form-modal"
        visible={openLegal}
        destroyOnClose
        title="TERMS AND SERVICES"
        width={1000}
        onCancel={handleModalCloseLegal}
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
        bodyStyle={{ maxHeight: '400px', overflowY: 'auto' }}
     >
      <hr></hr>
    
     <div className='terms'>
     <p>By using this website, you agree to comply with and be bound by the following terms and conditions:</p>
      <div className='head-terms'>
          <div className='heading-term'>
           <p>INTELLECTUAL PROPERTY</p>
          </div>
          <div className='text-term'>
           <p>The content on this website, including text, images, logos, and trademarks, is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our written permission.</p>
          </div>
          <div className='heading-term'>
           <p>DISCLAIMERS</p>
          </div>
          <div className='text-term'>
           <p>&nbsp;&nbsp;Accuracy: We strive to provide accurate and up-to-date information on our website, but we do not guarantee the accuracy, completeness, or timeliness of the content. Use the information at your own risk.</p>

          <p>&nbsp;&nbsp; External Links: Our website may contain links to third-party websites. We are not responsible for the content or practices of these websites and do not endorse them..</p>
          </div>
          <div className='heading-term'>
           <p>LIMITATION OF LIABILITY</p>
          </div>
          <div className='text-term'>
           <p>We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or any content herein.</p>
          </div>
          <div className='heading-term'>
           <p>PRIVACY</p>
          </div>
          <div className='text-term'>
           <p>our use of this website is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>
          </div>
          <div className='heading-term'>
           <p>GOVERNING LAW</p>
          </div>
          <div className='text-term'>
           <p>This website is operated from LAHORE. Any legal disputes arising from its use shall be governed by the laws of [Jurisdiction] without regard to conflicts of law principles.</p>
          </div>
          <div className='heading-term'>
           <p>CHANGES TO TERMS</p>
          </div>
          <div className='text-term'>
           <p>We reserve the right to update or modify these terms and conditions at any time without notice. Please check this page periodically for changes.</p>
          </div>
          <div className='heading-term'>
           <p>CONTACT INFORMATION</p>
          </div>
          <div className='text-term'>
           <p>If you have any questions or concerns, please contact us at SHOP@NEBULA.com</p>
          </div>
        
     </div>
     </div>
   
     </Modal>
     <div className='contact-us'>
      <ul>
     <li onClick={()=>{setMenu("Contact")}}><Link to='/Contact' style={{ textDecoration: 'none' }}>Contact Us</Link>{menu==="Contact"?<hr/>:<></>}</li>
     </ul>      
      </div>
     
          <div className="newsletter_textbox">
           
            <div className="textbox">
              <div className="ntext">
                <p>NEWSLETTER</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="box">
                 
                <input
            type="text"
            id="emailInput"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
                  <div className="submit1">
                    <button type="submit"></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;