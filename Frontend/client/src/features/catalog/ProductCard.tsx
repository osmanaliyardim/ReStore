import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import Constants from '../../app/constants/Constants'
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
    product: Product;
}

const ProductCard = ({product}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleAddItem = (productId: number) => {
    setLoading(true);
    agent.Basket.addItem(productId)
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }

  return (
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{bgcolor: 'secondary.main'}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={product.name}
          titleTypographyProps={{
            sx: {fontWeight: 'bold', color: 'primary.main'}
          }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
            {Constants.DOLLAR_SYMBOL} {Constants.priceFixer(product.price)} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton loading={loading} onClick={() => handleAddItem(product.id)} variant="contained" size="small">Add to cart</LoadingButton>
          <Button component={Link} to={`/${Constants.PRODUCT_ENDPOINT}${product.id}`} variant="contained" size="small">View</Button>
        </CardActions>
      </Card>
  )
};

export default ProductCard;

