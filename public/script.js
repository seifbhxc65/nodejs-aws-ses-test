const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('status-message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    statusMessage.textContent = 'Sending message...';

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });
        
        const d1= await response.text();
        const data = JSON.parse(d1) ;
        console.log(data)
        //console.log('data:', data);
        if (data.message === 'Successfully Sent Email') {
            statusMessage.textContent = 'Your message has been sent!';
            form.reset();
        } else {
            throw new Error('Error sending email: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        statusMessage.textContent = 'There was an error sending your message. Please try again later.';
    }
});
