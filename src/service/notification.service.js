const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

class NotificationService {}

NotificationService.prototype.sendMail = async (userEmail) => {
  try {
    const transport = nodemailer.createTransport(
      smtpTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER_NAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    );

    const mailOptions = {
      from: '"Cube_84" <prasanna.02@doodle-blue.com>',
      to: userEmail,
      subject: "Your order is confirmed",
      text: "Hi, Your order is confirmed.. Thank you for shopping with us",
    };
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("Message sent successfully");
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = new NotificationService();
