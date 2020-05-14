import nodemailer from 'nodemailer';

class Mailer {
  constructor({
    host = process.env.MAIL_HOST,
    port = process.env.MAIL_PORT,
    secure = true,
    user = process.env.MAIL_USER,
    pass = process.env.MAIL_PASSWORD,
  }) {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        // These environment variables will be pulled from the config file
        user,
        pass,
      },
    });
  }

  async send(to, content, from = process.env.MAIL_USER) {
    // The from and to addresses for the email that is about to be sent.
    const contacts = {
      from,
      to,
    };

    // Combining the content and contacts into a single object that can
    // be passed to Nodemailer.
    const email = { ...content, ...contacts };

    await this.transporter.sendMail(email);
  }
}

export default Mailer;
