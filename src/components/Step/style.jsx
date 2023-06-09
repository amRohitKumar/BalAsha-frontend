import styled from "@emotion/styled";
import { Paper } from "@mui/material";

export const StepBox = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isCompleted",
})(({ isCompleted }) => ({
  border: `1px solid ${isCompleted ? "#54b925aa" : "#bababa9f"}`,
  backgroundColor: `${isCompleted ? "#cef5bb35" : "#bababa1f"}`,
  padding: "1em 2em",
  margin: "1.5em 0",
  ".button-grp1": {
    backgroundColor: "#f4f2f2",
    color: "#000 !important",
    margin: "1em 2em 0 0",
  },
  ".align-between": {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));
