import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StateConsumerComponent from "./components/consumer";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StateConsumerComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
