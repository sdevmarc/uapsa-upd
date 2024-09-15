import { createBrowserRouter } from "react-router-dom"
import ScanPoints from "@/pages/scan-points"
import SignIn from "@/pages/sign-in"
import SignUp from "@/pages/sign-up"
import ScanAttendance from "@/pages/scan-attendance"
import NotFoundPage from "@/pages/error-not-found"
import ViewPointsAttendance from "@/pages/view-points-attendance"
import Home from "@/pages/Home"
import Management from "@/pages/management"
import Dashboard from "@/pages/dashboard"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/scanattendance', element: <ScanAttendance /> },
    { path: '/scanpoints', element: <ScanPoints /> },
    { path: '/management', element: <Management /> },
    { path: '/viewstatus', element: <ViewPointsAttendance /> },
    { path: '*', element: <NotFoundPage /> },
])

export default Routes