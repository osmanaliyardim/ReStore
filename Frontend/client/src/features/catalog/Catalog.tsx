import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import * as Constants from '../../app/constants/Constants';

const Catalog = () => {
  const[products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(Constants.PRODUCTS_API_ENDPOINT)
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
  <>
    <ProductList products={products}/>
  </>
  )
};

export default Catalog;
