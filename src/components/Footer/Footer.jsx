import React from 'react'
import img from "../../assets/img/png-clipart-green-leaves-illustration-leaf-logo-spring-green-leaf-logo-design-leaf-vegetable-other-removebg-preview.png"


const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-700 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            {/* Logo and Intro */}
            <div>
              <h2 className="text-xl font-bold text-green-600">
                <img src={img} width={70} height={70} alt="" />
              </h2>
              <p className="mt-2 text-sm">
                Shop the best products at the best prices with guaranteed quality.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:text-green-600">Home</a></li>
                <li><a href="#" className="hover:text-green-600">Categories</a></li>
                <li><a href="#" className="hover:text-green-600">Cart</a></li>
                <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex justify-center md:justify-start mt-3 space-x-4">
                <a href="#" className="hover:text-green-600"><i className="fab fa-facebook"></i></a>
                <a href="#" className="hover:text-green-600"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-green-600"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-green-600"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="text-center mt-6 border-t pt-4 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved | <span className='text-green-500 font-bold' >Shopo</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;