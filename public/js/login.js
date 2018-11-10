const login = (e) => {
    e.preventDefault();
    const user = $('#login-username').val();
    
    // Post request verify username and password match .then(
    // Index DB is database for client side

    localStorage.setItem('user', user);
    window.location.href = '/chat';
}

$('#login-btn').on('click', login);