export function getCookie(key: string) {
  const cookieItem = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return cookieItem ? cookieItem.pop() : "";
}

export function currencyFormat (amount: number){
  return "$" + (amount/100).toFixed(2);
}

export function currencyFormatWithQuantity (amount: number, quantity: number){
  return "$" + ((amount/100) * quantity).toFixed(2);
}