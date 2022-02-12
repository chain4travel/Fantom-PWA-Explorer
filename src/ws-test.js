import appConfig from "../app.config.js";

let ws;

function onOpen() {
    console.log("CONNECTED");
}

function onClose() {
    console.log("DISCONNECTED");
}

function onMessage(evt) {
    console.log('RESPONSE: ' + evt.data);
    ws.close();
}

function onError2(evt) {
    console.log('ERROR: ' + evt.data);
}

export function initWSTest() {
    ws = new WebSocket(appConfig.apollo.providers[0].ws);

    ws.onopen = function(evt) { onOpen(evt) };
    ws.onclose = function(evt) { onClose(evt) };
    ws.onmessage = function(evt) { onMessage(evt) };
    ws.onerror = function(evt) { onError2(evt) };
}

export function sendWSMsg(_msg) {
    if (ws) {
        ws.send(_msg);
    }
}
