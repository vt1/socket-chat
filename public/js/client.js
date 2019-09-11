/* eslint-disable no-undef */
$(document).ready(() => {
    const socket = io();
    $('form').submit((e) => {
      e.preventDefault();
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    socket.on('chat message', (msg) => {
      $('#messages').append($('<li>').text(msg));
    });

    socket.on('user_connection', (userConnectInfo) => {
      $('#messages').append($('<li>').text(userConnectInfo));
    });

    socket.on('disconnect', (disconnectUser) => {
      $('#messages').append($('<li>').text(disconnectUser));
    });
})