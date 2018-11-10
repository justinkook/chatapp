const db = require('../models/');
const user = {}

module.exports = function(io) {
    io.on('connection', function(socket) {
        //Socket API Routes Backend

        socket.on('new-name', function(data){
            console.log('this is new-name data')
            console.log(data);
            user[data.name] = socket;
            io.emit('emit-users', Object.keys(user))

            //Object.keys gives an array of object fields
        })

        socket.on('new-message', function(data){
            console.log('this is new-name data');
            console.log(data);
            io.emit('emit-message', data);
        })

        socket.on('new-change', function(newData){

            db.Message.create({sender: newData.user1, message: newData.message})
            .then(function (data) {
                return db.Chat.findOneAndUpdate({ $and: [{userNames: newData.user1}, {userNames: newData.user2}] }, { $push: { message: data._id } })
            })
            const socket1 = user[newData.user1];
            const socket2 = user[newData.user2];
            socket1.emit('emit-message', newData);
            socket2.emit('emit-message', newData);
        })
    })
}