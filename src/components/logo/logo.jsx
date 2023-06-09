import LogoImg from "../../assets/logo_transparent.png";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{p: 2}}>
      <img src={LogoImg} alt="BalAsha" width="150px" />
    </Box>
  );
};

export default Logo;