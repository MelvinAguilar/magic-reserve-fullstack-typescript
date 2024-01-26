const nodeMailer = require('nodemailer');

const sendEmail = async (emailOptions: any) => {
  // Create an email transporter
  const emailTransporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the options for the email
  const mailOptions = {
    from: 'Melvin Developer <developer.email.test.hdz@gmail.com>',
    to: emailOptions.email,
    subject: emailOptions.subject,
    text: emailOptions.message,
  };

  // Send the email using the transporter and the options
  await emailTransporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
