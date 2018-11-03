const socket = io();

const render = function () {
    $('#root').empty();

    $.ajax({
            url: '/api/realTimeChat',
            method: 'GET'
        })
        .then(function (data) {
            let htmlstr = '';
            data.forEach(element => {
                htmlstr += `<h5 class="card-title">${element.sender}</h5>`;
                htmlstr += `<h6 class="card-subtitle mb-2">${element.message}</h6>`;
            });

            $('#root').append(htmlstr);
        })
        .catch(function (err) {
            res.json(err);
        })
}

const sendMessage = function (e) {
    e.preventDefault();
    const message = $('#message').val();
    const senderName = $('#senderName').val();
    socket.emit('new-message', {
        sender: senderName,
        message: message
    });

    const postMessage = {
        sender: senderName,
        message: message
    }
    $.ajax({
            url: '/api/realTimeChat',
            method: 'POST',
            data: postMessage
        }).then(
            function () {

                $('#senderName').val('');
                $('#message').val('');

                $('#senderName').focus();
                render();
            })
        .catch(function (err) {
            console.log(err);
        });
}

socket.on('emit-message', function (data) {
    let htmlstr = '';
    htmlstr += `<h5 class="card-title">${data.sender}</h5>`;
    htmlstr += `<h6 class="card-subtitle mb-2">${data.message}</h6>`;
    $('#root').append(htmlstr);
})

$('#send-msg').on('click', sendMessage);

render();