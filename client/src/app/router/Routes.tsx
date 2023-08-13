import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../../features/home/Home";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import About from "../../features/about/About";
import Contact from "../../features/contact/Contact";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {path: "", element: <Home/>},
      {path: "catalog", element: <Catalog/>},
      {path: "catalog/:id", element: <ProductDetails/>},
      {path: "about", element: <About/>},
      {path: "contact", element: <Contact/>},
      {path: "server-error", element: <ServerError/>},
      {path: "not-found", element: <NotFound/>},
      {path: "*", element: <Navigate replace to="/not-found"/>},
    ]
  }
])