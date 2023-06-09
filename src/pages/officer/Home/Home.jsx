import { Box, Typography } from "@mui/material";
import Wrapper from "./style";
import { Card } from "../../../components";
import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/useAuthHeader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { CircularLoader } from "../../../components";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OfficerHome = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.user.user);
  const cardsProp = [
    {
      bgclr1: "#5e35b1",
      bgclr2: "#4527a0",
      bgclr3: "#b39ddb",
      text: "pending cases",
    },
    {
      bgclr1: "#1e88e5",
      bgclr2: "#1565c0",
      bgclr3: "#90caf9",
      text: "completed cases",
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          "/operator/getstats",
          authHeader(token)
        );
        const { data1, data2, completeNumber, incompleteCasesNumber } =
          resp.data;
        setData({ data1, data2, incompleteCasesNumber, completeNumber });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
        toast.error("Something went wrong while fetching stats !");
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <CircularLoader />;
  }

  const dataPie = {
    labels: data.data1 ? data.data1.map((el) => el.name) : [],
    datasets: [
      {
        label: "# of cases",
        data: data.data1 ? data.data1.map((el) => el.value) : [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: data.data2 ? data.data2.map((el) => el._id) : [],
    datasets: [
      {
        data: data.data2 ? data.data2.map((el) => el.count) : [],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Category VS Child",
      },
    },
  };

  const optionsPie = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cases VS Step",
      },
    },
  };

  return (
    <Wrapper>
      <Box className="align-horizontal">
        <Card {...cardsProp[0]} title={data.incompleteCasesNumber} />
        <Card {...cardsProp[1]} title={data.completeNumber} />
      </Box>
      <Typography variant="h3">STATS</Typography>
      <Box
        className="align-horizontal"
        sx={{
          mb: "5em",
          alignItems: "baseline",
          "@media (max-width: 600px)": { flexDirection: "column" },
          width: "100%",
        }}
      >
        <Box className="align-vertical charts">
          <Pie data={dataPie} options={optionsPie} />
        </Box>
        <Box className="align-vertical charts">
          <Bar options={optionsBar} data={dataBar} />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default OfficerHome;
