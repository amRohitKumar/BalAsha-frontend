import { Header, ProtectedOfficerRoute } from "../../components";

const OfficerSharedLayout = () => {
  return (
    <>
      <Header />
      <ProtectedOfficerRoute />
    </>
  );
};

export default OfficerSharedLayout;
