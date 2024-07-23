import Constants from "../../app/constants/Constants";
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Utils from "../../app/util/Utils";
import { useStoreContext } from "../../app/context/StoreContext";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";

const BasketPage = () => {
  const {basket, setBasket, removeItem} = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  const handleAddItem = (productId: number, name: string) => {
    setStatus({loading: true, name});
    
    agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.error(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }

  const handleRemoveItem = (productId: number, quantity = 1, name: string) => {
    setStatus({loading: true, name});
    
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch(error => console.error(error))
      .finally(() => setStatus({loading: false, name: ''}))
  }
  
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
            {basket.items.map(item => (
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
                  <LoadingButton loading={status.loading && status.name === 'Remove ' + item.name} onClick={() => handleRemoveItem(item.productId, 1, `Remove ${item.name}`)} color="error">
                    <Remove/>
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status.loading && status.name === 'Add ' + item.name} onClick={() => handleAddItem(item.productId, `Add ${item.name}`)} color="success">
                    <Add/>
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{Constants.LOCAL_CURRENCY_SYMBOL}{Utils.fixPriceWithQuantity(item.price, item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status.loading && status.name === 'Delete ' + item.name} onClick={() => handleRemoveItem(item.productId, item.quantity, `Delete ${item.name}`)} color="error">
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
