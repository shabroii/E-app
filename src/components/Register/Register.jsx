import axios from 'axios';
import { useFormik } from 'formik'
import React, {useContext, useState} from 'react'
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from './../../context/userContext';





export default function Register() {
    let {setLogin} = useContext(userContext)
   
    const[apiError,setError]=useState('');

    const[isLoading,setLoading]=useState(false);

    let navigate =useNavigate();

    function handleRegister(formsData){
    setLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formsData)
    .then((response)=>{console.log('success',response)
    if(response.data.message == 'success'){
        localStorage.setItem('userToken', response.data.token)
        setLogin(response.data.token)
        setLoading(false)
        navigate('/login')
    }
    })
    .catch((error)=>{
    setLoading(false)
    setError(error.response.data.message)
    })
    
    }
    
    let validationSchema = Yup.object({
    name:Yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email:Yup.string().required('email is required').email('enter avalid email'),
    phone:Yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/,'phone not valid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{6,8}$/,'password not valid'),
    rePassword:Yup.string().required('confirm password is required').oneOf([Yup.ref('password')])
    })
    
    
    let formik =useFormik({
    initialValues:{
    name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:''
    },
   
    validationSchema:validationSchema
    ,
    onSubmit:handleRegister
    })


  return (
    <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
               Register Now
            </h2>
           
            {apiError?
                     <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span className="font-medium">{apiError}</span>
                   </div>:null
                    }
            <form onSubmit={formik.handleSubmit} className="space-y-6" method="POST">
                <div>
                    <label htmlFor="urName" className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1">
                        <input id="urName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} name='name' type="text" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.name && formik.touched.name?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.name}</span>
                   </div>:null
                    }
                   
                    
                    </div>
                </div>

                <div>
                    <label htmlFor="ur-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='ur-email' value={formik.values.email} name='email' type="email"  
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                     {formik.errors.email && formik.touched.email ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.email}</span>
                   </div>:null
                    }
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}  id='password' value={formik.values.password}  name='password' type="password" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.password && formik.touched.password ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.password}</span>
                   </div>:null
                    }
                    </div>
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="mt-1">
                        <input id="confirm-password" onChange={formik.handleChange} onBlur={formik.handleBlur}  value={formik.values.rePassword} name='rePassword' type="password" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                    {formik.errors.rePassword && formik.touched.rePassword ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.rePassword}</span>
                   </div>:null
                    }
                    </div>
                </div>
                
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1">
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur}   name="phone" value={formik.values.phone} id='phone' type="tel" 
                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" />
                     {formik.errors.phone && formik.touched.phone ?
                     <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                     <span class="font-medium">{formik.errors.phone}</span>
                   </div>:null
                    }
                    
                    </div>
                </div>

                <div>
                    <button type="submit"  disabled={!(formik.isValid && formik.dirty)}
                        className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">  
                        {isLoading?<i className='fa fa-spinner fa-spin mx-3'></i>:null}    
                        Register
                        </button>
                       
                </div>
            </form>
        </div>
    </div>
</div>
    </>
  )
}
