import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"
import AddQr from "./pages/Add/add-qr"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/add-qr', element: <AddQr /> },
])

export default Routes