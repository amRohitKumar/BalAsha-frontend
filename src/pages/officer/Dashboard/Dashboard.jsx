import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ManagerChildTable } from "../../../components";
import customFetch from "../../../utils/axios";
import { useSelector } from "react-redux";
import authHeader from "../../../utils/useAuthHeader";
import { SearchIcon } from "../../../icons";
import toast from "react-hot-toast";

const OfficerDashboard = () => {
  const [list, setList] = useState("");
  const [type, setType] = useState("process");
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.user.user);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/child/list?status=${type}`,
          authHeader(token)
        );
        setList(resp.data.data);
        console.log(list);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(e.response.data.msg);
      }
    };
    fetchData();
  }, [type, token]);

  const CSVDownload = async () => {
    const resp = await customFetch.get(
      `/child/getcsv?filter=${type}`,
      authHeader(token)
    );
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "BalAshaChildren.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FormControl variant="standard" sx={{ m: 1, mb: 5, minWidth: 350 }}>
          <InputLabel id="type_select" sx={{ fontSize: "larger" }}>
            Select cases :
          </InputLabel>
          <Select
            labelId="type_select"
            value={type}
            onChange={handleChange}
            label="filter"
          >
            <MenuItem value="process">Pending</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Search by child name"
          variant="outlined"
          sx={{ minWidth: 500 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {!loading && (
          <ManagerChildTable list={list} CSVDownload={CSVDownload} />
        )}
      </Box>
    </>
  );
};

export default OfficerDashboard;
