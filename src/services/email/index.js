import nodemailer from 'nodemailer'
import { MAIL_ADDRESS, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT, MAIL_SECURE } from '../../config';

let transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secureConnection: MAIL_SECURE,
    auth: {
        user: MAIL_ADDRESS,
        pass: MAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const emailVerification = (data) => {
    const message = {
        from: 'vasanthdev06@gmail.com',
        to: data.email,
        subject: 'Email Verification',
        text : `Token -  ${data.token}`
    }

    transporter.sendMail(message, (error, info) => {
        if (error) {
            return console.log(error, info)
        } else {
            console.log(info)
            resolve({});
        }
    })
}

