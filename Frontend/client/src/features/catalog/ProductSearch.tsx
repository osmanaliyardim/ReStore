import { debounce, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

const ProductSearch = () => {
  const {productParams} = useAppSelector(state => state.catalog);
  const [searchParam, setSearchParam] = useState(productParams.searchParam);
  const dispatch = useAppDispatch();

  // Delay 1s to prevent running unnecesseary search workload
  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({searchParam: event.target.value}))
  }, 1000);

  return (
    <TextField label="Search products" variant="outlined" fullWidth 
        value={searchParam || ''}
        onChange={(event: any) => {
            setSearchParam(event.target.value);
            debouncedSearch(event);
        }}    
    />
  )
};

export default ProductSearch;
