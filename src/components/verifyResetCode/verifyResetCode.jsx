import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyResetCode() {

  let navigate = useNavigate()

  function verify(formData){
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',formData)
    .then((response)=>{console.log(response)
      if(response.data.status == "Success"){
        navigate('/resetPassord')
      }
    })
  }

  
  let verifyFormik = useFormik({
    initialValues:{
      resetCode:''
    },
    onSubmit:verify
  })

  return (
    <>
        <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Verify Code
            </h2>

            <form
              className="space-y-6"
              method="POST"
              onSubmit={verifyFormik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="resetCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Code
                </label>
                <div className="mt-1">
                  <input
                    onBlur={verifyFormik.handleBlur}
                    onChange={verifyFormik.handleChange}
                    value={verifyFormik.values.resetCode}
                    id="resetCode"
                    name="resetCode"
                    type="text"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                 Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
