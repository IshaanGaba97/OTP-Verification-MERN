const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const { randomInt } = require('crypto');
const { EMAIL, PASSWORD } = require('../cred.js');

let commonOtp = 0;

const getOTP = async (req, res) => {
    try {
        const otp = randomInt(100000, 999999);
        console.log(otp);

        const { userEmail } = req.body;
        if (!userEmail) {
            return res.status(400).json({ error: 'User email is required' });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        const mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: "Ishaan's Company",
                link: 'https://ishaangaba.netlify.app/'
            }
        });

        const mail = mailGenerator.generate({
            body: {
                name: 'A mail sent by NodeMailer',
                intro: `Your OTP ${otp} has arrived!`,
                outro: 'Looking forward to having a great time at our application!'
            }
        });

        const message = {
            from: EMAIL,
            to: userEmail,
            subject: 'A message from Our Team',
            html: mail
        };

        await transporter.sendMail(message);
        commonOtp = otp;
        return res.status(201).json({ message: 'The mail is sent successfully on Gmail' });
    } catch (error) {
        console.error('Error in getOTP:', error);
        return res.status(500).json({ error: 'Failed to send OTP mail' });
    }
};

const checkOTP = (req, res) => {
    try {
        const { otp } = req.body;
        console.log(commonOtp);
        if (!otp || otp != commonOtp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
        return res.status(201).json({ message: 'OTP Verified' });
    } catch (error) {
        console.error('Error in checkOTP:', error);
        return res.status(500).json({ error: 'Failed to verify OTP' });
    }
};

module.exports = {
    getOTP,
    checkOTP
};
