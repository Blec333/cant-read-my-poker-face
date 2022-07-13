import React, { useState, useEffect } from "react";
import { useCasinoContext } from "../utils/GlobalState";

import Auth from "../utils/auth";

import Header from "./Header";
import Footer from "./Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayerBoard from "./pages/PlayerBoard";
import SignUp from "./pages/SignUp";



export default function CasinoContainer() {


  const [currentPage, setCurrentPage] = useState("");


  useEffect(() => {

  },[])
  
  
  const [state, dispatch] = useCasinoContext();


  const renderPage = () => {
    if (currentPage === "Home") {
      return <Home currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Login") {
      return <Login currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "SignUp") {
      return <SignUp currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (currentPage === "Playerboard") {
      return <PlayerBoard currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
    if (Auth.loggedIn()) {
      setCurrentPage("Playerboard");
      return <PlayerBoard currentPage={currentPage} handlePageChange={handlePageChange} />;
    } else {
      setCurrentPage("Home");
      return <Home currentPage={currentPage} handlePageChange={handlePageChange} />;
    }
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
