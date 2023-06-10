import { useState } from "react";
import customFetch from "../../../utils/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveUser } from "../../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  PersonIcon,
  EmailIcon,
  LockOutlinedIcon,
  NoEncryptionIcon,
  PhoneIcon,
  LocationOnIcon,
} from "../../../icons";

export default function Register() {
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const response = {
        name: data.get("fullname"),
        email: data.get("email"),
        password: data.get("password"),
        phone_number: data.get("phone_number"),
        address: data.get("address"),
        role: role,
      };
      // console.log(response);
      const resp = await customFetch.post("/auth/register", response);
      // console.log(resp);
      dispatch(saveUser(resp.data.user));
      toast.success("User registered successfully !");
      if (response.role === "SOCIAL_WORKER") {
        navigate("/sw");
      } else if (response.role === "MANAGER") {
        navigate("/officer");
      }
    } catch (e) {
      toast.error(e.response.data.msg);
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ textTransform: "uppercase" }}
          >
            register to Bal Asha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="fullname"
                  type="text"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  color="secondary"
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NoEncryptionIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="phone_number"
                  type="tel"
                  required
                  fullWidth
                  id="phone_number"
                  label="Phone Number"
                  color="secondary"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  name="address"
                  type="text"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  color="secondary"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" required>
                  <InputLabel id="select-role-label">Role</InputLabel>
                  <Select
                    color="secondary"
                    labelId="select-role-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    name="role"
                    onChange={handleChange}
                  >
                    <MenuItem value="SOCIAL_WORKER">Social Worker</MenuItem>
                    <MenuItem value="MANAGER">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 1, mb: 1 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
