import { createBrowserRouter } from "react-router-dom"
import ScanPoints from "@/pages/ScanPoints"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import Management from "./pages/Management"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"
import ScanAttendance from "./pages/ScanAttendance"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/scanattendance', element: <ScanAttendance /> },
    { path: '/scanpoints', element: <ScanPoints /> },
    { path: '/management', element: <Management /> },
])

export default Routes