import store from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from "./layout/Header";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { login } from "../store/actions/user";
import { useRouter } from "next/router";
import { registerLogs } from "../utils/registerLogs";

function LayoutWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const route = router.asPath;
  const user = useSelector((state) => state.user);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(login(user));
    }
    setLoading(false);
  }, []);


  useEffect(() => {
    registerLogs(user.id ? user.id : "null", "PAGE_LOAD", route);
  }, [route]);
  return (
    <div className="flex flex-col h-screen">
      <div id="modal"/>
      <ToastContainer />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <Component {...pageProps} />
        </>
      )}
    </div>
  );
}

export default LayoutWrapper;
