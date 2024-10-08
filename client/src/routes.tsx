import { createBrowserRouter } from "react-router-dom"
import SignIn from "@/pages/sign-in"
import SignUp from "@/pages/sign-up"
import ScanAttendance from "@/pages/scan-attendance"
import NotFoundPage from "@/pages/error-not-found"
import ViewPointsAttendance from "@/pages/view-points-attendance"
import Settings from "./pages/settings"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import Management from "./pages/Management"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/scanattendance', element: <ScanAttendance /> },
    { path: '/management', element: <Management /> },
    { path: '/viewstatus/:qr', element: <ViewPointsAttendance /> },
    { path: '/settings', element: <Settings /> },
    { path: '*', element: <NotFoundPage /> },
])

export default Routes