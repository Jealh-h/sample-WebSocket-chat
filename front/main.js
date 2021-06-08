function render(content, data) {
    let item = document.createElement('li');
    item.innerHTML = `
    <strong>${data.username}:</strong>
    ${data.msg}
    `
    content.appendChild(item);
}

function renderOnlineList(arr, username) {
    let list = document.querySelector('.online-list');
    let online_count = document.querySelector('.online-count');
    let cur_user = document.querySelector('.cur-user');
    cur_user.textContent = username;
    let users = '';
    for (let i = 0; i < arr.length; i++) {
        users += `<li>${arr[i]}</li>`;
    }
    online_count.innerHTML = arr.length;
    list.innerHTML = users;
}

function Myprompt(msg) {
    document.querySelector('.greet').textContent = msg;
    document.querySelector('.greet').classList.remove('fadeOut');
    setTimeout(function () {
        document.querySelector('.greet').classList.add('fadeOut');
    }, 200);
}

window.onload = function () {
    var cs = {};
    let clients = []
    var username = decodeURI(location.search).split('?')[1].split('=')[1];
    let text_value = document.querySelector('textarea');
    let sendbtn = document.querySelector('.send-btn');
    let content = document.querySelector('.content');
    cs = new WebSocket("ws://localhost:5055");
    let loginMsg = {
        opr: "login",
        msg: "",
        username: username
    };
    cs.onopen = function () {
        cs.send(JSON.stringify(loginMsg));
    };
    cs.onmessage = (msg) => {
        let message = JSON.parse(msg.data);
        console.log(message);
        switch (message.opr) {
            case 'signOut':
                // 更新在线列表
                // console.log(message.users);
                renderOnlineList(message.users, username);
                Myprompt(message.msg);
                break;
            case 'login':
                // 更新在线列表
                renderOnlineList(JSON.parse(message.users), username);
                Myprompt(message.msg);
                break;
            case 'msg':
                render(content, message)
                break;
            default:
                break;
        }
    };

    // 客户端发送自己的消息
    sendbtn.addEventListener('click', () => {
        let item = document.createElement('li');
        let to_server = {};
        item.innerHTML = `
        <strong>${username}:</strong>
        ${text_value.value}
        `
        content.appendChild(item);
        to_server.opr = 'msg';
        to_server.msg = text_value.value;
        to_server.username = username;
        cs.send(JSON.stringify(to_server));
        text_value.value = '';
        content.scrollTo({ top: content.scrollHeight })
    })
}