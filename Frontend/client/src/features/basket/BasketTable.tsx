import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import Constants from "../../app/constants/Constants";
import { BasketItem } from "../../app/models/basket";
import Utils from "../../app/util/Utils";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

const BasketTable = ({items, isBasket=true}: Props) => {
  const {status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();

  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              {
                isBasket &&
                <TableCell align="right"></TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item: BasketItem) => (
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
                  {
                    isBasket &&
                    <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'rem'} onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))} color="error">
                        <Remove/>
                    </LoadingButton>
                  }
                  {item.quantity}
                  {
                    isBasket &&
                    <LoadingButton loading={status === 'pendingAddItem' + item.productId} onClick={() => dispatch(addBasketItemAsync({productId: item.productId}))} color="success">
                        <Add/>
                    </LoadingButton>
                  }
                </TableCell>
                <TableCell align="right">{Constants.LOCAL_CURRENCY_SYMBOL}{Utils.fixPriceWithQuantity(item.price, item.quantity)}</TableCell>
                {
                  isBasket &&
                  <TableCell align="right">
                    <LoadingButton loading={status === 'pendingRemoveItem' + item.productId + 'del'} onClick={() => dispatch(removeBasketItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))} color="error">
                        <Delete/>
                    </LoadingButton>
                  </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
  )
};

export default BasketTable;