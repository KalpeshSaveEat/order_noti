import io from "socket.io-client"

const ENDPOINT = process.env.REACT_APP_SERVER_URL

const socket = io.connect(ENDPOINT)

export default socket

export function socket_init() {
  console.log("connected to socket")
}
