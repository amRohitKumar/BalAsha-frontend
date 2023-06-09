import styled from "@emotion/styled";
import { Box } from "@mui/material";
import BGImg from "../../assets/background.png";

export const HomeBox = styled(Box)({
  display: "flex",
  minHeight: "100vh",
  minWidth: "100vw",
  position: "relative",
  backgroundColor: "#00222C6E",
  opacity: 1,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BGImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  textShadow: "0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)",
  boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 0.5)",

  ".subheading": {
    color: "white",
    fontSize: "2em",
    letterSpacing: "1.5px",
    width: "100%",
    fontStyle: 'italic',
    fontWeight: 'bold',
  },

  ".home-container": {
    // border: "1px solid red",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "15em",
    alignItems: "center",
  },

  ".logo-img": {
    width: '450px',
    "@media (max-width: 400px)": {
      width: "250px",
    }
  },

  ".btn": {
    fontSize: "1.2em",
    backgroundColor: '#a3a3a36f',
    marginRight: "1em",
    "&:hover": {
      backgroundColor: '#9b9b9b79',
    }
  }
});
