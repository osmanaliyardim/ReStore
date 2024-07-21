import { List } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

const componentName = ({products}: Props) => {
  return (
    <List>
      {
        products.map(product => (
          <ProductCard key={product.id} product={product}/>
        ))
      }
    </List>
  )
};

export default componentName;
