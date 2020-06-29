/* eslint-disable */
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

io.on('connection', (socket) => {
  console.log(`A user connected with socket id ${socket.id}`)

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', socket.id)
  })

  const onevent = socket.onevent
  socket.onevent = function (packet) {
    const args = packet.data || []
    console.log(`Packet data ${packet.data}`)
    onevent.call(this, packet)  // original call
    packet.data = ["*"].concat(args)
    onevent.call(this, packet) // additional call to catch-all
  };

  socket.on('*', (event, data) => {
    socket.broadcast.emit(event, data)
  })
})
http.listen(3000, () => {
  console.log('Listening on port *: 3000')
})
