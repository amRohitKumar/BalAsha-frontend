import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Toaster } from 'react-hot-toast';
import { theme } from "./theme";
import "./App.css";

import {
  OfficerHome,
  OfficerDashboard,
  Home,
  LogIn,
  Register,
  AuthSharedLayout,
  SWSharedLayout,
  SWHome,
  OfficerSharedLayout,
  Process,
  ChildProfile,
  AddChild
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Toaster /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/childprofile" element={<ChildProfile />} />
          
          <Route element={<AuthSharedLayout />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/sw" element={<SWSharedLayout />}>
            <Route index element={<SWHome />} />
            <Route path="process" element={<Process />} />
          </Route>
          <Route path="/officer" element={<OfficerSharedLayout />}>
            <Route index element={<OfficerHome />} />
            <Route path="cases" element={<OfficerDashboard />} />
            <Route path="add" element={<AddChild />} />
            <Route path="process" element={<Process />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
