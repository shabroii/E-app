import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './../../context/userContext';
import { cartContext } from '../../context/cartContext';
import img from "../../assets/img/png-clipart-green-leaves-illustration-leaf-logo-spring-green-leaf-logo-design-leaf-vegetable-other-removebg-preview.png"

export default function Navbar() {
  let navigate = useNavigate()
  let {isLogin, setLogin}=useContext(userContext)
  let {cartNumber,GetProductToCart} = useContext(cartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false); // لحالة القائمة المنسدلة

  function logOut(){
    localStorage.removeItem('userToken')
    setLogin(null)
    navigate('/Login')
  }

  

  async function getProduct(){
    await GetProductToCart()
   }
 
   useEffect(()=>{
    getProduct()
   },[])
 
 


  return (
    <>
  <nav className="bg-slate-300 shadow-sm p-4 ">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <div className="logo flex items-center flex-col lg:flex-row">
          <a href="">
            <img className="" width={50} height={50} src={img} alt="logo" />
          </a>

          {/* الروابط في الشاشات الصغيرة */}
          <div className="lg:hidden mt-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              {isMenuOpen ? "Close Menu" : "Open Menu"}
            </button>
            {isMenuOpen && (
              <ul className="flex flex-col items-center mt-3 bg-gray-100 p-4 rounded-lg">
                <li className="px-3 py-2"><NavLink to="">Home</NavLink></li>
                <li className="px-3 py-2"><NavLink to="brands">Brands</NavLink></li>
                <li className="px-3 py-2"><NavLink to="category">Category</NavLink></li>
                <li className="px-3 py-2">
                  <NavLink to="carts">
                    Carts <span className="bg-yellow-300 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* الروابط في الشاشات الكبيرة */}
          {isLogin && (
            <ul className="hidden lg:flex flex-row items-center mt-3 lg:mt-0">
              <li className="px-3 py-2"><NavLink to="">Home</NavLink></li>
              <li className="px-3 py-2"><NavLink to="brands">Brands</NavLink></li>
              <li className="px-3 py-2"><NavLink to="category">Category</NavLink></li>
              <li className="px-3 py-2">
                <NavLink to="carts">
                  Carts <span className="bg-yellow-300 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* الأزرار الاجتماعية والخروج */}
        <div className="social mt-3 lg:mt-0">
          <ul className="flex flex-col lg:flex-row items-center">
            {!isLogin ? (
              <>
                <li className="px-3 py-2"><NavLink to="register">Register</NavLink></li>
                <li className="px-3 py-2"><NavLink to="login">Login</NavLink></li>
                <li className="px-3 py-2">
                  <i className="fab fa-facebook px-3"></i>
                  <i className="fab fa-youtube px-3"></i>
                  <i className="fab fa-instagram px-3"></i>
                </li>
              </>
            ) : (
              <li className="px-3 cursor-pointer py-2">
                <span onClick={logOut}>Logout</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    
    
    </>
  )
}
