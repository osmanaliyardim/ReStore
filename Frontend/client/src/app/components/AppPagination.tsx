import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination";
import { useState } from "react";

interface Props {
    metaData: MetaData;
    onPageChange: (page: number) => void;
}

const AppPagination = ({metaData, onPageChange}: Props) => {
  const {currentPage, totalCount, totalPages, pageSize} = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    onPageChange(page);
  } 

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-{currentPage * pageSize > totalCount ? totalCount : currentPage * pageSize} of {totalCount} items
      </Typography>
      <Pagination color="secondary" size="large" count={totalPages} page={pageNumber} onChange={(_e, page) => handlePageChange(page)} />
    </Box>
  )
};

export default AppPagination;
