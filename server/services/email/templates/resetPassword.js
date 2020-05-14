import keys from '../../../config/keys';

const resetPassword = (id) => {
  return {
    subject: 'Reset Your Password',
    text: `Copy and paste this link in your browser to reset your password: ${process.env.CLIENT_URL}/password/reset/${id}`,
    html: `
      <html>
        <body>
          <div>
            <h3>
              Hi,
            </h3>
            <div>
              <p>To reset you password use the following link.</p>
              <p><a href="${process.env.CLIENT_URL}/password/reset/${id}">Click to go to our site and reset your password</a></p>
              <p>This link will expire after 1 hour.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

export default resetPassword;
