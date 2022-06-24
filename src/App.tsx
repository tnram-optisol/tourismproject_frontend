import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import MyRoutes from "./routes/routes";
import "./App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <section>
        <Router>
          <MyRoutes />
        </Router>
      </section>
    </>
  );
}

export default App;
