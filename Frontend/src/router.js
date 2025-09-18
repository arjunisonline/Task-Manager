
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard";
import { createBrowserRouter } from "react-router-dom";
import Loginpage from "./components/loginpage";
import Signuppage from "./components/Signup";
import NotFound from "./components/notfound";


const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Loginpage/> },
  { path: "/signup", element: <Signuppage /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFound /> },
  
]);

export default router;