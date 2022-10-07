import "./App.css";
import { useEffects } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminPage } from "./components/Admin/AdminPage";

const App = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
