import { Avatar, Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./checkoutValidation";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StripeElementType } from "@stripe/stripe-js";

const steps = ['Shipping address', 'Review your order', 'Payment details'];

const CheckoutPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [orderNumber, setOrderNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const [cardState, setCardState] = useState<{elementError: {[key in StripeElementType]?: string}}>({elementError: {}});
    const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false});
  
    const onCardInputChange = (event: any) => {
      setCardState({
        ...cardState,
        elementError: {
          ...cardState.elementError,
          [event.elementType]: event.error?.message
        }
      })
      setCardComplete({
        ...cardComplete, 
        [event.elementType]: event.complete
      });
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <AddressForm/>;
            case 1:
                return <Review/>;
            case 2:
                return <PaymentForm cardState={cardState} onCardInputChange={onCardInputChange}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const currentValidationSchema = validationSchema[activeStep];

    const methods = useForm({
      mode: 'all',
      resolver: yupResolver(currentValidationSchema)
    });

    useEffect(() => {
        agent.Account.fetchAddress()
            .then(response => {
                if (response)
                    methods.reset({...methods.getValues(), ...response, saveAddress: false})
            })
    }, [methods])

    const handleNext = async (data: FieldValues) => {
        const {saveAddress, ...shippingAddress} = data;

        if (activeStep === steps.length - 1) {
            setLoading(true);

            try {
                const orderNumber = await agent.Order.create({saveAddress, shippingAddress});
                setOrderNumber(orderNumber);
                setActiveStep(activeStep + 1);
                dispatch(clearBasket());
                setLoading(false);
            } catch (error: any) {
                console.error(error);
                setLoading(false);
            }
        }
        else {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const submitDisabled = () => {
        if (activeStep === steps.length - 1){
            return !cardComplete.cardCvc 
                || !cardComplete.cardExpiry 
                || !cardComplete.cardNumber 
                || !methods.formState.isValid;
        }
        else {
            return !methods.formState.isValid;
        }
    }

    return (
      <FormProvider {...methods}>
        <Paper variant="outlined" sx={{my: {xs: 3, md: 6}, p: {xs: 2, md: 3}}}>
            <Typography component="h1" variant="h2" align="center">
                CHECKOUT <span style={{color: "#2196f3", fontSize: 20}}>(via <b>Stripe</b>)</span>
            </Typography>
            <Stepper activeStep={activeStep} sx={{pt: 3, pb: 5}}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        >
                            <CheckCircleIcon color="success"/>
                            <Typography variant="h4" gutterBottom sx={{mt: 2, color: "green"}}>
                                Order Successfull
                            </Typography>
                        </Box>
                        
                        <Typography variant="h5" gutterBottom sx={{mt: 2}}>
                            Thank you for your order.
                        </Typography>
                        <Typography variant="subtitle1">
                            Your order number is <span style={{color: "#2196f3", textDecoration: "underline"}}>{orderNumber}</span>. We have emailed your order
                            confirmation, and will send you an update when your order has
                            shipped!
                        </Typography>  
                        <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{mt:22}}
                        >
                            <Avatar
                            alt="ReStore Logo"
                            src="/public/images/logo.png"
                            sx={{ bgcolor: "#2196f3", width: 250, height: 96 }}
                            />
                        </Box>
                    </>
                ) : (
                    <form onSubmit={methods.handleSubmit(handleNext)}>
                        {getStepContent(activeStep)}
                        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                            {activeStep !== 0 && (
                                <Button onClick={handleBack} sx={{mt: 3, ml: 1}}>
                                    Back
                                </Button>
                            )}
                            <LoadingButton
                                loading={loading}
                                disabled={submitDisabled()}
                                variant="contained"
                                type="submit"
                                sx={{mt: 3, ml: 1}}
                            >
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </>
        </Paper>
      </FormProvider>
    );
}

export default CheckoutPage;