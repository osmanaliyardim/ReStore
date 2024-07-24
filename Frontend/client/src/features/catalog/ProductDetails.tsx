import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Constants from '../../app/constants/Constants';
import { ChangeEvent, useEffect, useState } from "react";
import NotFound from "../../app/errors/NotFound";
import Loading from "../../app/layout/Loading";
import Utils from "../../app/util/Utils";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { BasketItem } from "../../app/models/basket";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

const ProductDetails = () => {
  const {basket, status} = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const {id} = useParams<{id: string}>();
  const product = useAppSelector(state => productSelectors.selectById(state, +id!));
  const {status: productStatus} = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i: BasketItem) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    if (!product)
      dispatch(fetchProductAsync(parseInt(id!)));
  }, [id, item, dispatch, product]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = parseInt(event.currentTarget.value);

    if (eventValue >= 0 && product?.quantityInStock && eventValue <= product?.quantityInStock)
      setQuantity(eventValue);
    else if (eventValue < 1)
      toast.warning(Constants.QUANTITY_LESS_THAN_1_ERROR);
    else if (product?.name && product?.quantityInStock)
      toast.warning(Constants.QUANTITY_ERROR_DETAILED(product?.name, product?.quantityInStock));
    else
      toast.warning(Constants.QUANTITY_ERROR);
  };

  const handleUpdateCart = (operation: string = "update") => {
    if (!product) return;

    if (operation === "add" && quantity <= 0) {
      toast.warning(Constants.QUANTITY_LESS_THAN_1_ERROR);
      return;
    }

    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      dispatch(addBasketItemAsync({productId: product.id, quantity: updatedQuantity}));
    }
    else{
      const updatedQuantity = item.quantity - quantity;

      dispatch(removeBasketItemAsync({productId: product.id, quantity: updatedQuantity}));
    }
  }

  if (productStatus.includes('pending')) return <Loading message={Constants.PRODUCT_LOADING}/>
  if (!product) return <NotFound/>
  
  let loadingButton;
  if (item) loadingButton = <LoadingButton disabled={item?.quantity === quantity || !item && quantity === 0} loading={status.includes('pending')} onClick={() => handleUpdateCart("update")} sx={{height: "55px"}} color="primary" size="large" variant="contained" fullWidth>{"Update Quantity"}</LoadingButton> 
  else loadingButton = <LoadingButton loading={status.includes('pending')} onClick={() => handleUpdateCart("add")} sx={{height: "55px"}} color="success" size="large" variant="contained" fullWidth>{"Add to Cart"}</LoadingButton> 

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width:"100%"}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant="h4" color="secondary">{Constants.LOCAL_CURRENCY_SYMBOL} {Utils.fixPrice(product.price)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>#Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField variant="outlined" type="number" label="Quantity in Cart" fullWidth value={quantity} onChange={handleInputChange}/>
          </Grid>
          <Grid item xs={6}>
            {loadingButton}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default ProductDetails;