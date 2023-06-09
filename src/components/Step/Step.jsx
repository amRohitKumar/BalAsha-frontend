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
  setProcess,
}) => {
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

  const handleSubmit = async () => {
    // console.log(childId, processId, stepId);
    try{
      let URL = "/operator";
      let obj = {};
      if (role === "MANAGER") {
        URL = URL + `/updatetime/${childId}/${processId}/${stepId}`;
        obj = { start_date: newDate[0], end_date: newDate[1] };
      } else {
        URL = URL + `/update/${childId}/${processId}/${stepId}`;
        obj = { response: value, url };
      }
      const resp = await customFetch.patch(URL, obj, authHeader(token));
      console.log("after change = ", resp.data.data.process);
      setProcess(resp.data.data.process);
      toast.success("Fields updated successfully");
    } catch(e){
      console.log(e);
      toast.error("Something went wrong !");
    }
  };
  return (
    <StepBox elevation={3} isCompleted={isCompleted}>
      <Typography
        variant="h5"
        sx={{ color: "#cd366b" }}
        onClick={() => setView(!view)}
      >
        {name}
      </Typography>
      <Collapse in={!isCompleted || view} timeout="auto">
        <Typography>{description}</Typography>
        <Divider sx={{ mb: "1em" }} />
        <TextField
          label="Description"
          placeholder="ddd"
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
            {role === "SOCIAL_WORKER" && (
              <Button
                className="button-grp1"
                size="small"
                startIcon={<Download />}
              >
                <label htmlFor="contained-button-file" className="">
                  <input
                    // value={value}
                    // accept={accept}
                    // disabled={disabled}
                    style={{ display: "none" }}
                    id="contained-button-file"
                    type="file"
                    // onChange={disabled ? () => {} : onChange}
                  />
                  Add file
                </label>
              </Button>
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
