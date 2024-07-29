import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import Constants from "../constants/Constants";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./ReqireAuth";
import OrderPage from "../../features/order/OrderPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {element: <RequireAuth/>, children: [
                {path: Constants.CHECKOUT_ENDPOINT, element: <CheckoutPage/>},
                {path: Constants.ORDERS_ENDPOINT, element: <OrderPage/>},
            ]},
            {path: Constants.HOME_ENDPOINT, element: <HomePage/>},
            {path: Constants.CATALOGS_ENDPOINT, element: <Catalog/>},
            {path: Constants.PRODUCT_ENDPOINT+':id', element: <ProductDetails/>},
            {path: Constants.ABOUT_ENDPOINT, element: <AboutPage/>},
            {path: Constants.CONTACT_ENDPOINT, element: <ContactPage/>},
            {path: Constants.SERVER_ERROR_ENDPOINT, element: <ServerError/>},
            {path: Constants.NOT_FOUND_ENDPOINT, element: <NotFound/>},
            {path: Constants.BASKET_ENDPOINT, element: <BasketPage/>},
            {path: Constants.LOGIN_ENDPOINT, element: <Login/>},
            {path: Constants.REGISTER_ENDPOINT, element: <Register/>},
            {path: Constants.ALL_ENDPOINT, element: <Navigate replace to={Constants.NOT_FOUND_ENDPOINT}/>}
        ]
    }
])
