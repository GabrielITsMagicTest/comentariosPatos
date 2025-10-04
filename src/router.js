import { createBrowserRouter } from "react-router-dom";
import Chat from './components/chat/chat'
import NotFound from "./components/not_found/not_found";
import Login from "./components/login/login";
import Home from "./components/home/home";
import Register from "./components/register/register";

let router = createBrowserRouter([
    {
        path: "/",
        Component: Home
    },
    {
        path: "/chat",
        Component: Chat
    },{
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "*",
        Component: NotFound
    }
])

export default router