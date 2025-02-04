const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 5000;

app.use(bodyParser.json());

//Cross Origin
app.use(cors()); 

// Configure Nodemailer with SMTP transport
const transporter = nodemailer.createTransport({
  host: 'mail.isizwesiyakha.org',
  port: 465,
  secure: true,
  auth: {
    user: 'info@isizwesiyakha.org',
    pass: process.env.PASS, 
  },
});


app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: 'info@isizwesiyakha.org',
    to: 'info@isizwesiyakha.org',
    replyTo: email,
    subject: subject,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});