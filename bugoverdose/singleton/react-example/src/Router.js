import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContextConsumerComponent from "./components/consumer";
import UseContextComponent from "./components/use-context";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/use-context" element={<UseContextComponent />} />
        <Route path="/" element={<ContextConsumerComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
