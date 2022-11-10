require('dotenv').config()
const fs = require('fs')
const app = require('./app')
const { Server: httpServer } = require("http");
const { Server: WebSocketServer } = require("socket.io");

const PORT = process.env.PORT || 8080

const server = httpServer(app);
const io = new WebSocketServer(server, { /* options */ });

server.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`)
})

io.on("connection", (socket) => {
    console.info("Socket connection", socket.id)
    socket.emit("ping")

    let chatLog = []
    //receive and store data from Client
    socket.on('CLIENT_MESSAGE', async (data) => {
        //get persisted data from json
        dataLog = await fs.promises.readFile(`./model/chat/chat.json`, 'utf8')
        chatLog = JSON.parse(dataLog)
        chatLog.push(data)

        await fs.promises.writeFile(`./model/chat/chat.json`, JSON.stringify(chatLog), 'utf8')

    })
    // send all data to View
    const sendMessagetoClient = async () => {
        chatLog = await fs.promises.readFile(`./model/chat/chat.json`, 'utf8')
        chatLog = JSON.parse(chatLog)
        console.log(chatLog)
        socket.emit('SERVER_MESSAGE', chatLog)
    }
    sendMessagetoClient()
})

