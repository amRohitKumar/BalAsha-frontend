import styled from "@emotion/styled";
import { Box } from "@mui/material";
import BGImage from "../../../assets/background.png";

export const ChildBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  boxShadow: `var(--shadow-2)`,

  ".banner": {
    width: "100%",
    position: "relative",

    ".img-banner": {
      backgroundImage: `url(${BGImage})`,
      width: "100%",
      height: "400px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",

      "&::before": {
        position: "absolute",
        width: "100%",
        height: "100%",
        content: '""',
        backgroundColor: "rgba(54, 39, 64, 0.79)",
        boxShadow: "5px",
      },
    },
    ".child-info": {
      display: "flex",
      gap: "2em",
      alignItems: "center",
      color: "white",
      position: "absolute",
      bottom: "15%",
      left: "5%",
      ".child-img-tag": {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        boxShadow: "rgba(156, 156, 156, 0.35) 0px 5px 15px",
      },
    },
  },

  ".child-details": {
    margin: "2em 1em",

    ".tableHeading": {
      backgroundColor: "#F5A962",
      color: "white",
      fontSize: "1rem",
    },

    ".DetailsClass": {
      backgroundColor: "#f5f4f4",
      border: "1px solid #eaeaea7c",
    },
    ".tableValues": {
      border: "1px solid #e4e4e47d",
      backgroundColor: "rgb(255, 252, 245)",
    },
  },
});
