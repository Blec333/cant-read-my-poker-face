import React, { useState } from "react";
import NavTabs from "./NavTabs";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";

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
    if (currentPage === "Blog") {
      return <Blog />;
    }
    return <Profile />;
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
