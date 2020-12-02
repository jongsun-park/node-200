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
  subject: "Hello ヾ(•ω•`)o attachment",
  //   text: "Hello world?",
  html: `<h1>Hello HTML</h1><a href="http://www.infopub.co.kr"><img src="https://picsum.photos/200/300"/></a></h1>`,
  attachments: [
    {
      filename: "attachment_test.xlsx",
      path: `${__dirname}/attachment_test.xlsx`,
    },
  ],
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Message sent: ${info.response}`);
    console.log(mailOptions.attachments);
    // Message sent: 250 2.0.0 OK  1606919687 a65sm2335949wmc.35 - gsmtp
    // [
    //   {
    //     filename: 'attachment_test.xlsx',
    //     path: 'c:\\Users\\jongs\\OneDrive\\바탕 화면\\nodejs200\\part4\\nodemailer_example/attachment_test.xlsx'
    //   }
    // ]
  }
  transporter.close();
});
