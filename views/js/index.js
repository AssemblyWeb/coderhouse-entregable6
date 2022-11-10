const socket = io()

// socket.on("ping", () => {
//     console.log("ping")
// })

const sendNewMessage = () => {
    console.log("first")
    const email = document.getElementById('chatEmail').value
    const message = document.getElementById('chatMessage').value

    if (!email || !message) {
        alert("Please enter an email address and message")
        return
    }
    const messageObject = {
        email,
        message
    }

    socket.emit('CLIENT_MESSAGE', messageObject)

    message = ''
}


// socket io server
socket.on('SERVER_MESSAGE', (data) => {
    const chat = document.querySelector('#chatBoxMessages')

    const dataTimestamp = data.map((message) => {
        return {
            date: moment().format('DD/MM/YYYY, H:mm:ss'),
            ...message
        }
    })

    let chatLog = ''
    dataTimestamp.forEach(message => {
        chatLog += `<div><span class="fw-bold text-primary">${message.email} </span><span class="text-brown">${message.date} </span><span class="fst-italic text-success">${message.message}</span></div>`
    })

    chat.innerHTML = chatLog

})



// FE functions
const openChat = () => {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('chat-box--isOpen')
}

