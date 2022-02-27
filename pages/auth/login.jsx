import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/user";
import withGuest from "../../components/withGuest";
import { useRouter } from "next/router";

function Login() {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmission = (values, { setSubmitting }) => {
    setSubmitting(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        email: values.email,
        password: values.password,
      })
      .then(res => {
        const user = {
          id: res.data.user.id,
          email: res.data.user.email,
          token: res.data.token,
          refreshToken: res.data.refreshToken,
          name: res.data.user.name,
          isAdmin: res.data.user.isAdmin,
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(user));
        router.replace("/");
      })
      .catch(err => {
        console.log("Error in login in user");
        console.log(err);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col mt-32 items-center w-3/5 mx-auto">
      <h1 className="mb-10 text-5xl">Login</h1>
      <div className="w-full">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={values => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            return errors;
          }}
          onSubmit={handleFormSubmission}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              className="w-full flex flex-col items-center space-y-4 justify-center"
              onSubmit={handleSubmit}
            >
              <div className="w-2/5 flex flex-col items-center space-y-4">
                <div className="w-full">
                  <input
                    className="px-4 py-2 border-2 rounded-md w-full"
                    type="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="text-sm text-red-500 text-left ml-2">
                    {errors.email && touched.email && errors.email}
                  </span>
                </div>

                <div className="w-full">
                  <input
                    className="px-4 py-2 border-2 rounded-md w-full"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  <span className="text-sm text-red-500 text-left ml-2">
                    {errors.password && touched.password && errors.password}
                  </span>
                </div>

                <button
                  className="w-full px-4 py-2 bg-btn-bg rounded-lg text-btn-text font-semibold hover:bg-btn-bg-hover disabled:bg-btn-bg-hover disabled:cursor-wait"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="mt-1 flex flex-col items-center">
          <p className="text-slate-400">or</p>
          <Link href="/auth/register">
            <a className="text-slate-800 text-lg hover:text-btn-bg hover:underline">
              register
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
