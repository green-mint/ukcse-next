import store from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "./layout/Header";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "../store/actions/user";

function LayoutWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(login(user));
    }
    setLoading(false);
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default LayoutWrapper;
