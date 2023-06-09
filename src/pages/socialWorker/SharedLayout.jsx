import { Header, ProtectedRoute } from "../../components";

const SWSharedLayout = () => {
  return (
    <>
      <Header />
      <ProtectedRoute />
    </>
  );
};

export default SWSharedLayout;
