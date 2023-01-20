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

var messages = [];
io.on('connection', socket => {
    socket.emit("message", messages);
    console.log("Client connected with id: " + socket.id);
    socket.on("message", (data) => {
        const message = {
            text: data[0],
            senderId: data[1]
        };

        messages.push(message);
        console.log(messages);
        io.emit("message", messages);
        // socket.to(room).emit("message", message);
    });
});