import { Provider } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Footer, Header } from "@/components";
import { useAuth } from "@/hooks";
import { default as AnimatedRoutes } from "@/routes";
import { store } from "@/store";
import { ErrorBoundary, Loader, Toaster, TooltipProvider } from "@sliit-foss/bashaway-ui/components";

const App = () => {
  const location = useLocation();
  const completed = useAuth();
  return (
    <Provider store={store}>
      <TooltipProvider>
        <ErrorBoundary>
          <Header />
          <motion.main
            key={location.pathname}
            className="w-full max-w-body mx-auto px-8 lg:px-24 flex flex-col items-center relative z-[5] font-inter break-words  overflow-x-hidden pt-[calc(70px+64px)] pb-[64px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedRoutes />
          </motion.main>
          <Footer />
          <Loader />
          <Toaster />
          <div
            className={`fixed inset-0 h-screen w-full bg-white z-50 transition-all duration-long ${
              completed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
        </ErrorBoundary>
      </TooltipProvider>
    </Provider>
  );
};

export default App;
