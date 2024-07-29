import { Grid, Typography } from '@mui/material';
import BasketSummary from '../basket/BasketSummary';
import BasketTable from '../basket/BasketTable';
import { useAppSelector } from '../../app/store/configureStore';

const Review = () => {
  const {basket} = useAppSelector(state => state.basket);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false}/>}
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>
          <BasketSummary/>
        </Grid>
      </Grid>
    </>
  );
}

export default Review;