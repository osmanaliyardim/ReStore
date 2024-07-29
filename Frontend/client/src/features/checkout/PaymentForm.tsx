import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckbox from "../../app/components/AppCheckbox";

const PaymentForm = () => {
  const {control, formState} = useFormContext();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput name="nameOnCard" label="Name on card" control={control}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name="numberOnCard" label="Number on card" control={control}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name="dateOnCard" label="Expiry Date on card" control={control}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextInput name="cvvOnCard" label="CVV Number on card" control={control}/>
        </Grid>
        <Grid item xs={12}>
          <AppCheckbox disabled={!formState.isDirty} name="saveCard" label="Remember this credit card details for next time" control={control}/>
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentForm;