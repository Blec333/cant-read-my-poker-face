import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import PlayerBoard from "./pages/PlayerBoard";
import PokerTable from "./pages/PokerTable";
import SignUp from "./pages/SignUp";

export default function PortfolioContainer() {
  const [currentPage, setCurrentPage] = useState("Home");

  // TODO: Add a comment describing the functionality of this method
  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home />;
    }
    if (currentPage === "Login") {
      return <Login />;
    }
    if (currentPage === "LandingPage") {
      return <LandingPage />;
    }
    if (currentPage === "PokerTable") {
      return <PokerTable />;
    }
    if (currentPage === "SignUp") {
      return <SignUp />;
    }
    return <PlayerBoard />;
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      {/* // TODO: Add a comment describing what we are passing as props */}
      <NavTabs currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* // TODO: Add a comment explaining what is happening on the following line */}
      {renderPage()}
    </div>
  );
}
