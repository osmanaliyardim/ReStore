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

const Utils = {
    getCookie,
    fixPrice,
    fixPriceWithQuantity
}

export default Utils;
