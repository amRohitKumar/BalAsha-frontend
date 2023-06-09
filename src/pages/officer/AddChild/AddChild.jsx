import { useState, useEffect } from "react";
import { ImageIcon } from "../../../icons";
import Wrapper from "./style";
import toast from "react-hot-toast";
import { CircularLoader } from "../../../components";

import {
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Grid,
  InputLabel,
} from "@mui/material";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/useAuthHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddChild = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.user.user);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("R&D Institute");
  const [gender, setGender] = useState("MALE");
  const [operator, setOperator] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      const response = {
        name: data.get("name"),
        image_url: "",
        dob: data.get("dob"),
        orphanage_name: data.get("orphanage_name"),
        city: data.get("city"),
        state: data.get("state"),
        pin: data.get("pin"),
        orphanage_contact: data.get("orphanage_contact"),
        shelter_home: data.get("shelter_home"),
        gender,
        category,
        admission_reason: data.get("admission_reason"),
        last_visit: data.get("last_visit"),
        guardian: data.get("guardian"),
        place: data.get("place"),
        home_stay: {
          month: data.get("ss_since").split("-")[1],
          year: data.get("ss_since").split("-")[0],
        },
        case_history: data.get("case_history"),
        operator_assigned: operator,
      };

      await customFetch.post("/child/add", response, authHeader(token));
      navigate("/officer");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong while registering child !");
    }
  };
  // const leaderSignRef = useRef();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          "/operator/swlist",
          authHeader(token)
        );
        setList(resp.data.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        toast.error("Something went wrong !");
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <Wrapper sx={{ width: { lg: "75%", md: "80%", sm: "85%", xs: "95%" } }}>
      {/* {isLoading && <CircularLoader />} */}
      <Box>
        <Typography variant="h2" gutterBottom align="center">
          REGISTER NEW CHILD
        </Typography>
        {/* <Typography variant="h5" gutterBottom align="center">
          (Please fill and submit your application to NVCTI office)
        </Typography> */}
      </Box>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          mb: 4,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <Typography>
              <span className="boldTypo">Name of the Applicant </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              name="name"
              type="text"
              required
              fullWidth
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<ImageIcon />}
              sx={{
                color: "#cd366b",
                border: "none",
                "&:hover": {
                  border: "none",
                  backgroundColor: "#d3d2d2",
                },
              }}
            >
              <input
                type="file"
                name="image"
                className="file-input"
                width="100%"
              />
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="gender-select">Gender</InputLabel>
              <Select
                labelId="gender-select"
                id="demo-simple-select"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                fullWidth
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="row-center">
              <Typography sx={{ mr: 2 }}>
                <span className="">Date of Birth </span>
              </Typography>
              <label>
                <input type="date" name="dob" />
              </label>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              name="place"
              type="text"
              fullWidth
              label="Place"
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              type="text"
              name="admission_reason"
              fullWidth
              label="Reason for admission"
              color="primary"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                labelId="category-select"
                id="demo-simple-select"
                name="category"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                fullWidth
              >
                <MenuItem value="ABANDONED">Abandoned</MenuItem>
                <MenuItem value="ORPHAN">Surrendered</MenuItem>
                <MenuItem value="SURRENDERED">Admitted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="row-center">
              <Typography sx={{ mr: 2 }}>
                <span className="">Last visit/ Call </span>
              </Typography>
              <label>
                <input type="date" name="last_visit" />
              </label>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="guardian"
              label="Family Detail"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="case_history"
              label="Case details"
              multiline
              fullWidth
              rows={4}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              type="text"
              name="shelter_home"
              label="Shelter home name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="row-center">
              <Typography sx={{ mr: 2 }}>
                <span className="">Shelter home since </span>
              </Typography>
              <label>
                <input type="month" name="ss_since" />
              </label>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom align="left" sx={{ my: 3 }}>
          Orphanage Details:
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              type="text"
              name="orphanage_name"
              label="Name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              size="small"
              type="text"
              name="orphanage_contact"
              label="Contact Number"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              type="text"
              name="city"
              label="City"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              type="text"
              name="state"
              label="State"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              size="small"
              type="text"
              name="pin"
              label="PIN Code"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom align="left">
              Assign to a social worker :
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth size="small" required>
              <InputLabel id="sw-select">Assign To </InputLabel>
              <Select
                labelId="sw-select"
                id="demo-simple-select"
                name="operator_assigned"
                label="Assign To"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                fullWidth
              >
                {list.map((el, idx) => (
                  <MenuItem key={idx} value={el._id}>
                    {" "}
                    {el.name} 📧 {el.email}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box className="row-center" sx={{ mt: 10 }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
    </Wrapper>
  );
};

export default AddChild;
