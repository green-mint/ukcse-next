import "../styles/globals.css";
import store from "../store";
import { Provider, useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.min.css";
import LayoutWrapper from "../components/LayoutWrapper";


function MyApp({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <LayoutWrapper pageProps={pageProps} Component={Component} />
    </Provider>
  );
}

export default MyApp;
