export function myFunction(askedTemplate) {

    const chatLog = document.getElementById('chat-log')
    const message = document.getElementById('message')
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = message.value;
        message.value = '';
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `
            <div class="message__text">We got your asked, loading ... </div>`;
        chatLog.appendChild(messageElement)
        chatLog.scrollTop = chatLog.scrollHeight;
        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: askedTemplate
            })
        })
            .then(res => res.json())
            .then(data => {
                const messageElement = document.createElement('div');
                messageElement.innerHTML = `
        <div class="message__text">${data.completion}</div>`;
                chatLog.appendChild(messageElement)
                chatLog.scrollTop = chatLog.scrollHeight;
            })
    })
}
