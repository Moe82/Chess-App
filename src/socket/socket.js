import io from "socket.io-client";
let socket = io("https://chess-app-backend-345d2453b5cc.herokuapp.com/");
export default socket;