const socket = io();

$.get('/api/message')
    .then(function (data) {
        render(data)
    })
    .catch(function (err) {
        res.json(err);
    })

const render = function (data) {
    $('#root').empty();
    let htmlstr = '';
    data.forEach(element => {
        htmlstr += `<h5 class="card-title">${element.sender}</h5>`;
        htmlstr += `<p class="card-text">${element.message}</p>`;
    });

    $('#root').append(htmlstr);
}

const sendMessage = function (e) {
    e.preventDefault();
    const message = $('#message').val();
    const user1 = $('#name').val();

    socket.emit('new-change', {
        user1: user1,
        message: message,
        user2: user2
    });

    const postMessage = {
        sender: user1,
        message: message
    }
    $.post('/api/message', postMessage)
        .then(function () {

            $('#message').val('');

            $('#message').focus();
        })
        .catch(function (err) {
            console.log(err);
        });
}

socket.on('emit-message', function (data) {
    let htmlstr = '';

    htmlstr += `<h5 class="card-title">${data.sender}</h5>`;
    htmlstr += `<p class="card-text">${data.message}</p>`;

    $('#root').append(htmlstr);
})

$('#send-msg').on('click', sendMessage);

/**
Online and Offline status, who is in the chatroom
 */

let name;
let user2;

const sendName = (e) => {
    e.preventDefault();
    name = $('#name').val();
    socket.emit('new-name', {
        name: name
    })
}

socket.on('emit-users', (data) => {
    if (name) {
        const $select = $('<select>');
        $select.append('<option>Select User</option>')
        data.forEach(e => $select.append(`<option>${e}</option>`));
        $('#select-container').empty();
        $('#select-container').append($select);
    }
})

$('#send-name').on('click', sendName);

/**
 * Start Chat
 */

const startChat = (e) => {
    e.preventDefault();
    user2 = $('select').find(':selected').text();

    const newChat = {
        userNames: [name, user2]
    }

    $.post('/api/chat', newChat)
    .then( function (data) {
        console.log(data)
    })
    .catch( function(err) {
        res.json(err);
    })
}

$('#select-container').on('change', 'select', startChat);