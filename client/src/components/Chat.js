import React, { useState, useEffect } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
var cors = require("cors");

let socket;

const Chat = (props) => {
  let playerName = props.playerName
  let roomId = props.roomId

  const [statePlayerName, setName] = useState("");
  const [stateRoomId, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "http://localhost:3001";
  // const socket = io(ENDPOINT);
  // socket.on("connect_error",(e:any)=>{
  //   console.log(e);
  // });
    socket = io(ENDPOINT, {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });


  useEffect(() => {
    setRoom(roomId);
    setName(playerName);
    socket.emit("join", { playerName, roomId });
    console.log("attempted emit of: " + playerName + " & " + roomId)
    socket.on("time", () => {
      console.log("timed ping");
    });
  }, []);

  useEffect(() => {
    socket.on("welcome", (user, messages) => {
      setMessages(messages);
    });
  }, []);

  // useEffect(() => {
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      setMessage("dummy message")
      let messageArray = messages;
      messageArray.push(message);
      setMessages(messageArray);
      setMessage("");
    } else {
      let messageArray = messages;
      messageArray.push(message);
      setMessages(messageArray);
      setMessage("");
    }
    socket.emit("sendMessage", { playerName, roomId, messages });
  };

  return (
    <div className="flex flex-col justify-end border m-0 p-0" style={{ height: '25.2755vw' }}>
      <ul className="scroll-smooth hover:scroll-auto m-0 p-0">
        {messages.map((iMessage, i) => {
          return (
            <li key={i}>
              {iMessage}
            </li>
          );
        })}
      </ul>
      <form className="flex border m-0 p-0" action="" onSubmit={handleSubmit}>
        <input className="border bg-neutral text-neutral-content h-full items-end" style={{ width: '15vw' }}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input className="btn rounded-box glass border bg-secondary w-auto text-secondary-content m-0 p-0" type="submit" />
      </form>
    </div>
  );
};
export default Chat;
