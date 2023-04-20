const path = require('path');
const express = require('express');
const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const router = express();

const buildPath = path.join(__dirname, '..', 'build');
router.use(express.json());
router.use(express.static(buildPath));

router.post('/', (req, res) => {
  try {
    const mailOptions = {
      from: 'parasrakesh2001@gmail.com', // sender address
      to: 'parasrakesh2001@gmail.com', // list of receivers
      subject: 'You have a new contact request ', // Subject line
      html: `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Subject: ${req.body.option}</li>
        <li>Message: ${req.body.message}</li>
      </ul>
      `
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).send({
          success: false,
          message: 'Something went wrong. Try again later'
        });
      } else {
        res.send({
          success: true,
          message: 'Thanks for contacting us. We will get back to you shortly'
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Something went wrong.please Try again later'
    });
  }
});

module.exports = router;