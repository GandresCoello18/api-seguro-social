import nodemailer from "nodemailer";
import { Email_INT } from '../../interface';
const { config } = require("../../config");

class UtilEmail {
  constructor() {}

  async send(data: Email_INT) {
    console.log("ENVIANDO MENSAJE.........");

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      requireTLS: true,
      secure: true, // true for 465, false for other ports
      tls: { rejectUnauthorized: false },
      auth: {
        user: config.correoGmail, // generated ethereal user
        pass: config.claveGmail, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: `${data.from}`, // sender address
      to: `${data.to}`, // list of receivers
      subject: `${data.subject}`, // Subject line
      text: `${data.text}`, // plain text body
      html: `<h1>SEGURO SOCIAL CAMPECINO "LA TEREZA"</h1>
            <p>${data.text}</p>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}

let utilemail = new UtilEmail();
export default utilemail;
