import io from "socket.io-client";
let socket = io("http://localhost:3005");
export default socket;