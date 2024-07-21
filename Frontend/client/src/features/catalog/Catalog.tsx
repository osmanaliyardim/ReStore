import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

const Catalog = () => {
  const[products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/Product')
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
