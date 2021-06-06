export default class IRC {
    constructor(message, chatbox, nick) {
        this.message = message
        this.chatbox = chatbox
        this.nick = nick

        this.colors = ["red", "blue", "yellow", "green", "purple", "orange"]

        let random = Math.floor(Math.random() * 5)

        this.color = this.colors[random]
    }

    sendMessage() {

        let hours = new Date().getHours()
        let minutes = new Date().getMinutes()
        let time = hours + ":" + minutes

        let data = {
            nickname: this.nick,
            message: this.message.value,
            time: time,
            color: this.color
        }

        console.log(this.message.value.split(" ")[0])
        if (this.message.value.split(" ")[0] == "/nick") {
            console.log(this.message.value)
            sessionStorage.setItem("nick", this.message.value.split(" ")[1])
            this.nick = this.message.value.split(" ")[1]
            console.log(sessionStorage)
        }
        else {
            fetch('/send/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
            this.polling()
        }
        this.message.value = ""
    }


    async polling() {
        console.log("polling")
        let res = await fetch('/poll/', {
                method: 'GET',

            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let divek = document.createElement("div")
                let nickname = document.createElement("div")
                let message = document.createElement("div")

                nickname.innerHTML = data.nickname
                message.innerHTML = " <" + data.time + "> " + data.message
                $(message).emoticonize()
                divek.appendChild(nickname).style.color = data.color

                divek.appendChild(message)
                divek.style.display = "flex"
                this.chatbox.appendChild(divek)

            })
            .catch(error => {
                console.log(error)

            })

        console.log("res", res)
        this.polling()
    }
}