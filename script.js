const form = document.getElementById("chat-form");
const input = document.getElementById("message-input");
const chatArea = document.getElementById("chat-area");

form.addEventListener("submit", e => {
  e.preventDefault();

  const message = input.value;
  input.value = "";

  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  chatArea.appendChild(messageElement);
});

window.addEventListener("load", () => {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  messages.forEach(message => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    chatArea.appendChild(messageElement);
  });
});
