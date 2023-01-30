const http = require('http')
const pocket = require('pocket.io')

const app = (_, res) => {
  res.writeHead(200)
  res.end('<pre>It works!</pre>')
}

const server = http.Server(app)
const io = pocket(server)

const allowedStrings = ['data', 'message']

io.on('connection', (socket) => {
  allowedStrings.forEach((name) => {
    socket.on(name, (data) => socket.broadcast.emit(name, data))
  })
})

server.listen(process.env.PORT || 8080, () => {
  console.log('server is ready...') // eslint-disable-line no-console
})