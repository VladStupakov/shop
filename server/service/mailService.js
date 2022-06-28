import nodemailer from 'nodemailer'

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            ignoreTLS: true,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        })
    }

    async sendVarificationEmail(to, link) {
        this.transporter.verify((err, success) => {
            if (err) console.error(err);
            console.log('Your config is correct');
        });
        await this.transporter.sendMail({
            from: process.env.MAILTRAP_USER,
            to,
            subject: 'Account activation',
            html:
                `
                <div>
                    <h1>Activate your account</h1>
                    <a href="${link}">${link}</a>
                </div
                `
        })
    }
}

export default new MailService()