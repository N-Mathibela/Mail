const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const password = process.env.PASS;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SMTP configuration
const transporter = nodemailer.createTransport({
    host: 'mail.isizwesiyakha.org',
    port: 465,
    secure: true,
    auth: {
        user: 'info@isizwesiyakha.org',
        pass: password,
    },
});

// Endpoint to handle form submissions
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'info@isizwesiyakha.org',
        subject: subject,
        text: `Message from ${name} (${email}):\n\n${message}`,
        replyTo: email,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});