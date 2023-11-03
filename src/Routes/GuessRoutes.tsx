import { Route, Routes } from "react-router-dom";
import LogInPage from "../Pages/LogIn";
import SignUpPage from "../Pages/SignUp";
import ForgetPasswordPage from "../Pages/ForgotPassword";

const GuessRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LogInPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/forgotpassword" element={<ForgetPasswordPage />} />
        </Routes>
    )
};

export default GuessRoutes;