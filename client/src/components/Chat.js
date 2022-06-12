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

  // const ENDPOINT = "http://localhost:3001";
  // const socket = io(ENDPOINT);
  // socket.on("connect_error",(e:any)=>{
  //   console.log(e);
  // });


  useEffect(() => {
     socket = io("http://localhost:3001/", {
  transports: ["websocket"]
});
    // socket = io("http://localhost:3001/",{
    //   withCredentials: true,
    //   transportOptions: {
    //     polling: {
    //       extraHeaders: {
    //         "my-custom-header": "abcde"
    //     }
    //   }
    // }
    // });
    setRoom(roomId);
    setName(playerName);
    socket.emit("join", {playerName, roomId});
    socket.on("time", () => {
      console.log("timed ping");
    });
  }, []);

  useEffect(() => {
    socket.on("message", (user, messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
  }, []);

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
    <div className="flex flex-col justify-end border" style={{height: '20vw'}}>
      <ul className="scroll-smooth hover:scroll-auto">
      {messages.map((iMessage) => {
        return (
          <li>
            {iMessage}
          </li>
        );
      })}
      </ul>
      <form className="border" action="" onSubmit={handleSubmit}>
        <input className="border bg-neutral text-neutral-content"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input className="border bg-secondary text-secondary-content" type="submit" />
      </form>
    </div>
  );
};
export default Chat;
