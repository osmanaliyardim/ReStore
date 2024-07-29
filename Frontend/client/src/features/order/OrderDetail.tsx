import { Box, Button, Grid, Typography } from "@mui/material";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";
import BasketSummary from "../basket/BasketSummary";
import Utils from "../../app/util/Utils";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

const OrderDetail = ({order, setSelectedOrder}: Props) => {
  let subtotal = order.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
  
  if (subtotal > 0)
    subtotal = parseInt(Utils.fixPrice(subtotal));

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{p:2}} gutterBottom variant="h5">
            Order Details for <span style={{color: "#2196f3", textDecoration: "underline"}}>{order.id}</span> - {order.status}
        </Typography>
        <Button onClick={() => setSelectedOrder(0)} sx={{mx:2}} size="large" variant="contained">Back to Orders</Button>
      </Box>
      <BasketTable items={order.items as BasketItem[]} isBasket={false}/>
      <Grid container>
        <Grid item xs={6}/>
        <Grid item xs={6}>
            <BasketSummary subtotal={subtotal}/>
        </Grid>
      </Grid>
    </>
  )
};

export default OrderDetail;
