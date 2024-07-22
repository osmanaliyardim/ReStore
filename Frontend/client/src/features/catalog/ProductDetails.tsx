import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Constants from '../../app/constants/Constants';
import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";

const ProductDetails = () => {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product |null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && agent.Catalog.details(parseInt(id))
      .then(product => setProduct(product))
      .catch(error => console.error(error.response))
      .finally(() => setLoading(false))
  }, [id]);

  if (loading) return <h3>Loading..</h3>
  if (!product) return <h3>Product Not Found</h3>

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width:"100%"}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant="h4" color="secondary">{Constants.DOLLAR_SYMBOL} {(product.price / 100).toFixed(2)}</Typography>
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
                <TableCell>Unit(s) in Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
};

export default ProductDetails;