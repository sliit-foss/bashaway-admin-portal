import { Provider } from "react-redux";
import store from "@store";
import useAuth from "@hooks/auth";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps }) => {
  useAuth();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
