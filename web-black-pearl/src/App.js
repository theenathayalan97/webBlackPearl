import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Map from "./pages/Map";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box>
      <Router>
        {" "}
        {/* Wrap everything with Router */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;
