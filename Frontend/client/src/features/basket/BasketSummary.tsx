import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import Utils from "../../app/util/Utils";
import Constants from "../../app/constants/Constants";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  subtotal?: number;
}

const BasketSummary = ({subtotal}: Props) => {
  const {basket} = useAppSelector(store => store.basket);  
  const deliveryFee = 5;
  if (subtotal === undefined)
    subtotal = Utils.calculateFinalPrice(basket);
    
  const isDeliveryFree = subtotal >= 100 ? true : false;
  const total = isDeliveryFree ? subtotal : (subtotal + deliveryFee);

  let deliveryFeeTableCell, deliveryFeeInfoCell;
  if (isDeliveryFree) {
    deliveryFeeTableCell = <TableCell align="right" sx={{color: "grey", textDecoration: "line-through black"}}>{Constants.LOCAL_CURRENCY_SYMBOL}{deliveryFee.toFixed(2)}</TableCell>;
    deliveryFeeInfoCell =  <TableCell sx={{fontWeight: "bold", fontSize: 11, color: "green"}}>*FREE DELIVERY!</TableCell>;
  }
  else {
    deliveryFeeTableCell = <TableCell align="right" sx={{fontWeight: "bold", color: "red"}}>{Constants.LOCAL_CURRENCY_SYMBOL}{deliveryFee.toFixed(2)}</TableCell>;
    deliveryFeeInfoCell =  <TableCell sx={{fontWeight: "bold", fontStyle: "italic", fontSize: 11, color: "red"}}>*Orders over $100 qualify for free delivery!</TableCell>;
  } 

  return (
    <TableContainer component={Paper} variant={'outlined'}>
    <Table>
        <TableBody>
            <TableRow>
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">{Constants.LOCAL_CURRENCY_SYMBOL} {subtotal.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>Delivery fee*</TableCell>
                {deliveryFeeTableCell}
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right"><span style={{fontWeight: "bold", fontSize: 20, color: "green"}}> {Constants.LOCAL_CURRENCY_SYMBOL} {total.toFixed(2)} </span></TableCell>
            </TableRow>
            <TableRow>
                {deliveryFeeInfoCell}
            </TableRow>
        </TableBody>
    </Table>
    </TableContainer>
  )
};

export default BasketSummary;
