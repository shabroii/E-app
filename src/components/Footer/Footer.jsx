import React from 'react'
import img from "../../assets/img/Logo.png"
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-700 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className=" flex justify-around gap-6  md:text-left">
            {/* Logo and Intro */}
            <div > 
              <h2 className="text-xl font-bold text-green-600">
                <img src={img} width={100} height={100} alt="" />
              </h2>
              <p className="mt-2 text-sm">
                Shop the best products at the best prices with <br /> guaranteed quality.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className='px-4'>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><NavLink to={"/home"}  className="hover:text-green-600">Home</NavLink></li>
                <li><NavLink to={"/category"} className="hover:text-green-600">Categories</NavLink></li>
                <li><NavLink to={"/carts"} className="hover:text-green-600">Cart</NavLink></li>
                <li><NavLink to={"/brands"} className="hover:text-green-600">Brands</NavLink></li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div className='px-4'>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex  justify-center md:justify-start mt-3 space-x-4">
                <NavLink className="hover:text-green-600"><i className="fab fa-facebook"></i></NavLink>
                <NavLink className="hover:text-green-600"><i className="fab fa-twitter"></i></NavLink>
                <NavLink className="hover:text-green-600"><i className="fab fa-instagram"></i></NavLink>
                <NavLink className="hover:text-green-600"><i className="fab fa-linkedin"></i></NavLink>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="text-center mt-6 border-t pt-4 text-sm">
            &copy; {new Date().getFullYear()} All Rights Reserved | <span className='text-green-500 font-bold' >Shopo Market</span>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;