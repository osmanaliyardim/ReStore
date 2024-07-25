/* Currency Symbols */
const DOLLAR_SYMBOL = "$";
const TLIRA_SYMBOL = "₺";
const EURO_SYMBOL = "€";
const POUND_SYMBOL = "£";

const LOCAL_CURRENCY_SYMBOL = DOLLAR_SYMBOL;

/* Sources: API Endpoints 
const BASE_API_URL = "https://localhost:5001/api/";*/
const BASE_API_URL = "http://localhost:5000/api/";
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
    PRODUCT_FILTERS_ENDPOINT
}

export default Constants;