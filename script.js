const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const chatArea = document.getElementById("chat-area");

form.addEventListener("submit", e => {
  e.preventDefault();

  const message = input.value;
  input.value = "";

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  chatArea.appendChild(messageElement);
});
