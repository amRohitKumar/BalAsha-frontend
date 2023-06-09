import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logoutUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import Logo from "../logo/logo";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { role, name } = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const currPath = location.pathname;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(logoutUser());
    navigate("/");
    toast.success("User logged out successfully !");
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (!name) name = "B";
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: "flex", fontSize: "large" }}>
            <Logo />
            {role === "MANAGER" && (
              <Box
                className="align-horizontal"
                sx={{ color: "white", gap: "1em", ml: "1em" }}
              >
                {currPath !== "/officer" && (
                  <Button
                    onClick={() => navigate("/officer")}
                    className="hover-effect"
                  >
                    Dashboard
                  </Button>
                )}
                {currPath !== "/officer/add" && (
                  <Button
                    // size="small"
                    onClick={() => navigate("/officer/add")}
                    className="hover-effect"
                  >
                    Add Child
                  </Button>
                )}
                {currPath !== "/officer/cases" && (
                  <Button
                    onClick={() => navigate("/officer/cases")}
                    className="hover-effect"
                  >
                    View List
                  </Button>
                )}
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(name)} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout} sx={{ minWidth: "150px" }}>
                <Typography textAlign="left">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
