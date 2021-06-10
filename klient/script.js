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