const cofig = require("./config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "jongsun250@gmail.com",
    pass: cofig.appPassword,
  },
});

// https://temp-mail.org/en/

const mailOptions = {
  from: "jongsun250@gmail.com",
  to: "gafif49682@questza.com",
  subject: "Hello ヾ(•ω•`)o",
  text: "Hello world?",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Message sent: ${info.response}`);
    // Message sent: 250 2.0.0 OK  1606917746 o2sm2206957wrq.37 - gsmtp
  }
  transporter.close();
});
