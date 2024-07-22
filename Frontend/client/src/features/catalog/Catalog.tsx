import { useEffect, useState } from "react";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import agent from '../../app/api/agent';
import Loading from "../../app/layout/Loading";
import Constants from "../../app/constants/Constants";

const Catalog = () => {
  const[products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loading message={Constants.PRODUCTS_LOADING}/>

  return (
  <>
    <ProductList products={products}/>
  </>
  )
};

export default Catalog;
