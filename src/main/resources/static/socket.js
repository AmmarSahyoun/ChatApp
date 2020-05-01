import { store } from './store.js'

let ws;
let isConnected = false;
connect();

function connect() {
    ws = new WebSocket('ws://localhost:4000/your-socket-route');
    ws.onmessage = (e) => {
      let data = JSON.parse(e.data)

      if(data.message && store.state.currentChannel != null) {
        if(store.state.currentChannel.id === data.channelId) {
          console.log(data)
          store.commit('addToCurrentChannelMessages', data)
        }
      }
      showSomething(e.data);
    }
    ws.onopen = (e) => {
        //sendSomething();
        isConnected = true;
    };

    ws.onclose = (e) => {
        console.log("Closing websocket...");
    };

  console.log("Connecting...");
}

function disconnect() {
    if (ws != null) {
        ws.close();
    }
    isConnected = false;
    console.log("Disconnected");
}

function sendSomething() {
    ws.send(JSON.stringify({firstname: "Hello World!" }));
}

function showSomething(message) {
    console.log(message);
}
