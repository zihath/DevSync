import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/public-layout";
import HomePage from "./routes/HomePage";
import SingInPage from "./routes/SingInPage";
import SingUpPage from "./routes/SingUpPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import LiveCodeDashboard from "./pages/LiveCodeDashboard";
import LiveCodeWrapper from "./Editor/LiveCodeWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SingInPage />} />
        <Route path="/sign-up" element={<SingUpPage />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />}></Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/live-code" element={<LiveCodeDashboard />} />
          <Route path="/live-code/:roomId" element={<LiveCodeWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
