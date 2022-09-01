const http = require('http')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const pocket = require('pocket.io')

const app = express()
const server = http.Server(app)
const io = pocket(server)

const allowedStrings = ['data', 'message']

app.use(cors())
app.use(helmet())

app.get('/', (_, res) => {
  res.send('<pre>It works!</pre>')
})

io.on('connection', (socket) => {
  allowedStrings.forEach((name) => {
    socket.on(name, (data) => socket.broadcast.emit(name, data))
  })
})

server.listen(process.env.PORT || 8080, () => {
  console.log('server is ready...') // eslint-disable-line no-console
})
