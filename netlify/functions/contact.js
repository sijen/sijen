const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Configure your SMTP (Gmail/others with app password)
  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Set in Netlify env vars
      pass: process.env.EMAIL_PASS  // App password
    }
  });

  try {
    await transporter.sendMail({
      from: '"Sijen Portfolio" <your-email@gmail.com>',
      to: 'sijen@example.com', // Your email
      replyTo: email,
      subject: `New contact from ${name}`,
      text: message,
      html: `<p><strong>${name}</strong> (${email})</p><p>${message}</p>`
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent!' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
};

