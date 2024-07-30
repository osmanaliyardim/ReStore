import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import Constants from "../../app/constants/Constants";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import Loading from "../../app/layout/Loading";

const stripePromise = loadStripe(Constants.STRIPE_PUBLIC_KEY);

const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payment.createPaymentIntent()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) return <Loading message={Constants.CHECKOUT_LOADING}/>

  return (
    <Elements stripe={stripePromise}>
       <CheckoutPage/> 
    </Elements>
  )
};

export default CheckoutWrapper;
