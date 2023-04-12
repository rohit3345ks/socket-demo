import * as express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dummyData from './dummyData.json';

console.log("running server");
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.send({
    type: "Hello Socket",
  });
});

let count = 0;
const intervalId = setInterval(() => {
  io.emit("statusUpdate", {
      count: count++,
    sensorsData: dummyData.slice(Math.random() * 100, Math.random()*(1500)),
  });
}, 1000);

// setTimeout(() => {
//   clearInterval(intervalId);
// }, 60000);


httpServer.listen(4000);
