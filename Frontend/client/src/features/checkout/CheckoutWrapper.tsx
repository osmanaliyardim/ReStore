import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Pi8kxGHuZIl8YU58aULKClrDKQ0uyBEihrD7tmVqV18pM1ENiOxGInWA7qIbEreQScUAJng93eSY930Y595Y4Zz001wATl94l");

const CheckoutWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
       <CheckoutPage/> 
    </Elements>
  )
};

export default CheckoutWrapper;
