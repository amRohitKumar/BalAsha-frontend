import { useEffect, useState } from "react";
import { Typography, TextField, InputAdornment } from "@mui/material";
import { SearchIcon } from "../../../icons";
import { HomeBox } from "./style";
import { CircularLoader, SWChildTable } from "../../../components";
import customFetch from "../../../utils/axios";
import { useSelector } from "react-redux";
import authHeader from "../../../utils/useAuthHeader";
import toast from "react-hot-toast";

const SWHome = () => {
  const [list, setList] = useState("");
  const [loading, setLoading] = useState(true);
  const { id: userId, token } = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resp = await customFetch.get(
          `/child/list/${userId}?status=process`,
          authHeader(token)
        );

        setList(resp.data.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        toast.error(e.response.data.msg);
      }
    };
    fetchData();
  }, [token,userId]);

  if(loading){
    return <CircularLoader />
  }

  return (
    <HomeBox>
      <Typography variant="h2" sx={{ mb: 2 }}>
        ALLOCATED CASES
      </Typography>
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
      {!loading && <SWChildTable list={list} />}
    </HomeBox>
  );
};

export default SWHome;
