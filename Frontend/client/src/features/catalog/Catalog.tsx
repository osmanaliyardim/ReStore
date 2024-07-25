import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../../app/layout/Loading";
import Constants from "../../app/constants/Constants";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, FormControl, FormLabel, Grid, Pagination, Paper, Typography } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status, filtersLoaded, brands, types, productParams} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded)
      dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded)
      dispatch(fetchFiltersAsync());
  }, [dispatch, filtersLoaded]);
 
  if (status.includes('pending')) return <Loading message={Constants.PRODUCTS_LOADING}/>

  return (
    <Grid container spacing={4}>

      <Grid item xs={3}>
        <Paper sx={{mb:2}}>
          <ProductSearch/>
        </Paper>

        <Paper sx={{mb:2, p:2}}>
        <FormLabel>Sort by</FormLabel>
          <FormControl>
            <RadioButtonGroup selectedValue={productParams.orderBy} options={sortOptions} onChange={(event) => dispatch(setProductParams({orderBy: event.target.value})) } />
          </FormControl>
        </Paper>

        <Paper sx={{mb:2, p:2}}>
          <FormLabel>Filter by BRAND</FormLabel>
          <CheckBoxButtons items={brands} checked={productParams.brands} onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}/>
        </Paper>

        <Paper sx={{mb:2, p:2}}>
          <FormLabel>Filter by TYPE</FormLabel>
          <CheckBoxButtons items={types} checked={productParams.types} onChange={(items: string[]) => dispatch(setProductParams({types: items}))}/>
        </Paper>
      </Grid>

      <Grid item xs={9}>
        <ProductList products={products}/>
      </Grid>

      <Grid item xs={3}/>
      <Grid item xs={9}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>
            Displaying 1-6 of 20 items
          </Typography>
          <Pagination color="secondary" size="large" count={5} page={1} />
        </Box>
      </Grid>
    </Grid>
  )
};

export default Catalog;
