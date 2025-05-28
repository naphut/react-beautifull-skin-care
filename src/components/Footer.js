// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer aria-label="Footer">
    <div className="footer-container">
      <div className="footer-company-box">
        <Link to="/" className="footer-logo">Logo</Link>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <div className="footer-social">
          <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" aria-label="YouTube"><i className="fa-brands fa-youtube"></i></a>
        </div>
      </div>
      <div className="footer-link-box">
        <strong>Main Links</strong>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Portfolio</a></li>
        </ul>
      </div>
      <div className="footer-link-box">
        <strong>External Links</strong>
        <ul>
          <li><a href="#">Our Products</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
          <li><a href="#">Terms and Conditions</a></li>
        </ul>
      </div>
      <div className="footer-link-box">
        <strong>Our Products</strong>
        <ul>
          <li><a href="#">Skin Care</a></li>
          <li><a href="#">Hair Care</a></li>
          <li><a href="#">Nail Polish</a></li>
          <li><a href="#">Eye Liners</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span className="footer-owner">Made By Going-To Internet</span>
      <span className="copyright">© Copyright 2022 - Going-To Internet</span>
    </div>
  </footer>
);

export default Footer;