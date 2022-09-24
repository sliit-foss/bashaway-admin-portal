import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import { Loader } from "../common";
import Footer from "./footer";
import Navbar from "./navbar";

const Layout = ({ children, title = "Bashaway" }) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="image" content="/assets/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Race against time with automation" />
      </Head>
      <motion.main
        className="bg-black font-inter overflow-x-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <div className="w-screen min-h-screen relative z-[5]">{children}</div>
        <Footer />
        <ToastContainer />
        <Loader />
      </motion.main>
    </>
  );
};

export default Layout;
