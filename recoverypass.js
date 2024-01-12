const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const debug = require('debug')('server');
const {User, sequelize } = require('../models/user');
const hashPassword = require('./hashPassword')


const app = express();
const port = 4200;

app.use(express.json());
app.use(cors({ origin: '*' }));

const mailConfig = {
  MAIL_USERNAME: 'interview21@mail.ru',
  MAIL_PASSWORD: 'HCsuJUbEThuNNcBF5pe7',
  MAIL_FROM: 'interview21@mail.ru',
  MAIL_PORT: 465,
  MAIL_SERVER: 'smtp.mail.ru',
  MAIL_STARTTLS: false,
  MAIL_SSL_TLS: true,
  USE_CREDENTIALS: true,
  VALIDATE_CERTS: true,
};

const transporter = nodemailer.createTransport({
  host: mailConfig.MAIL_SERVER,
  port: mailConfig.MAIL_PORT,
  secure: mailConfig.MAIL_SSL_TLS,
  auth: {
    user: mailConfig.MAIL_USERNAME,
    pass: mailConfig.MAIL_PASSWORD,
  },
});


app.post('/send-email', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      const resetUrl = `http://localhost:3000/resetpass?user_id=${user.user_id}`;
  
      const emailBody = `
        <br><br>
        Click <a href="${resetUrl}">here</a> to reset your password.
      `;
  
      const mailOptions = {
        from: mailConfig.MAIL_FROM,
        to: email,
        subject: 'Password recovery',
        html: emailBody,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error.message);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  });

  app.post('/reset-password/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { newPassword } = req.body;
  
    try {
      const user = await User.findOne({ where: { user_id } });
      if (!user || user === null) {
        return res.status(404).json({ message: 'Пользователь не найден' });
      }
      const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
      return res.status(200).json({ message: 'Пароль успешно изменен' });
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      res.status(500).json({ message: 'Произошла ошибка при сбросе пароля' });
    }
  });
  
  

(async () => {
  app.listen(port, () => {
    debug(`Server is running on port ${port}`);
  });
})();