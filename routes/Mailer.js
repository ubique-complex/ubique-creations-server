const path = require('path');
const express = require('express');
// const transporter = require('./config');
const dotenv = require('dotenv');
dotenv.config();
const router = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
// const expressAsyncHandler = require("express-async-handler")

const buildPath = path.join(__dirname, '..', 'build');
router.use(express.json());
router.use(cors()) // Use this after the variable declaration
router.use(express.static(buildPath));


router.post('/', (req, res) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "parasbhardwaj643@gmail.com",
      pass: "rzkbodohbhwnpsxl",
    }
  });

  const { name, email, phone, subject, message } = req.body;
  console.log(name, email, phone, subject, message);
  // try {
  const mailOptions = {
    from: 'parasbhardwaj643@gmail.com', // sender address
    to: "parasrakesh2001@gmail.com", // list of receivers
    subject: req.body.subject, // Subject line
    html: `
      <h3>Contact Details</h3>
      <ul>
        <li>Name: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Subject: ${subject}</li>
        <li>Message: ${message}</li>
      </ul>
      `
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      // console.log("error " + err)
    } else {
      console.log("Email sent successfully");
    }
  });

});
// } catch (error) {
//   res.status(500).send({
//     success: false,
//     message: 'Something went wrong.please Try again later'
//   });
// }

module.exports = router;