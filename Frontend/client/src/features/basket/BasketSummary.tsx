import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

export default function BasketSummary() {
    const { basket } = useStoreContext();

    let subTotal = basket?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;
    let deliveryFee = subTotal <= 10000 && subTotal !== 0 ? 500 : 0;
    let deliveryInfo = <span style={{fontStyle: "italic", color: "red"}}>*Orders over $100 qualify for free delivery</span>;

    if (deliveryFee === 0 && subTotal !== 0) 
        deliveryInfo = <span style={{fontStyle: "bold", color: "green"}}>*FREE DELIVERY!</span>;
    
    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">{currencyFormat(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{currencyFormat(subTotal + deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                {deliveryInfo}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}