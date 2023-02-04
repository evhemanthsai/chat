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

  updateData();
});

window.addEventListener("load", () => {
  loadData();
  setInterval(loadData, 1000);
});

function loadData() {
  fetch("https://api.github.com/repos/{evhemanthsai}/{chat}/contents/data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load data");
      }
      return response.json();
    })
    .then(data => {
      const messages = JSON.parse(atob(data.content));
      localStorage.setItem("messages", JSON.stringify(messages));

      chatArea.innerHTML = "";
      messages.forEach(message => {
        const messageElement = document.createElement("p");
        messageElement.textContent = message;
        chatArea.appendChild(messageElement);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function updateData() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  fetch("https://api.github.com/repos/{evhemanthsai}/{chat}/contents/data.json", {
    method: "PUT",
    headers: {
      "Authorization": "Bearer {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}",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: messages
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to save data");
    }
  })
  .catch(error => {
    console.error(error);
  });
}
