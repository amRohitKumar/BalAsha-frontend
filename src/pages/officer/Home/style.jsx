import styled from "@emotion/styled";
import Box from "@mui/material/Box";


const Wrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  
  ".align-horizontal": {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ".align-vertical": {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
});

export default Wrapper;