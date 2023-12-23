const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "../Config.env" });
const G_MAIL = process.env.G_MAIL;
const APP_PASS = process.env.APP_PASS;
const PASS = process.env.APP_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ameen.desk@gmail.com",
    pass: "jbvgozvzzxktjmpf",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "Do_NOT-REPLY@ameenworks.com",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { transporter, sendEmail };
