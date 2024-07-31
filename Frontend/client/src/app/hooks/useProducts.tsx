import { useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFiltersAsync } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../store/configureStore";

const useProducts = () => {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, filtersLoaded, brands, types, metaData} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!productsLoaded)
        dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);
  
    useEffect(() => {
      if (!filtersLoaded)
        dispatch(fetchFiltersAsync());
    }, [dispatch, filtersLoaded]);

    return {
        products,
        productsLoaded, 
        filtersLoaded, 
        brands, 
        types, 
        metaData
    }
}

export default useProducts;