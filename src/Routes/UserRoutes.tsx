import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Messenger from "../Pages/Messenger";
import Profile from "../Pages/Profile";


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/messages" element={<Messenger />}></Route>
      <Route path="/profile/:name" element={<Profile />}></Route>
    </Routes>
  );
};

export default UserRoutes;