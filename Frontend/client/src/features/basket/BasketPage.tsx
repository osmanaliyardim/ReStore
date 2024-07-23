import Constants from "../../app/constants/Constants";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import Utils from "../../app/util/Utils";
import { useStoreContext } from "../../app/context/StoreContext";

const BasketPage = () => {
  const {basket} = useStoreContext();
  
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
            <TableCell align="right">{Constants.DOLLAR_SYMBOL}{Utils.fixPrice(item.price)}</TableCell>
            <TableCell align="right">{item.quantity}</TableCell>
            <TableCell align="right">{Constants.DOLLAR_SYMBOL}{Utils.fixPriceWithQuantity(item.price, item.quantity)}</TableCell>
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
