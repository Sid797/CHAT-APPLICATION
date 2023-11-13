// script.js

const socket = io();

const formDisplay = document.getElementById("formDisplay");
const nameForm = document.getElementById("nameForm");
const inputName = document.getElementById("inputName");
const sendNameButton = document.getElementById("sendNameButton");
const inputRoom = document.getElementById("room");

let userName;
const chatDisplay = document.getElementById("chatDisplay");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const input = document.getElementById("input");

sendNameButton.addEventListener("click", (e) => {
  e.preventDefault();

  chatDisplay.style.display = "block";
  formDisplay.style.display = "none";

  userName = inputName.value;
  roomID = inputRoom.value;  // Add this line
  console.log(userName, roomID); 

  socket.emit('join room', roomID);
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', { name: userName, message: input.value, room: roomID });
    input.value = '';
  }
});

socket.on('chat message', function (data) {
  var item = document.createElement('li');
  item.textContent = data.name.concat(":", data.message);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
