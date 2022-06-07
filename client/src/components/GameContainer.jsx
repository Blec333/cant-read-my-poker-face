// import React from 'react';
// import { useState } from 'react';
// import Header from "./Header";
// import Footer from "./Footer";
// import Login from "./pages/Login";
// import PlayerBoard from "./pages/PlayerBoard";
// import PokerTable from './pages/PokerTable';
// import SignUp from "./pages/SignUp";

// export default function GameContainer() {
//   const [currentPage, setCurrentPage] = useState("PokerTable");

//   const renderPage = () => {
//     if (currentPage === "PokerTable") {
//       return <PokerTable />;
//     }
//     if (currentPage === "Login") {
//       return <Login />;
//     }
//     if (currentPage === "SignUp") {
//       return <SignUp />;
//     }
//     return <PokerTable />;
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <div>
//       <Header currentPage={currentPage} handlePageChange={handlePageChange} />
//       {renderPage()}
//       <Footer />
//     </div>
//   );
// }