import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayerBoard from "./pages/PlayerBoard";
import SignUp from "./pages/SignUp";
import { useCasinoContext } from "../utils/GlobalState";

export default function CasinoContainer() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [state, dispatch] = useCasinoContext();



  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Login") {
      return <Login />;
    }
    if (currentPage === "SignUp") {
      return <SignUp />;
    }
    return <PlayerBoard />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="m-0 p-0">
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}
