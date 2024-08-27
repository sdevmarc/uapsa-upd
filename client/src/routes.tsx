import { createBrowserRouter } from "react-router-dom"
import Home from "@/pages/Home"
import SignIn from "./pages/SignIn"
import Dashboard from "./pages/Dashboard"

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/dashboard', element: <Dashboard /> },
])

export default Routes