import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularLoader, ProcessStep } from "../../../components";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ProcessBox } from "./style";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/useAuthHeader";
import { useSelector } from "react-redux";

const Process = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const childId = state.childId;
  const { token } = useSelector((state) => state.user.user);
  const [process, setProcess] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = async () => {
    try {
      await customFetch.get(`/operator/final/${childId}`, authHeader(token));
      toast.success("Child marked successfully !");
      navigate("/sw");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong ! " + e.response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/child/${childId}`,
          authHeader(token)
        );

        setProcess(resp.data.data.process);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e.response);
        toast.error(
          "Something gone wrong while fetching data ! Please try again"
        );
      }
    };
    fetchData();
  }, [token,childId]);

  if(loading){
    return <CircularLoader />
  }
  
  return (
    <ProcessBox sx={{ px: { xs: "1em", md: "2em", lg: "5em" } }}>
      {!loading && (
        <Stepper activeStep={activeStep} orientation="vertical">
          {process.map((step, index) => (
            <Step key={step.name}>
              <StepLabel
                optional={
                  index === process.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                <Typography variant={activeStep === index ? "h5" : "h6"}>
                  {step.name}
                </Typography>
              </StepLabel>
              <StepContent>
                {/* <Typography>{step.description}</Typography> */}
                {/* ADD MORE STEPS */}
                {step.process_list.map((subStep, idx) => (
                  <ProcessStep
                    key={idx}
                    {...subStep._process}
                    startDate={subStep.start_date}
                    endDate={subStep.end_date}
                    isCompleted={subStep.is_completed}
                    response={subStep.response}
                    fileUrl={subStep.url}
                    processId={step._id}
                    stepId={subStep._id}
                    childId={childId}
                    setProcess={setProcess}
                  />
                ))}
                <Box
                  sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <div>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        backgroundColor: "#b5b2b2",
                        "&:hover": { backgroundColor: "#dcdada" },
                      }}
                    >
                      Back
                    </Button>
                    {index !== process.length - 1 ? (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        sx={{ mt: 1, mr: 1 }}
                        onClick={handleFinish}
                      >
                        Finish
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </ProcessBox>
  );
};

export default Process;
