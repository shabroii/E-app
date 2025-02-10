import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../src/components/Layout/Layout'
import Products from '../src/components/Products/Products'
import Login from '../src/components/Login/Login'
import Register from '../src/components/Register/Register'
import Brands from '../src/components/Brands/Brands'
import Carts from '../src/components/Carts/Carts'
import Logout from '../src/components/Logout/Logout'
import NotFound from '../src/components/NotFound/NotFound'
import ProductDetails from '../src/components/ProductDetails/ProductDetails'
import Checkout from '../src/components/checkout/checkout'
import UserContextProvider from './context/userContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import CartContextProvider from './context/cartContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Allorders from './components/allorders/allorders'
import { Offline, Online } from "react-detect-offline";
import ForgotPassword from './components/forgotPassword/forgotPassword'
import VerifyResetCode from './components/verifyResetCode/verifyResetCode'
import ResetPassword from './components/resetPassword/resetPassword'
import Category from './components/Category/Category'


let query = new QueryClient()


let routes = createBrowserRouter([
{path:'',element:<Layout/>,children:[
  {index:true,element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:'login',element:<Login/>},
  {path:'logout',element:<Logout/>},
  {path:'register',element:<Register/>},
  {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:'category',element:<ProtectedRoute><Category/></ProtectedRoute>},
  {path:'ProductDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  {path:'checkout/:cartId',element:<ProtectedRoute><Checkout/></ProtectedRoute>},
  {path:'allorders',element:<ProtectedRoute><Allorders/></ProtectedRoute>},
  {path:'forgotPassword',element:<ForgotPassword/>},
  {path:'VerifyResetCode',element:<VerifyResetCode/>},
  {path:'resetPassord',element:<ResetPassword/>},
  {path:'carts',element:<ProtectedRoute><Carts/></ProtectedRoute>},
  {path:'*',element:<NotFound/>},
  
]}
])

function App() {
  

  return (
    <CartContextProvider>
   <UserContextProvider>
    <QueryClientProvider client={query}>
      <ReactQueryDevtools></ReactQueryDevtools>
    <RouterProvider router={routes}></RouterProvider>
    {/* <Online>Only shown when you're online</Online> */}
    <Offline>Only shown offline (surprise!)</Offline>
    <Toaster />
    </QueryClientProvider>
    </UserContextProvider>
    </CartContextProvider>
  )
}

export default App
