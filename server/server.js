const WS = require('ws')

const wss = new WS.Server({ port: 5055 });


// 用于统计在线的用户
var clients = [];

function deleteUser(str, arr) {
    let index = arr.indexOf(str);
    arr.splice(index, 1);
}

wss.on('connection', (ws, req) => {
    let c = {};
    let to_client = {};
    ws.on('message', (message) => {
        let clientMsg = JSON.parse(message);
        if (clientMsg.opr === 'login') {
            clients.push(clientMsg.username);
            to_client = {
                opr: 'login', // 操作类型
                msg: clientMsg.username + "上线了", // 消息
                username: clientMsg.username, // 接收到来自谁的消息
                users: JSON.stringify(clients) // 当前在线的用户 数组
            }
            ws.username = clientMsg.username;
            // 广播各个客户端
            wss.clients.forEach(client => {
                client.send(JSON.stringify(to_client));
            })
        } else {
            to_client = {
                opr: clientMsg.opr,
                msg: clientMsg.msg,
                username: ws.username
            }
            // 广播各个客户端
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WS.OPEN) {
                    client.send(JSON.stringify(to_client));
                }
            })
        }
    })
    ws.on('close', () => {
        deleteUser(ws.username, clients);
        to_client.opr = 'signOut';
        to_client.msg = ws.username + '下线了';
        to_client.users = clients;
        wss.clients.forEach(client => {
            client.send(JSON.stringify(to_client));
        })
    })
})