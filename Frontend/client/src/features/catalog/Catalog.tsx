import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../../app/layout/Loading";
import Constants from "../../app/constants/Constants";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors } from "./catalogSlice";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {productLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productLoaded)
      dispatch(fetchProductsAsync());
    
  }, [dispatch, productLoaded]);

  useEffect(() => {
    if (!filtersLoaded)
      dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);
 
  if (status.includes('pending')) return <Loading message={Constants.PRODUCTS_LOADING}/>

  return (
  <>
    <ProductList products={products}/>
  </>
  )
};

export default Catalog;
