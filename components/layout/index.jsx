import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { isEmpty } from "lodash";
import { useEffectOnce } from "@hooks/index";
import { getCurrentUser } from "@services/auth";
import { setCurrentUser } from "@store/user";
import FOG from "vanta/dist/vanta.fog.min";
import { Loader } from "../common";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children, title = "Bashaway" }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const vantaRef = useRef(null);

  const [vantaEffect, setVantaEffect] = useState(0);

  const { backgroundAnimation } = useSelector((state) => state.ui);

  const { currentUser } = useSelector((state) => state.user);

  useEffectOnce(() => {
    localStorage.getItem("token") &&
      isEmpty(currentUser) &&
      getCurrentUser().then((res) => {
        dispatch(setCurrentUser(res.data));
      });
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.pathname]);

  useEffect(() => {
    if (backgroundAnimation) {
      document.getElementById("vanta-placeholder").style.display = "none";
      document.getElementById("vanta-placeholder").style.backgroundImage =
        "radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1))";
    }
  }, []);

  useEffect(() => {
    if (backgroundAnimation) {
      if (!vantaEffect && vantaRef.current) {
        document.getElementById("vanta-placeholder").style.display = "block";
        setVantaEffect(
          FOG({
            el: vantaRef.current,
            minHeight: 200.0,
            minWidth: 200.0,
            highlightColor: 0x0,
            midtoneColor: 0xc0c0c,
            lowlightColor: 0x414141,
            baseColor: 0x90909,
            blurFactor: 0.37
          })
        );
      }
      return () => {
        if (vantaEffect) {
          vantaEffect.destroy();
          setVantaEffect(0);
        }
      };
    }
  }, [vantaRef, vantaEffect, backgroundAnimation]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Race against time with automation" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />
      </Head>
      <Navbar />
      <motion.main
        className="bg-black font-inter overflow-x-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-screen min-h-screen relative z-[5]">{children}</div>
        <ToastContainer />
        <Loader />
        {backgroundAnimation && (
          <div id="vanta-placeholder" ref={vantaRef} className="w-full h-full bg-black fixed top-0 right-0" />
        )}
      </motion.main>
      <Footer />
    </>
  );
};

export default Layout;
