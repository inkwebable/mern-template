const confirmEmail = (name, id) => {
  return {
    subject: 'Confirm Your Email Address',
    text: `Copy and paste this link in your browser to confirm your email address: ${process.env.CLIENT_URL}/signup/confirm/${id}`,
    html: `
      <html>
        <body>
          <div>
            <h3>
              Hi ${name},
            </h3>
            <div>
              <a href="${process.env.CLIENT_URL}/signup/confirm/${id}">Click to confirm your email address</a>
            </div>
          </div>
        </body>
      </html>
    `,
  };
};

export default confirmEmail;
