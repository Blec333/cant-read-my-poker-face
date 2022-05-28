import React from "react";
import PortfolioContainer from "./components/PortfolioContainer";

const App = () => <PortfolioContainer />;

const socket = io("ws://localhost:8080");

socket.on("message", (text) => {
  const el = document.createElement("li");
  el.innerHTML = text;
  document.querySelector("ul").appendChild(el);
});

document.querySelector("button").onclick = () => {
  const text = document.querySelector("input").value;
  socket.emit("message", text);
};
export default App;
