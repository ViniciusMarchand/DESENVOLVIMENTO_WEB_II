import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.APP_EMAIL,   // google app email
    pass: process.env.APP_EMAIL_PASSWORD,   // google app password
    //  https://myaccount.google.com/apppasswords
    // tem que estar com 2fa ativado
  },
});


const sendVerificationEmail = async (email, token) => {

    const info = await transporter.sendMail({
        from: '',
        to: email,
        subject: "Hello ✔",
        html: `<a href="${process.env.APP_LINK}/auth/validar-email/${token}"><b>Clique aqui para validar sua conta!!!</b></a>`, // html body
      });
    
    console.log("Message sent: %s", info.messageId);
}

export { sendVerificationEmail };