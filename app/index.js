let app = require("express")();
let http = require("http").Server(app);
const cors = require('cors')
const bodyParser = require('body-parser')
const options = {cors: true, origins: [process.env.PORT]}
let io = require("socket.io")(http, options);


app.use(cors())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 1000000 }));


let messages = []
let users = []

app.post('/checkUser', (req, res) => {
    let currentUser = true
    users.forEach((user) => {
        if (user.username === req.body.username){
            currentUser = false
        }
    })

    if (currentUser) {
        res.send({username: req.body, status: true})
    }else {
        res.send({username: req.body, status: false})
    }
})

io.on("connection", socket => {
    console.log("user connected", users);
    socket.emit('userId', socket.id, users)

    messages.forEach((message) => {
        socket.emit("connection",  message )
    })


    socket.on("add user", user => {
        users.push(user)
        socket.broadcast.emit("notification", `${user.username} присоединился`);
        console.log(users)
        io.emit("send users",  users)
    })


    socket.on("message", message => {
        if (messages.length >= 100) messages.shift()
        messages.push(message)
        io.emit("add message",  message )
    })


    socket.on("del message", id => {
        messages = messages.filter(message => message.id !== id)
        io.emit("delete message",  id )
    })


    socket.on("out", () => {
        socket.disconnect(true)
    })


    socket.on("disconnect", () => {
        users.forEach(user => {
            if (user.userId === socket.id) {
                socket.broadcast.emit("notification", `${user.username} покинул чат`);
            }
        })
        users = users.filter(user => user.userId !== socket.id)
        if (!users.length) messages = []
        console.log("user disconnected", users);
    })
});

http.listen(process.env.PORT, () => {
    console.log("started on port 3000");
});