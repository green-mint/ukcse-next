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

  const handleFormSubmission = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`;
    console.log(url);
    axios
      .post(url, {
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
      })
      .catch(err => {
        toast.error("Failed to register user. Try again.");
        console.log(err);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="flex flex-col mt-32 items-center w-3/5 mx-auto">
      <h1 className="mb-10 text-5xl">Register</h1>
      <div className="w-full">
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
          }}
          validate={values => {
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
                    type="text"
                    name="name"
                    placeholder="Name"
                    required={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  <span className="text-sm text-red-500 text-left ml-2">
                    {errors.name && touched.name && errors.name}
                  </span>
                </div>

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

                <div className="w-full">
                  <input
                    className="px-4 py-2 border-2 rounded-md w-full"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  <span className="text-sm text-red-500 text-left ml-2">
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      errors.confirmPassword}
                  </span>
                </div>

                <button
                  className="w-full px-4 py-2 bg-btn-bg rounded-lg text-btn-text font-semibold hover:bg-btn-bg-hover disabled:bg-btn-bg-hover disabled:cursor-wait"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
            </form>
          )}
        </Formik>
        <div className="mt-1 flex flex-col items-center">
          <p className="text-slate-400">or</p>
          <Link href="/auth/register">
            <a className="text-slate-800 text-lg hover:text-btn-bg hover:underline">
              login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
