import keys from '../../../config/keys';

const confirmEmail = (name, id) => {
  return {
    subject: 'Confirm Your Email Address',
    text: `Copy and paste this link in your browser to confirm your email address: ${keys.clientUrl}/signup/confirm/${id}`,
    html: `
      <html>
        <body>
          <div>
            <h3>
              Hi ${name},
            </h3>
            <div>
              <a href="${keys.clientUrl}/signup/confirm/${id}">Click to confirm your email address</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

export default confirmEmail;
