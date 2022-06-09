import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayerBoard from "./pages/PlayerBoard";
import SignUp from "./pages/SignUp";

export default function CasinoContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
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
    <div>
      <Header currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderPage()}
      <Footer />
    </div>
  );
}
