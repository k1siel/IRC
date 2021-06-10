export default class IRC {
    constructor(message, chatbox, nick) {
        this.message = message
        this.chatbox = chatbox
        this.nick = nick

        this.colors = ["red", "blue", "yellow", "green", "purple", "orange", "magenta", "brown", "darkorange"]

        let random = Math.floor(Math.random() * 9)

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

        console.log(this.message.value)
        if (this.message.value.split(" ")[0] == "/nick") {
            console.log(this.message.value)
            sessionStorage.setItem("nick", this.message.value.split(" ")[1])
            this.nick = this.message.value.split(" ")[1]
            console.log(sessionStorage)
        } else if (this.message.value.split(" ")[0] == "/color") {
            if (this.message.value.split(" ")[1] != undefined) {
                this.color = this.message.value.split(" ")[1]
            } else {
                let random = Math.floor(Math.random() * 9)
                this.color = this.colors[random]
                console.log(this.colors[random])
            }
            console.log(this.color)
        } else if (this.message.value == "/quit") {
            document.querySelector("body").innerHTML = "no fajnie sobie wyszedłeś z irca"
            console.log(location)
        }
        else if(this.message.value == ""){

        }
         else {
            fetch('/send/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
           
        }
        this.message.value = ""
    }


    async polling() {
        console.log("polling")
        fetch('/poll/', {
                method: 'GET',

            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                let divek = document.createElement("div")
                let nickname = document.createElement("div")
                let message = document.createElement("div")

                nickname.innerHTML = data.nickname + " "
                message.innerHTML = " <" + data.time + "> " + data.message
                $(message).emoticonize()
                divek.appendChild(nickname).style.color = data.color

                divek.appendChild(message)
                divek.style.display = "flex"
                this.chatbox.appendChild(divek)


                this.chatbox.scrollTop = this.chatbox.scrollHeight
               

                this.polling()
            })
            .catch(error => {
                console.log(error)
                this.polling()
            })


  
    }
}