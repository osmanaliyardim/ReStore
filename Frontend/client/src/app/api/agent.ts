import axios, { AxiosError, AxiosResponse } from "axios";
import Constants from "../constants/Constants";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = Constants.BASE_API_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
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
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
};

const Catalog = {
    list: () => requests.get(Constants.PRODUCTS_ENDPOINT),
    details: (id: number) => requests.get(Constants.PRODUCT_ENDPOINT + id)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request').catch(error => console.error(error)),
    get401Error: () => requests.get('buggy/unauthorized').catch(error => console.error(error)),
    get404Error: () => requests.get('buggy/not-found').catch(error => console.error(error)),
    get500Error: () => requests.get('buggy/server-error').catch(error => console.error(error)),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;