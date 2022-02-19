import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import withGuest from "../../components/withGuest";

function Register() {
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex flex-col mt-32 items-center">
      <h1 className="mb-10 text-3xl font-semibold ">Register</h1>
      <div className="text-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }

            if (values.name.length < 3) {
              errors.name = "Name must be at least 3 characters";
            }

            if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Passwords must match";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
            console.log(url);
            axios.post(url, {
              email: values.email,
              password: values.password,
              name: values.name,
            })
            .then(res => {
              console.log(res.data);
              setSubmitting(false);
              resetForm();
              toast("Successfully registered");
              // Router.push("/auth/login");
              // TODO: redirect to login page
            }).catch(err => {
              toast.error("Failed to register user. Try again.");
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
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {errors.name && touched.name && errors.name}
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
                <input
                  className="px-4 py-2 border-2 border-btn-bg rounded-lg w-full"
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </div>

              <button
                className="px-4 py-2 bg-btn-bg rounded-lg text-btn-text font-semibold hover:bg-btn-bg-hover disabled:bg-btn-bg-hover disabled:cursor-wait"
                type="submit"
                disabled={isSubmitting}>
                Register
              </button>
            </form>
          )}
        </Formik>
        <div className="mt-1">
          <p className="text-slate-400">or</p>
          <Link
            href="/auth/login">
            <a className="text-slate-400 hover:text-btn-bg hover:underline" >login</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;