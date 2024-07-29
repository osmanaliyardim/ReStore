import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Badge, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Constants from "../../app/constants/Constants";
import { Order } from "../../app/models/order";
import Utils from "../../app/util/Utils";
import OrderDetail from "./OrderDetail";
import Loading from "../../app/layout/Loading";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);
  const buyer = orders?.find(o => o.buyerId)?.buyerId.toLocaleUpperCase();

  useEffect(() => {
    setLoading(true);
    agent.Order.list()
        .then(orders => setOrders(orders))
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading message={Constants.ORDER_LOADING}/>

  if (selectedOrderNumber > 0) return (
    <OrderDetail
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      order={orders?.find(o => o.id === selectedOrderNumber)!}
      setSelectedOrder={setSelectedOrderNumber}
    />
  )

  return (
    <>
      <Typography sx={{p:2}} gutterBottom variant="h4">{buyer}'s Orders</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map(order => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell align="right" sx={{color: "green", fontWeight: "bold"}}>{Constants.LOCAL_CURRENCY_SYMBOL}{Utils.fixPrice(order.totalPrice)}</TableCell>
                <TableCell align="right">{Utils.fixDateTime(order.date)}</TableCell>
                <TableCell align="right">
                  <Badge color="error" badgeContent={order.status}>
                  </Badge>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" onClick={() => setSelectedOrderNumber(order.id)}>VIEW DETAILS</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    
  )
};

export default OrderPage;
