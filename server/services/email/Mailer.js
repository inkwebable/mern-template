import nodemailer from 'nodemailer';
import keys from '../../config/keys';

class Mailer {
  constructor({
    host = keys.mailHost,
    port = keys.mailPort,
    secure = true,
    user = keys.mailUser,
    pass = keys.mailPass,
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

  async send(to, content, from = keys.mailUser) {
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
