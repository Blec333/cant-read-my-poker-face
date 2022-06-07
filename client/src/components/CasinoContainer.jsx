import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import PlayerBoard from "./pages/PlayerBoard";
import SignUp from "./pages/SignUp";

export default function CasinoContainer() {
  const [currentPage, setCurrentPage] = useState("LandingPage");

  const renderPage = () => {
    if (currentPage === "LandingPage") {
      return <LandingPage />;
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

  // return (
  //   <div>
  //     <Header currentPage={currentPage} handlePageChange={handlePageChange} />
  //     {renderPage()}
  //     <Footer />
  //   </div>
  // );
}
