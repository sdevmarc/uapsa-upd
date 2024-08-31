import { createBrowserRouter } from "react-router-dom"
import ScanPoints from "@/pages/ScanPoints"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import Attendance from "./pages/Attendance"
import Management from "./pages/Management"
import Settings from "./pages/Settings"
import SignUp from "./pages/SignUp"
import Home from "./pages/Home"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/attendance', element: <Attendance /> },
    { path: '/management', element: <Management /> },
    { path: '/settings', element: <Settings /> },
])

export default Routes