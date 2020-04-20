export enum APILogin {
  Index = '/api/login',
}

export enum APISignUp {
  Index = '/api/signup',
  Confirm = '/api/signup/confirm',
  Resend = '/api/signup/confirm/resend',
}

export enum APIPassword {
  Forgotten = '/api/password/forgotten',
  Reset = '/api/password/reset',
}

export enum APIUser {
  Index = '/api/user',
}

const ApiRoutes = {
  APILogin,
  APISignUp,
  APIPassword,
  APIUser,
};

export default ApiRoutes;
