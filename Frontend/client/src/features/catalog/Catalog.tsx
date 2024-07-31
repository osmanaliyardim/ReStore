import ProductList from "./ProductList";
import Loading from "../../app/layout/Loading";
import Constants from "../../app/constants/Constants";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setPageNumber, setProductParams } from "./catalogSlice";
import { FormControl, FormLabel, Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to Low'},
  {value: 'price', label: 'Price - Low to High'},
]

const Catalog = () => {
  const {products, filtersLoaded, brands, types, metaData} = useProducts();
  const {productParams} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
 
  if (!filtersLoaded) return <Loading message={Constants.PRODUCTS_LOADING}/>

  return (
    <Grid container columnSpacing={4}>

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
      <Grid item xs={9} sx={{mb:2}}>
        {metaData &&
        <AppPagination metaData={metaData} onPageChange={(pageNum: number) => dispatch(setPageNumber({pageNumber: pageNum}))} />
        }
      </Grid>
    </Grid>
  )
};

export default Catalog;
