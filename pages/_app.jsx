import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "@store";
import useAuth from "@hooks/auth";

const App = ({ Component, pageProps }) => {
  useAuth();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
