import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './../../context/userContext';
import { cartContext } from '../../context/cartContext';
import img from "../../assets/img/Logo.png"
import { WishlistContext } from '../../context/wishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  let navigate = useNavigate()
  let {isLogin, setLogin}=useContext(userContext)
  let {cartNumber, GetProductToCart} = useContext(cartContext)
  const { wishlist } = useContext(WishlistContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en'); 

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

  function toggleLanguage() {
    setLanguage((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  }

  return (
    <>
      <nav className="bg-slate-300 shadow-sm p-4">
        <div className="container px-10">
        <div className="flex  lg:flex-row justify-between lg:items-center">
          <div className="logo flex items-center mr-4 lg:flex-row">
            <a href="">
              <img className="" width={80} height={80} src={img} alt="logo" />
            </a>

          
            <div className="lg:hidden mt-3 relative">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="bg-gray-800 hover:bg-green-600 transition text-white px-4 py-2 ml-4 rounded-md"
  >
    {isMenuOpen ? (language === 'en' ? 'Close Menu' : 'إغلاق القائمة') : (language === 'en' ? 'Open Menu' : 'فتح القائمة')}
  </button>

  <AnimatePresence>
    {isMenuOpen && (
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute left-4 right-0 top-full bg-gray-100 p-4 rounded-lg shadow-lg z-50 max-h-60 overflow-hidden flex flex-col items-center"
      >
        <li className="px-3 py-2 font-bold text-gray-800 transition hover:text-green-600"><NavLink to="">{language === 'en' ? 'Home' : 'الصفحة الرئيسية'}</NavLink></li>
        <li className="px-3 py-2 font-bold text-gray-800 transition hover:text-green-600"><NavLink to="brands">{language === 'en' ? 'Brands' : 'العلامات التجارية'}</NavLink></li>
        <li className="px-3 py-2 font-bold text-gray-800 transition hover:text-green-600"><NavLink to="category">{language === 'en' ? 'Category' : 'الفئة'}</NavLink></li>
        <li className="px-3 py-2 font-bold text-gray-800 transition hover:text-green-600">
          <NavLink to="cart">
            {language === 'en' ? 'Cart' : 'العربة'} 
            <span className="bg-yellow-300 ml-2 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
          </NavLink>
        </li>
        <li className="px-3 py-2 font-bold text-gray-800 transition hover:text-green-600">
          <NavLink to="wishlist">
            {language === 'en' ? 'Wishlist' : 'المفضلة'} 
            <span className="bg-red-300 ml-2 px-1 rounded text-sm text-slate-500">{wishlist.length}</span>
          </NavLink>
        </li>
      </motion.ul>
    )}
  </AnimatePresence>
</div>


          
            {isLogin && (
              <ul className="hidden lg:flex flex-row items-center mt-3 lg:mt-0">
                <li className="px-3 py-2 font-bold text-gray-800 hover:text-green-600 transition"><NavLink to="">{language === 'en' ? 'Home' : 'الصفحة الرئيسية'}</NavLink></li>
                <li className="px-3 py-2 font-bold text-gray-800 hover:text-green-600 transition"><NavLink to="brands">{language === 'en' ? 'Brands' : 'العلامات التجارية'}</NavLink></li>
                <li className="px-3 py-2 font-bold text-gray-800 hover:text-green-600 transition"><NavLink to="category">{language === 'en' ? 'Category' : 'الفئة'}</NavLink></li>
                <li className="px-3 py-2 font-bold text-gray-800 hover:text-green-600 transition">
                  <NavLink to="cart">
                    {language === 'en' ? 'Cart' : 'العربة'} <span className="bg-yellow-300 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
                  </NavLink>
                </li>
                <li className="px-3 py-2 font-bold text-gray-800 hover:text-green-600 transition">
                  <NavLink to="wishlist">
                    {language === 'en' ? 'Wishlist' : 'المفضلة'} <span className="bg-red-300 px-1 rounded text-sm text-slate-500">{wishlist.length}</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

        
          <div className="social mt-3 lg:mt-0 flex items-center">
            <ul className="flex flex-col lg:flex-row items-center">
              {!isLogin ? (
                <>
                  <li className="px-3 font-bold py-2 text-gray-800 hover:text-green-600 transition"><NavLink to="register">{language === 'en' ? 'Register' : 'تسجيل'}</NavLink></li>
                  <li className="px-3 font-bold py-2 text-gray-800 hover:text-green-600 transition"><NavLink to="login">{language === 'en' ? 'Login' : 'تسجيل الدخول'}</NavLink></li>
                  <li className="px-3 font-bold py-2 text-gray-800 hover:text-green-600 transition">
                    <i className="fab fa-facebook px-3 hover:text-green-600"></i>
                    <i className="fab fa-youtube px-3 hover:text-green-600"></i>
                    <i className="fab fa-instagram px-3 hover:text-green-600"></i>
                  </li>
                </>
              ) : (
                <>
                  <div className='flex flex-row'>
                  <li className="px-3 font-bold cursor-pointer py-2 text-gray-800 hover:text-green-600 transition">
                    <span onClick={logOut}>{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
                  </li>
      
                  <li className="px-3 py-2">
                    <button
                      onClick={toggleLanguage}
                      className="bg-gray-800 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      {language === 'en' ? 'AR' : 'EN'}
                    </button>
                  </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
        </div>
       
      </nav>
    </>
  );
}
