const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const io = require('socket.io')(server);

// var messages = [];
io.on('connection', socket => {
    // socket.emit("message", messages);
    console.log("Client connected with id: " + socket.id);

    socket.on("join-room", room => {
        socket.join(room);
        console.log("User " + socket.id + " connected to room " + room);
    });

    socket.on("message", (data) => {
        const room = data[2];
        console.log("sala: " + room);

        const message = {
            text: data[0],
            senderId: data[1]
        };

        // messages.push(message);
        // console.log(messages);
        console.log("message: " + message.text);
        socket.to(room).emit("message", message);
        // socket.to(room).emit("message", message);
    });
});