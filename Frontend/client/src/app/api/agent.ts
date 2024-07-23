import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from "../constants/Constants";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

/* To simulate fetching products from remote server */
const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = Constants.BASE_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    /* To simulate fetching products from remote server */
    await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status){
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors){
                    if (data.errors[key])
                    {
                        modelStateErrors.push(data.errors[key]);
                    }  
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            router.navigate(Constants.SERVER_ERROR_ENDPOINT, {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Catalog = {
    list: () => requests.get(Constants.PRODUCTS_ENDPOINT),
    details: (id: number) => requests.get(Constants.PRODUCT_ENDPOINT + id)
}

const TestErrors = {
    get400Error: () => requests.get(`${Constants.MAIN_ERROR_CONTROLLER}${Constants.BAD_REQ_ENDPOINT}`).catch(error => console.error(error)),
    get401Error: () => requests.get(`${Constants.MAIN_ERROR_CONTROLLER}${Constants.UNAUTHORIZED_ENDPOINT}`).catch(error => console.error(error)),
    get404Error: () => requests.get(`${Constants.MAIN_ERROR_CONTROLLER}${Constants.NOT_FOUND_ENDPOINT}`).catch(error => console.error(error)),
    get500Error: () => requests.get(`${Constants.MAIN_ERROR_CONTROLLER}${Constants.SERVER_ERROR_ENDPOINT}`).catch(error => console.error(error)),
    getValidationError: () => requests.get(`${Constants.MAIN_ERROR_CONTROLLER}${Constants.VALIDATION_ERR_ENDPOINT}`),
}

const Basket = {
    get: () => requests.get(Constants.BASKET_ENDPOINT),
    addItem: (productId: number, quantity = 1) => requests.post(`${Constants.BASKET_ENDPOINT}?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`${Constants.BASKET_ENDPOINT}?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}

export default agent;