import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

  let navigate=useNavigate()
  function resetPassword(formData){
    axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',formData)
    .then((response)=>{console.log(response.data);
      if(response.data.token){
        navigate('/Login')
      }else{
        
      }
    })
  }


  let resetFormik = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    onSubmit:resetPassword
  })

  return (
    <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Reset Password
            </h2>

            <form
              className="space-y-6"
              method="POST"
              onSubmit={resetFormik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    onBlur={resetFormik.handleBlur}
                    onChange={resetFormik.handleChange}
                    value={resetFormik.values.email}
                    id="email"
                    name="email"
                    type="email"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <div className="mt-1">
                  <input
                    onBlur={resetFormik.handleBlur}
                    onChange={resetFormik.handleChange}
                    value={resetFormik.values.newPassword}
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!(resetFormik.isValid && resetFormik.dirty)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                 Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
