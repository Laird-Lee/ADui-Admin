import {RouteObject, createBrowserRouter} from "react-router-dom";
import App from "../App.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>
    }
]

export const router = createBrowserRouter(routes, {
    // basename: '/react-app'
})
