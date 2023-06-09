import styled from "@emotion/styled";
import Box from "@mui/material/Box";

const Wrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "2em",

  ".charts": {
    width: "40%",
    height: "400px",

    "@media (max-width: 600px)": {
      width: "100%",
      flexDirection: "column",
    },
  },
});

export default Wrapper;
