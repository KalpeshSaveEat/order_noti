const express = require("express")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 8000

//cors policy
app.use(cors())
//JSON
app.use(express.json())

//simple main route
app.get("/", (req, res) => {
  res.send("<h1>Hello wskdgvorld</h1>")
})

const server = app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

//socket io config
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
})

//socket connection
io.on("connection", (socket) => {
  console.log("connected to socket.io")

  //join the room brandID
  socket.on("join", (roomName) => {
    socket.join(roomName)
    console.log(`Socket joined room: ${roomName}`)
  })

  socket.on("placeOrder", (data) => {
    const { roomname, orderNumber } = data
    console.log(`Order placed for restaurant :`, data)
    // Send the order to the room corresponding to the restaurant
    io.to(roomname).emit("newOrder", orderNumber)
  })
})
