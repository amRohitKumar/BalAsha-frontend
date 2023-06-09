import Wrapper from "./style";
import { Card } from "../../../components";

const OfficerHome = () => {
  const cardsProp = [
    {
      bgclr1: "#5e35b1",
      bgclr2: "#4527a0",
      bgclr3: "#b39ddb",
      title: "5000",
      text: "pending cases",
    },
    {
      bgclr1: "#1e88e5",
      bgclr2: "#1565c0",
      bgclr3: "#90caf9",
      title: "5000",
      text: "completed cases",
    },
  ];
  return (
    <Wrapper>
      <Card {...cardsProp[0]} />;
      <Card {...cardsProp[1]} />;
    </Wrapper>
  );
};

export default OfficerHome;
