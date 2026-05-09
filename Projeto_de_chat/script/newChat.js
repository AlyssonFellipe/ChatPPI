let user = "";
let avatar = "";
let current = null;

/* SALAS BLOQUEADAS */
const blockedChats = [
    "msi",
    "mecanica",
    "refrigeracao"
];

/* LOGIN */
function enter() {

    user = document.getElementById("name").value;

    if (!user) return;

    avatar = "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user;

    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "flex";
}

/* ABRIR CHAT */
function openChat(room) {

    if (blockedChats.includes(room)) {
        blocked();
        return;
    }

    current = room;

    document.getElementById("chatTitle").innerText = "Chat: " + room;

    load();
}

/* NOTIFICAÇÃO */
function blocked() {

    let n = document.createElement("div");
    n.className = "notif";
    n.innerText = "❌ Acesso não confirmado";

    document.body.appendChild(n);

    setTimeout(() => n.remove(), 2500);
}

/* ENVIAR MENSAGEM */
function send() {

    let input = document.getElementById("msg");

    if (!current || !input.value) return;

    let box = document.getElementById("chatBox");

    let div = document.createElement("div");
    div.className = "msg";

    div.innerHTML = `
        <img class="avatar" src="${avatar}">
        <div>
            <strong>${user}</strong><br>
            ${input.value}
        </div>
    `;

    box.appendChild(div);

    save(current, input.value);

    input.value = "";
}

/* SALVAR */
function save(room, msg) {

    let data = JSON.parse(localStorage.getItem(room)) || [];

    data.push({ user, avatar, msg });

    localStorage.setItem(room, JSON.stringify(data));
}

/* CARREGAR */
function load() {

    let box = document.getElementById("chatBox");
    box.innerHTML = "";

    let data = JSON.parse(localStorage.getItem(current)) || [];

    data.forEach(m => {

        let div = document.createElement("div");
        div.className = "msg";

        div.innerHTML = `
            <img class="avatar" src="${m.avatar}">
            <div>
                <strong>${m.user}</strong><br>
                ${m.msg}
            </div>
        `;

        box.appendChild(div);
    });
}