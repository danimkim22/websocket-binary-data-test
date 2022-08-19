import React, { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  function sendPacket(packetName: string, data: any) {
    const headerSizeBytes = 4; // packetname size 2byte + data size 2byte
    const stringifiedData = JSON.stringify(data);

    const encoder = new TextEncoder();
    const packetNameUint8Arr = encoder.encode(packetName);
    const dataUint8Arr = encoder.encode(stringifiedData);
    const pktNameLength = packetNameUint8Arr.length;
    const dataLength = dataUint8Arr.length;

    const arrayBufferLength = headerSizeBytes + pktNameLength + dataLength;
    const byteArray = new ArrayBuffer(arrayBufferLength);
    let uintArray = new Uint8Array(byteArray);

    uintArray[0] = pktNameLength;
    uintArray[1] = pktNameLength >> 8;
    uintArray[2] = dataLength;
    uintArray[3] = dataLength >> 8;

    for (let i = 0; i < pktNameLength; i++) {
      uintArray[headerSizeBytes + i] = packetNameUint8Arr.at(i);
    }

    for (let i = 0; i < dataLength; i++) {
      uintArray[headerSizeBytes + pktNameLength + i] = dataUint8Arr.at(i);
    }
    return uintArray;
  }

  let pktname = "EnterGame";

  const dummyData = {
    Playerid: "testuser",
    CurrentMap: "main",
  };

  const onConnectClick = () => {
    let socket = new WebSocket("wss://socketsbay.com/wss/v2/2/demo/");
    const byteArray = sendPacket(pktname, dummyData);
    socket.onopen = function () {
      setMessage("[open] 커넥션이 만들어졌습니다.");
      socket.send(byteArray);
    };
  };

  return (
    <div className="App">
      <button type="button" onClick={onConnectClick}>
        Connect
      </button>
      <button type="button">Disconnect</button>
      <p id="messages">{message}</p>
    </div>
  );
}

export default App;
