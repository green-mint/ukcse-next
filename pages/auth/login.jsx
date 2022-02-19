import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import axios from "axios";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../store/actions/user";
import withGuest from "../../components/withGuest";
import { useRouter } from "next/router";

function Login() {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col mt-32 items-center">
      <h1 className="mb-10 text-3xl font-semibold ">Login</h1>
      <div className="text-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
              email: values.email,
              password: values.password,
            })
            .then((res) => {
              const user = {
                id: res.data.user.id,
                email: res.data.user.email,
                token: res.data.token,
                refreshToken: res.data.refreshToken,
                name: res.data.user.name,
                isAdmin: res.data.user.isAdmin,
              };
              localStorage.setItem('user', JSON.stringify(user));
              dispatch(login(user));
              router.replace("/");
            })
            .catch((err) => {
              console.log("Error in login in user");
              console.log(err);
            })
            .then(() => {
              setSubmitting(false);
            })
          }}>
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
              className=" flex flex-col items-center space-y-4 justify-center"
              onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-4">
                <input
                  className="px-4 py-2 border-2 border-btn-bg rounded-lg w-full"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                {errors.email && touched.email && errors.email}

                <input
                  className="px-4 py-2 border-2 border-btn-bg rounded-lg w-full"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

                {errors.password && touched.password && errors.password}
              </div>

              <button
                className="px-4 py-2 bg-btn-bg rounded-lg text-btn-text font-semibold hover:bg-btn-bg-hover disabled:bg-btn-bg-hover disabled:cursor-wait"
                type="submit"
                disabled={isSubmitting}>
                Login
              </button>
            </form>
          )}
        </Formik>
        <div className="mt-1">
          <p className="text-slate-400">or</p>
          <Link href="/auth/register">
            <a className="text-slate-400 hover:text-btn-bg hover:underline">register</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
