import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
          backgroundColor: "primary",
        }}
      >
        <Typography variant="h3" style={{ color: "gray" }}>
          Oops - we could not find what you are looking for
        </Typography>
      </Box>
      <Divider/>
      <Button fullWidth component={Link} to="/catalog">Go back to shop</Button>
    </>
  );
}

export default NotFound;
