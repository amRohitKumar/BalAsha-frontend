import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";

const Wrapper = styled(Paper, {
  shouldForwardProp: (prop) => !["bgclr1", "bgclr2", "bgclr3"].includes(prop),
})(({ bgclr1, bgclr2, bgclr3 }) => ({
  // border: "1px solid black",
  width: "400px",
  height: "200px",
  padding: "3em 1em",
  boxShadow: `${bgclr3} 0px 5px 15px`,
  position: "relative",
  overflow: "hidden",
  backgroundColor: bgclr1,
  // backgroundColor: "#5e35b1",
  borderRadius: "1rem",
  color: "white",
  margin: "1em 2em",

  // display: 'flex',

  ".sub-heading": {
    color: bgclr3,
    // color: "#b39ddb",
  },

  ".content": {},

  "&::before": {
    content: '""',
    width: "170px",
    height: "170px",
    top: "-50%",
    right: "5%",
    opacity: "0.5",
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: bgclr2,
  },

  "&::after": {
    content: '""',
    width: "200px",
    height: "200px",
    top: "-40%",
    right: "-25%",
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: bgclr2,
    // backgroundColor: "#4527a0",
  },
}));

export default Wrapper;
