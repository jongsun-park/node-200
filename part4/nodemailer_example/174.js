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
  subject: "Hello ヾ(•ω•`)o HTML",
  //   text: "Hello world?",
  html: `<h1>Hello HTML</h1><a href="http://www.infopub.co.kr"><img src="https://picsum.photos/200/300"/></a></h1>`,
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
