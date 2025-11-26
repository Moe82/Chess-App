import io from "socket.io-client";
let socket = io("https://chess-app-backend-production.up.railway.app");
export default socket;
