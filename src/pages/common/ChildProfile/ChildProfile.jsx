import { Paper, Box, Typography, Chip } from "@mui/material";
import { ChildBox } from "./style";
import BGImage from "../../../assets/background.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import customFetch from "../../../utils/axios";
import authHeader from "../../../utils/useAuthHeader";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import moment from "moment";
import { Table } from "antd";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { detalilsColumn, orphanageColumns, createColumns, createRows } from "./form";
import { CircularLoader } from "../../../components";

const ChildProfile = () => {
  const { state } = useLocation();
  const { token } = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [details, setDetails] = useState();
  const [links, setLinks] = useState();
  const { childId } = state;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/child/complete/${childId}`,
          authHeader(token)
        );
        setData(resp.data.data);
        setLinks(resp.data.links);
        setDetails(resp.data.details);
        setLoading(false);
        // console.log(resp.data.data);
        // console.log(resp.data.links);
      } catch (e) {
        setLoading(false);
        console.log(e);
        toast.error("Something went wrong while fetching child info !");
      }
    };
    fetchData();
  }, [token, childId]);

  const table_data = data
    ? [
        {
          key: 1,
          details: "Name",
          value: data?.name,
        },
        {
          key: 2,
          details: "Date of Birth",
          value: data?.dob,
        },
        {
          key: 3,
          details: "Shelter Home",
          value: data?.shelter_home,
        },
        {
          key: 4,
          details: "Category",
          value: data?.category,
        },
        {
          key: 5,
          details: "Admission Reason",
          value: data?.admission_reason,
        },
        {
          key: 6,
          details: "guardian",
          value: data?.guardian,
        },
        {
          key: 7,
          details: "Last visit",
          value: data?.last_visit,
        },
        {
          key: 8,
          details: "Home visite",
          value:
            data?.home_stay?.year + "years " + data.home_stay?.month + "months",
        },
        {
          key: 9,
          details: "Case history",
          value: data.case_history,
        },
        {
          key: 10,
          details: "Is completed",
          value: data.is_done,
        },
        {
          key: 11,
          details: "Social Worker appointer",
          value: data.operator_assigned.name,
        },
        {
          key: 12,
          details: "Entry date",
          value: data.entry_date,
        },
      ]
    : [];

  const orphanage_data = data
    ? [
        {
          key: 1,
          details: "Name",
          value: data.orphanage?.name,
        },
        {
          key: 2,
          details: "City",
          value: data.orphanage?.address?.city,
        },
        {
          key: 2,
          details: "State",
          value: data.orphanage?.address?.state,
        },
        {
          key: 2,
          details: "PIN",
          value: data.orphanage?.address?.pin,
        },
        {
          key: 3,
          details: "Contact Number",
          value: data.orphanage?.contact_number,
        },
      ]
    : [];

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <ChildBox minHeight="100vh">
      <Paper
        sx={{
          width: { xs: "95%", md: "70%" },
          my: "2em",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Box className="banner">
          <Box className="img-banner" />
          <Box className="child-info">
            <img
              src={data.image_url || BGImage}
              alt="Child"
              className="child-img-tag"
            />
            <Box>
              <Typography variant="h4">{data.name}</Typography>
              <Typography variant="h6">
                Date of Birth: {moment(data.dob).format("MMM Do YY")}
              </Typography>
              <Typography variant="h6">Category: {data.category}</Typography>
              <Typography variant="h6">
                Shelter Home: {data.shelter_home}{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="child-details">
          <Table
            bordered={true}
            pagination={false}
            columns={detalilsColumn}
            dataSource={table_data}
          />
        </Box>
        <Box className="child-details">
          <Table
            bordered={true}
            pagination={false}
            columns={orphanageColumns}
            dataSource={orphanage_data}
          />
        </Box>
        {Object.entries(details).map(([key, val], i) => (
          <Box className="child-details" key={i}>
            <Table
              bordered={true}
              pagination={false}
              columns={createColumns(key)}
              dataSource={createRows(val)}
            />
          </Box>
        ))}
        <Paper sx={{ m: 2, p: 2 }} elevation={10}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Documents
          </Typography>
          {links.map((el, idx) => (
            <Chip
              key={idx}
              component="a"
              sx={{ py: 2, m: 1 }}
              icon={<PictureAsPdfIcon />}
              label={el.name}
              href={el.url}
              target="_blank"
            />
          ))}
        </Paper>
      </Paper>
    </ChildBox>
  );
};

export default ChildProfile;
