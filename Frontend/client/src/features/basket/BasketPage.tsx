import Constants from "../../app/constants/Constants";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Utils from "../../app/util/Utils";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import { BasketItem } from "../../app/models/basket";

const BasketPage = () => {
  const {basket, status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  
  if (!basket) return <Typography variant="h3">Your basket is empty.</Typography>

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item: BasketItem) => (
              <TableRow
                key={item.productId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <img src={item.pictureUrl} alt={item.name} style={{height:50, marginRight: 20}}/>
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{Constants.LOCAL_CURRENCY_SYMBOL}{Utils.fixPrice(item.price)}</TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'rem'} onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))} color="error">
                    <Remove/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status === 'pendingAddItem' + item.productId} onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} color="success">
                    <Add/>
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{Constants.LOCAL_CURRENCY_SYMBOL}{Utils.fixPriceWithQuantity(item.price, item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'del'} onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))} color="error">
                    <Delete/>
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
