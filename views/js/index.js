const socket = io()

socket.on("ping", () => {
    console.log("ping")
})

const sendNewMessage = () => {
    console.log("first")
    const email = document.getElementById('chatEmail').value
    const message = document.getElementById('chatMessage').value

    if (!email || !message) {
        // alert("Please enter an email address and message")
        return
    }
    const messageObject = {
        email,
        message
    }

    socket.emit('CLIENT_MESSAGE', messageObject)

    //message = ''
}


// socket io server_1
socket.on('SERVER_MESSAGE', (data) => {
    console.log("data" + data)
})

// FE functions
const openChat = () => {
    const chatBox = document.getElementById('chatBox');
    chatBox.classList.toggle('chat-box--isOpen')
}

