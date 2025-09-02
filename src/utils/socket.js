import openSocket from "socket.io-client";

const socket = openSocket(process.env.REACT_APP_API_BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = (userId) => {
  socket.io.opts.query = {
    userId,
  };
  socket.connect();
};

export default socket;
