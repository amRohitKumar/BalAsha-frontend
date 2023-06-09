import { Box, Typography } from "@mui/material";
import Wrapper from "./style";

const Card = ({ bgclr1, bgclr2, bgclr3, title, text }) => {
  return (
    <Wrapper bgclr1={bgclr1} bgclr2={bgclr2} bgclr3={bgclr3}>
      <Box className="content">
        <Typography variant="h2" align="center">
          {title.toString().toUpperCase()}
        </Typography>
        <Typography variant="h5" align="center" className="sub-heading" sx={{textTransform: 'capitalize'}}>
          {text}
        </Typography>
      </Box>
    </Wrapper>
  );
};

export default Card;
