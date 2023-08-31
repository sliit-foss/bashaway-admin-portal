import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  ChangePassword,
  Dashboard,
  ForgotPassword,
  Login,
  NotFound,
  Profile,
  QuestionDetails,
  Questions,
  ResetPassword,
  Submissions,
  Users
} from "@/pages";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:id" element={<QuestionDetails />} />
        <Route path="/questions/:id/submissions" element={<Submissions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:code" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
