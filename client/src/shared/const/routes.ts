export enum Home {
  Index = '/',
}

export enum Profile {
  Index = '/profile',
}

export enum Login {
  Index = '/login',
}

export enum SignUp {
  Index = '/signup',
  Confirm = '/signup/confirm/:id',
  Resend = '/signup/confirm/resend',
}

export enum Password {
  Forgotten = '/password/forgotten',
  Reset = '/password/reset/:id',
}

const AppRoutes = {
  Home,
  Profile,
  Login,
  SignUp,
  Password,
};

export default AppRoutes;
