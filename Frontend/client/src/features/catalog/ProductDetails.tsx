import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import * as Constants from '../../app/constants/Constants';
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../app/models/product";

const ProductDetails = () => {
  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<Product |null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(Constants.PRODUCT_API_ENDPOINT+id)
      .then(response => setProduct(response.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading..</h3>
  if (!product) return <h3>Product Not Found</h3>

  return (
    <Typography variant="h2">
        {product?.name}
    </Typography>
  )
};

export default ProductDetails;