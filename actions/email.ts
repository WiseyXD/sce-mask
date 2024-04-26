import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.EMAIL_USER,

        // Always use SMTP Key on Brevo
        pass: process.env.SMTP_KEY,
    },
});

// async..await is not allowed in global scope, must use a wrapper
export async function main(content: string, users: any) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Creator Of SCOE.mask 👻" <SCOE.mask@JS.com>', // sender address
        to: users, // list of receivers
        subject: 'Email Verification', // Subject line
        // text: "Test", // plain text body
        html: `${content}`, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
}
