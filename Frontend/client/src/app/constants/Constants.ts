/* Currency Symbols */
const DOLLAR_SYMBOL = "$";
const TLIRA_SYMBOL = "₺";
const EURO_SYMBOL = "€";
const POUND_SYMBOL = "£";

const LOCAL_CURRENCY_SYMBOL = DOLLAR_SYMBOL;

/* Sources: API Endpoints 
const BASE_API_URL = "https://localhost:5001/api/";*/
const BASE_API_URL = import.meta.env.VITE_API_URL;
const LOGIN_API_ENDPOINT = "account/login";
const REGISTER_API_ENDPOINT = "account/register";
const CURRENT_USER_API_ENDPOINT = "account/currentUser";
const SAVED_ADDRESS_API_ENDPOINT = "account/savedAddress";
const HOME_ENDPOINT = "";
const ALL_ENDPOINT = "*";
const PRODUCTS_ENDPOINT = "Product";
const CATALOGS_ENDPOINT = "Catalog";
const CONTACT_ENDPOINT = "Contact";
const BASKET_ENDPOINT = "Basket";
const ABOUT_ENDPOINT = "About";
const LOGIN_ENDPOINT = "Login";
const REGISTER_ENDPOINT = "Register";
const CHECKOUT_ENDPOINT = "Checkout";
const PRODUCT_ENDPOINT = "Product/";
const PRODUCT_FILTERS_ENDPOINT = "Product/Filters";
const ORDERS_ENDPOINT = "Order";
const ORDER_ENDPOINT = "Order/";
const PAYMENT_ENDPOINT = "Payment";

/* Error Endpoints */
const MAIN_ERROR_CONTROLLER = "buggy";
const SERVER_ERROR_ENDPOINT = "/server-error";
const NOT_FOUND_ENDPOINT = "/not-found";
const BAD_REQ_ENDPOINT = "/bad-request";
const UNAUTHORIZED_ENDPOINT = "/unauthorized";
const VALIDATION_ERR_ENDPOINT = "/validation-error";

/* Error Messages */
const QUANTITY_LESS_THAN_1_ERROR = "Quantity cannot be less than 1";
const QUANTITY_ERROR_DETAILED = (productName: string, quantity: number) => {
    return `The avaible quantity in stock for ${productName} is ${quantity}`;
}
const QUANTITY_ERROR = "Quantity cannt be less than 1 and more than in stock";

/* Loading Messages */
const PRODUCTS_LOADING = "Loading products..";
const PRODUCT_LOADING = "Loading product details..";
const BASKET_LOADING = "Loading basket..";
const PROJECT_LOADING = "Initializing the Application..";
const ORDER_LOADING = "Loading orders..";
const CHECKOUT_LOADING = "Loading checkout..";

/* Keys and Connection Variables */
const STRIPE_PUBLIC_KEY = "pk_test_51Pi8kxGHuZIl8YU58aULKClrDKQ0uyBEihrD7tmVqV18pM1ENiOxGInWA7qIbEreQScUAJng93eSY930Y595Y4Zz001wATl94l";

const Constants = {
    DOLLAR_SYMBOL,
    TLIRA_SYMBOL,
    EURO_SYMBOL,
    POUND_SYMBOL,
    BASE_API_URL,
    PRODUCTS_ENDPOINT,
    PRODUCT_ENDPOINT,
    SERVER_ERROR_ENDPOINT,
    CATALOGS_ENDPOINT,
    NOT_FOUND_ENDPOINT,
    CONTACT_ENDPOINT,
    ABOUT_ENDPOINT,
    HOME_ENDPOINT,
    ALL_ENDPOINT,
    LOGIN_ENDPOINT,
    REGISTER_ENDPOINT,
    PRODUCTS_LOADING,
    PRODUCT_LOADING,
    MAIN_ERROR_CONTROLLER,
    BAD_REQ_ENDPOINT,
    UNAUTHORIZED_ENDPOINT,
    VALIDATION_ERR_ENDPOINT,
    BASKET_ENDPOINT,
    BASKET_LOADING,
    PROJECT_LOADING,
    LOCAL_CURRENCY_SYMBOL,
    QUANTITY_LESS_THAN_1_ERROR,
    QUANTITY_ERROR_DETAILED,
    QUANTITY_ERROR,
    CHECKOUT_ENDPOINT,
    PRODUCT_FILTERS_ENDPOINT,
    LOGIN_API_ENDPOINT,
    REGISTER_API_ENDPOINT,
    CURRENT_USER_API_ENDPOINT,
    ORDERS_ENDPOINT,
    ORDER_ENDPOINT,
    SAVED_ADDRESS_API_ENDPOINT,
    ORDER_LOADING,
    PAYMENT_ENDPOINT,
    STRIPE_PUBLIC_KEY,
    CHECKOUT_LOADING
}

export default Constants;