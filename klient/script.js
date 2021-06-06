// Sending messages, a simple POST
import IRC from "./IRC.js"


let irc;

window.addEventListener('DOMContentLoaded', (event) => {

    let nick = prompt("podaj nickname! :3")
    sessionStorage.setItem("nick", nick)

    let chatbox = document.getElementById("chatbox")
    let message = document.getElementById("message")

    irc = new IRC(message, chatbox, nick)

    console.log(irc)
    let form = document.querySelector("form")
    console.log(form)

    irc.polling()
    document.getElementById('form').addEventListener('submit', function (evt) {
        evt.preventDefault();
        irc.sendMessage()
    })

});

function PublishForm(form, url) {

    function sendMessage(message) {
        fetch(url, {
            method: 'POST',
            body: message
        });
    }

    form.onsubmit = function () {
        let message = form.message.value;
        if (message) {
            form.message.value = '';
            sendMessage(message);
        }
        return false;
    };
}

// Receiving messages with long polling
function SubscribePane(elem, url) {

    function showMessage(message) {
        let messageElem = document.createElement('div');
        messageElem.append(message);
        elem.append(messageElem);
    }

    async function subscribe() {
        let response = await fetch(url);

        if (response.status == 502) {
            // Connection timeout
            // happens when the connection was pending for too long
            // let's reconnect
            await subscribe();
        } else if (response.status != 200) {
            // Show Error
            showMessage(response.statusText);
            // Reconnect in one second
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe();
        } else {
            // Got message
            let message = await response.text();
            showMessage(message);
            await subscribe();
        }
    }

    subscribe();

}