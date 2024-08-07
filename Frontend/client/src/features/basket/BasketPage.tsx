import { Button, Grid, Typography } from "@mui/material";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketTable from "./BasketTable";

const BasketPage = () => {
  const {basket} = useAppSelector(state => state.basket);
  
  if (!basket) return <Typography variant="h3">Your basket is empty.</Typography>

  return (
    <>
      <BasketTable items={basket.items}/>
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>
          <BasketSummary/>
          <Button component={Link} to="/Checkout" variant="contained" size="large" color="success" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  )
};

export default BasketPage;
