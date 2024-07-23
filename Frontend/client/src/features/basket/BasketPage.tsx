import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import Constants from "../../app/constants/Constants";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

const BasketPage = () => {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);
  
  useEffect(() => {
    agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
  }, []);

  if (loading) return <Loading message={Constants.BASKET_LOADING}/>

  if (!basket) return <Typography variant="h3">Your basket is empty.</Typography>

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Product</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
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
              {item.name}
            </TableCell>
            <TableCell align="right">{Constants.DOLLAR_SYMBOL}{Constants.priceFixer(item.price)}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{Constants.DOLLAR_SYMBOL}{Constants.priceFixerWithQuantity(item.price, item.quantity)}</TableCell>
            <TableCell align="right">
              <IconButton color="error">
                <Delete/>
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
};

export default BasketPage;
