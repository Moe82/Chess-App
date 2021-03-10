import io from "socket.io-client";
let socket = io("https://chess-app-backend.herokuapp.com");
export default socket;