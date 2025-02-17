import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { userContext } from './../../context/userContext';
import { cartContext } from '../../context/cartContext';
import img from "../../assets/img/Logo.png"
import { WishlistContext } from '../../context/wishlistContext';

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
        <div className="flex flex-col lg:flex-row justify-between lg:items-center">
          <div className="logo flex items-center flex-col lg:flex-row">
            <a href="">
              <img className="" width={80} height={80} src={img} alt="logo" />
            </a>

          
            <div className="lg:hidden mt-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                {isMenuOpen ? (language === 'en' ? 'Close Menu' : 'إغلاق القائمة') : (language === 'en' ? 'Open Menu' : 'فتح القائمة')}
              </button>
              {isMenuOpen && (
                <ul className="flex flex-col items-center mt-3 bg-gray-100 p-4 rounded-lg">
                  <li className="px-3 py-2"><NavLink to="">{language === 'en' ? 'Home' : 'الصفحة الرئيسية'}</NavLink></li>
                  <li className="px-3 py-2"><NavLink to="brands">{language === 'en' ? 'Brands' : 'العلامات التجارية'}</NavLink></li>
                  <li className="px-3 py-2"><NavLink to="category">{language === 'en' ? 'Category' : 'الفئة'}</NavLink></li>
                  <li className="px-3 py-2">
                    <NavLink to="cart">
                      {language === 'en' ? 'Cart' : 'العربة'} <span className="bg-yellow-300 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>

          
            {isLogin && (
              <ul className="hidden lg:flex flex-row items-center mt-3 lg:mt-0">
                <li className="px-3 py-2"><NavLink to="">{language === 'en' ? 'Home' : 'الصفحة الرئيسية'}</NavLink></li>
                <li className="px-3 py-2"><NavLink to="brands">{language === 'en' ? 'Brands' : 'العلامات التجارية'}</NavLink></li>
                <li className="px-3 py-2"><NavLink to="category">{language === 'en' ? 'Category' : 'الفئة'}</NavLink></li>
                <li className="px-3 py-2">
                  <NavLink to="cart">
                    {language === 'en' ? 'Cart' : 'العربة'} <span className="bg-yellow-300 px-1 rounded text-sm text-slate-500">{cartNumber}</span>
                  </NavLink>
                </li>
                <li className="px-3 py-2">
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
                  <li className="px-3 py-2"><NavLink to="register">{language === 'en' ? 'Register' : 'تسجيل'}</NavLink></li>
                  <li className="px-3 py-2"><NavLink to="login">{language === 'en' ? 'Login' : 'تسجيل الدخول'}</NavLink></li>
                  <li className="px-3 py-2">
                    <i className="fab fa-facebook px-3"></i>
                    <i className="fab fa-youtube px-3"></i>
                    <i className="fab fa-instagram px-3"></i>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-3 cursor-pointer py-2">
                    <span onClick={logOut}>{language === 'en' ? 'Logout' : 'تسجيل الخروج'}</span>
                  </li>
      
                  <li className="px-3 py-2">
                    <button
                      onClick={toggleLanguage}
                      className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                    >
                      {language === 'en' ? 'AR' : 'EN'}
                    </button>
                  </li>
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
