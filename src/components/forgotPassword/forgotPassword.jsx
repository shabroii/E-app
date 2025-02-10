import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function ForgotPassword() {
  let navigate = useNavigate();

  function forgodPassword(formData) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        formData
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.statusMsg == "success") {
          navigate("/VerifyResetCode");
        }
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgodPassword,
  });

  return (
    <>
      <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-green-700">
              Forgot Password
            </h2>

            <form
              className="space-y-6"
              method="POST"
              onSubmit={formik.handleSubmit}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    id="email"
                    name="email"
                    type="email"
                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                >
                  Send Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
