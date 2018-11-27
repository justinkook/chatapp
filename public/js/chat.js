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

socket.on('displayclear-message', function (data) {
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

const startChat = function (event) {
    event.preventDefault();
    user2 = $('select').find(':selected').text();
    // $(''.)show();
    const newChat = {
        userNames: [user1, user2]
    }
    $.ajax({ url: "/api/chat", method: "GET" })
        .then(function (dataList) {
            const match = dataList.filter(
                item => item.userNames.includes(user1) && item.userNames.includes(user2)
            );
            if (match.length === 2 || match.length === 1) {
                console.log('match')

            } else if (match.length === 0) {
                $.ajax({ url: "/api/chat", method: "POST", data: newChat }).then(function (data) {
                }).then(function () {

                })
            }

        })
}

$('#select-container').on('change', 'select', startChat);