import {
  Box,
  Divider,
  Typography,
  TextField,
  Button,
  Collapse,
} from "@mui/material";
import { Download, CalendarMonthIcon, SendIcon } from "../../icons";
import moment from "moment/moment";
import { StepBox } from "./style";
import { useState } from "react";
import customFetch from "../../utils/axios";
import authHeader from "../../utils/useAuthHeader";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { FileOpenIcon } from "../../icons";
import IconButton from "@mui/material/IconButton";
import "react-datepicker/dist/react-datepicker.css";

const ProcessStep = ({
  name,
  description,
  startDate,
  endDate,
  isCompleted,
  response,
  fileUrl,
  processId,
  childId,
  stepId,
  fetchData,
}) => {
  console.log(startDate, endDate);
  const [view, setView] = useState(!isCompleted);
  const [value, setValue] = useState(response);
  const [url, setUrl] = useState(fileUrl);
  const { token, role } = useSelector((store) => store.user.user);
  const [newDate, setNewDate] = useState([
    new Date(startDate),
    new Date(endDate),
  ]);

  const handleDate = (e, idx) => {
    const n = [...newDate];
    n[idx] = e;
    setNewDate(n);
  };

  const handleImage = async (e) => {
    setUrl(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      let URL = "/operator";
      let header = {};
      const formData = new FormData();
      if (role === "MANAGER") {
        URL = URL + `/updatetime/${childId}/${processId}/${stepId}`;
        formData.append("start_date", newDate[0]);
        formData.append("end_date", newDate[1]);
        header = authHeader(token);
      } else {
        URL = URL + `/update/${childId}/${processId}/${stepId}`;
        formData.append("documents", url);
        formData.append("response", value);
        header = {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
      }
      await customFetch.patch(URL, formData, header);
      setValue("");
      setUrl("");
      fetchData();
      toast.success("Fields updated successfully");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong !");
    }
  };

  return (
    <StepBox elevation={3} isCompleted={isCompleted}>
      <Typography
        variant="h5"
        sx={{ color: "#cd366b", cursor: "pointer" }}
        onClick={() => setView(!view)}
      >
        {name}
      </Typography>
      <Collapse in={!isCompleted || view} timeout="auto">
        <Typography>{description}</Typography>
        <Divider sx={{ mb: "1em" }} />
        <TextField
          label="Description"
          placeholder="Description (if required)"
          multiline
          fullWidth
          variant="standard"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Box className="align-between">
          <Box>
            <Button
              size="small"
              className="button-grp1"
              startIcon={<CalendarMonthIcon />}
              disabled={role !== "MANAGER"}
            >
              {role === "MANAGER" ? (
                <>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={newDate[0]}
                    onChange={(date) => handleDate(date, 0)}
                  />
                </>
              ) : (
                <>Start : {moment(startDate).format("MMMM Do YYYY")}</>
              )}
            </Button>
            <Button
              size="small"
              className="button-grp1"
              startIcon={<CalendarMonthIcon />}
              disabled={role !== "MANAGER"}
            >
              {role === "MANAGER" ? (
                <>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={newDate[1]}
                    onChange={(date) => handleDate(date, 1)}
                  />
                </>
              ) : (
                <>End : {moment(endDate).format("MMMM Do YYYY")}</>
              )}
            </Button>
            {url ? (
              <IconButton
                size="small"
                className="button-grp1"
                aria-label="Open file"
                LinkComponent="a"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                <FileOpenIcon />
              </IconButton>
            ) : (
              <>
                {role === "SOCIAL_WORKER" && (
                  <label htmlFor="contained-button-file" className="">
                    <input
                      accept="image/png, image/jpg, image/jpeg, application/pdf"
                      id="contained-button-file"
                      type="file"
                      onChange={handleImage}
                    />
                  </label>
                )}
              </>
            )}
          </Box>
          <Button
            size="small"
            sx={{
              backgroundColor: "#69bf64",
              "&:hover": { color: "#d1d0d0", backgroundColor: "#379a31" },
              mr: 3,
              mt: 1,
            }}
            onClick={handleSubmit}
            startIcon={<SendIcon />}
          >
            {role === "MANAGER" ? "Done" : "Submit"}
          </Button>
        </Box>
      </Collapse>
    </StepBox>
  );
};

export default ProcessStep;
