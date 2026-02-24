const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use another service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async (email, code) => {
    // ALWAYS log the code for development/testing purposes
    console.log('=================================================');
    console.log(`DEV MODE: Verification Code for ${email}: ${code}`);
    console.log('=================================================');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'PeerLearn - Email Verification',
        text: `Your verification code is: ${code}`,
        html: `<p>Your verification code is: <b>${code}</b></p>`,
    };

    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('Email credentials missing. Skipping email send (Mock Mode).');
            return;
        }
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email (ignoring for dev flow):', error.message);
        // Do NOT throw error so the user can still proceed to enter the code
        // throw error; 
    }
};

module.exports = { sendVerificationEmail };
