const nodemailer = require('nodemailer');

// .env içinde ayarlayacağımız bilgiler
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // örn: smtp.gmail.com
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // true ise 465 portu kullanılır
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (to, code) => {
    const mailOptions = {
        from: `"Student Life" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Doğrulama Kodu",
        text: `Doğrulama kodunuz: ${code}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };




