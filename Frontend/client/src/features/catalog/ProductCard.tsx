import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import * as Constants from '../../app/constants/Constants'

interface Props {
    product: Product;
}

const ProductCard = ({product}: Props) => {
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
            {Constants.DOLLAR_SYMBOL} {((product.price)/100).toFixed(2)} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small">Add to cart</Button>
          <Button variant="contained" size="small">View</Button>
        </CardActions>
      </Card>
  )
};

export default ProductCard;
