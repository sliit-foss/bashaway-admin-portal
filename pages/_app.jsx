import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "@hooks/auth";
import store from "@store";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  useAuth();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
