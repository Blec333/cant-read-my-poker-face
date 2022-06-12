import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PlayerBoard from "./pages/PlayerBoard";
import SignUp from "./pages/SignUp";
import { useCasinoContext } from "../utils/GlobalState";
import PasswordPrompt from "inquirer/lib/prompts/password";

export default function CasinoContainer(props) {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("Home");
  const [state, dispatch] = useCasinoContext();
  const passedPage = location?.passedPage;

  console.log(passedPage);

  if (passedPage === "Login") {
    setCurrentPage("Login");
    renderPage();
    console.log("activated");
  }

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
