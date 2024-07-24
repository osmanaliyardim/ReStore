import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { CounterState } from "./counterReducer";

const ContactPage = () => {
  const {data, title} = useSelector((state: CounterState) => state);

  return (
    <>
      <Typography variant="h2">
        {title}
      </Typography>
      <Typography variant="h5">
        The data is: {data}
      </Typography>
    </>
  )
};

export default ContactPage;