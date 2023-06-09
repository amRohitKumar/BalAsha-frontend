import { Box, Typography, Button } from "@mui/material";
import { HomeBox } from "./style.jsx";
import LogoImg from "../../assets/logo2.png";
import { useNavigate } from "react-router-dom";
import "./style.jsx";

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeBox>
      <Box className="home-container">
        <img src={LogoImg} alt="BalAsha" className="logo-img" />
        <Typography className="subheading" align="center">
          Finding forever adoptive families for children
        </Typography>
        <Box>
          <Button
            className="btn"
            size="small"
            onClick={() => navigate("/login")}
          >
            Sign-In
          </Button>
          <Button
            className="btn"
            size="small"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Box>
    </HomeBox>
  );
};

export default Home;
