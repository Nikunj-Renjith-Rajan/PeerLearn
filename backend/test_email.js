const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

async function sendTestEmail() {
    console.log('User:', process.env.EMAIL_USER);
    console.log('Pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self
        subject: 'PeerLearn Test Email',
        text: 'If you see this, email sending is working!',
    };

    try {
        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.log('Error sending email:', error);
    }
}

sendTestEmail();
