import { Basket } from "../models/basket";

const getCookie = (key: string) => {
    const cookieValue = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    
    return cookieValue ? cookieValue.pop() : null;
}

const fixPrice = (price: number) => {
    return (price / 100).toFixed(2);
}

const fixPriceWithQuantity = (price: number, quantity: number) => {
    return ((price / 100) * quantity).toFixed(2);
}

const fixDate = (date: string) => {
    return date.split('T')[0];
}

const fixDateTime = (date: string) => {
    const fixedDate = date.split('T')[0];
    const time = date.split('T')[1].split('.')[0];
    
    return fixedDate + ' / ' + time;
}

const calculateFinalPrice = (basket: Basket | null) => {
    let totalPrice = 0;

    if (basket)
        totalPrice = basket?.items.reduce((sum, item) => sum + ((item.price / 100) * item.quantity), 0);

    return totalPrice;
}

const Utils = {
    getCookie,
    fixPrice,
    fixPriceWithQuantity,
    calculateFinalPrice,
    fixDate,
    fixDateTime
}

export default Utils;
