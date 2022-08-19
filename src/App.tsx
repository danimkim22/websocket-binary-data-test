import React, { useState } from "react";
import "./App.css";
import { sendPacket } from "./utils";

function App() {
  const [message, setMessage] = useState("");

  let pktname = "EnterGame";

  const dummyData = {
    Playerid: "user001",
    CurrentMap: "nowhere",
  };

  const onConnectClick = () => {
    let socket = new WebSocket(process.env.REACT_APP_SERVER_URL);
    const byteArray = sendPacket(pktname, dummyData);
    socket.onopen = function () {
      setMessage("[open] 커넥션이 만들어졌습니다.");
      console.log("byteArray", byteArray);
      socket.send(byteArray);
    };
    socket.onerror = () => alert(`연결 실패`);
  };

  return (
    <div className="App">
      <button type="button" onClick={onConnectClick}>
        Connect
      </button>
      <p id="messages">{message}</p>
    </div>
  );
}

export default App;
