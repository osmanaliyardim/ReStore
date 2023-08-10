import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog(){
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/product')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, []) // We're adding an empty array to prevent going into endless loop of requests

  return (
    <>
      <ProductList products={products}/>
    </>
  )
}