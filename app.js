const chats = {
  luna: {
    name: "Luna",
    initial: "L",
    color: "purple",
    messages: [
      ["received", "Oii! Você viu a ideia nova do site?"],
      ["sent", "Ainda não! Me conta 👀"],
      ["received", "Você viu isso? ✨"]
    ]
  },

  rafael: {
    name: "Rafael",
    initial: "R",
    color: "blue",
    messages: [
      ["received", "Vamos jogar mais tarde?"]
    ]
  },

  maya: {
    name: "Maya",
    initial: "M",
    color: "gold",
    messages: [
      ["received", "Foto enviada 📷"]
    ]
  }
};

let activeChat = "luna";

const body = document.getElementById("chatBody");
const app = document.querySelector(".app-shell");

function renderChat() {

  const chat = chats[activeChat];

  document.getElementById("activeName").textContent =
    chat.nickname || chat.name;

  const avatar = document.getElementById("activeAvatar");

  avatar.textContent = chat.initial;
  avatar.className = "avatar " + chat.color;

  body.innerHTML = `
    <div class="date-divider">
      <span>HOJE</span>
    </div>
  `;

  chat.messages.forEach(([type, text]) => {

    const bubble = document.createElement("div");

    bubble.className = "bubble " + type;
    bubble.textContent = text;

    const time = document.createElement("time");

    time.textContent = new Date().toLocaleTimeString(
      "pt-BR",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

    bubble.appendChild(time);

    body.appendChild(bubble);

  });

  body.scrollTop = body.scrollHeight;
}


// TROCAR DE CONVERSA

function selectChat(id) {

  activeChat = id;

  document.querySelectorAll(".conversation").forEach(element => {

    element.classList.toggle(
      "selected",
      element.dataset.chat === id
    );

  });

  renderChat();

  app.classList.add("mobile-chat");
}


document.querySelectorAll(".conversation").forEach(element => {

  element.addEventListener("click", () => {

    selectChat(element.dataset.chat);

  });

});


// ENVIAR MENSAGENS

document.getElementById("messageForm").addEventListener("submit", event => {

  event.preventDefault();

  const input = document.getElementById("messageInput");

  const message = input.value.trim();

  if (!message) return;

  chats[activeChat].messages.push([
    "sent",
    message
  ]);

  input.value = "";

  renderChat();

});


// PESQUISAR CONVERSAS

document.getElementById("searchInput").addEventListener("input", event => {

  const search = event.target.value.toLowerCase();

  document.querySelectorAll(".conversation").forEach(element => {

    element.style.display =
      element.innerText.toLowerCase().includes(search)
        ? "flex"
        : "none";

  });

});


// JANELAS DE PERSONALIZAÇÃO

const backdrop = document.getElementById("modalBackdrop");

function openModal(title, description, value = "") {

  document.getElementById("modalTitle").textContent = title;

  document.getElementById("modalDescription").textContent =
    description;

  document.getElementById("modalInput").value = value;

  backdrop.classList.remove("hidden");

  document.getElementById("modalInput").focus();

}


// FECHAR JANELA

document.getElementById("modalClose").onclick = () => {

  backdrop.classList.add("hidden");

};

backdrop.addEventListener("click", event => {

  if (event.target === backdrop) {

    backdrop.classList.add("hidden");

  }

});


// APELIDOS PERSONALIZADOS

document.getElementById("moreBtn").onclick = () => {

  openModal(
    "Apelido do contato",
    "Escolha como esse contato aparece para você.",
    chats[activeChat].nickname || chats[activeChat].name
  );

};

document.getElementById("modalSave").onclick = () => {

  const value = document.getElementById("modalInput").value.trim();

  if (value) {

    chats[activeChat].nickname = value;

    renderChat();

  }

  backdrop.classList.add("hidden");

};


// NOVA CONVERSA

document.getElementById("newChatBtn").onclick = () => {

  openModal(
    "Nova conversa",
    "A criação de conversas reais será ativada quando conectarmos o banco de dados."
  );

};


// CONFIGURAÇÕES

document.getElementById("settingsBtn").onclick = () => {

  openModal(
    "Configurações",
    "Aqui ficarão as configurações da sua conta ORBIT MAX IG."
  );

};


// ANEXOS

document.getElementById("attachBtn").onclick = () => {

  openModal(
    "Anexos",
    "O envio real de arquivos será implementado na próxima etapa."
  );

};


// STATUS

document.querySelectorAll("[data-story]").forEach(element => {

  element.onclick = () => {

    openModal(
      "Status de " + element.dataset.story,
      "A publicação de status será ativada na próxima etapa."
    );

  };

});

document.getElementById("statusNav").onclick = () => {

  openModal(
    "Status",
    "Aqui ficarão as atualizações dos seus contatos."
  );

};

document.getElementById("contactsNav").onclick = () => {

  openModal(
    "Contatos",
    "Sua lista de contatos será conectada na próxima etapa."
  );

};

document.getElementById("allStatusBtn").onclick = () => {

  openModal(
    "Status",
    "Aqui você poderá ver todas as atualizações."
  );

};


// INICIAR SITE

renderChat();
