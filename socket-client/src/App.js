import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./shared";

function App() {
  const [socketId, setSocketId] = useState("");
  const [status, setStatus] = useState(null);
  const [toggleColor, setToggleColor] = useState(false);

  const statusHandler = (data) => {
    setStatus(data);
  };

  const onSocketConnect = () => {
    setSocketId(socket.id);
  };

  useEffect(() => {
    socket.connect();
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });

    socket.on("connect", onSocketConnect);
    socket.on("statusUpdate", statusHandler);

    socket.on("connect_error", (err) => {
      console.log(err, "err");
    });
  }, []);

  useEffect(() => {
    setToggleColor((prevToggleColor) => !prevToggleColor);
  }, [status]);

  return (
    <div className="App">
      <h1>Socket Status: {socketId ? "Connected" : "Not Connected"}</h1>
      <h2 style={{ color: toggleColor ? "red" : "blue" }}>
        {socketId}
      </h2>
      <h4 style={{width: "80vw", margin: 'auto'}}>
        {JSON.stringify(status)}
      </h4>
    </div>
  );
}

export default App;
