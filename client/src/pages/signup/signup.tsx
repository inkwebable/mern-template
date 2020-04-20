import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FlexContainer } from '../../modules/layout';
import { PageTitle1 } from '../../modules/page/pages.styled';
import { RegisterForm } from '../../modules/registerForm';
import AppRoutes from '../../shared/const/routes';

export const SignUpPage = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <PageTitle1>Sign Up</PageTitle1>
      <FlexContainer align="center">
        {showForm ? (
          <p>Please verify your email address via the email we have sent you.</p>
        ) : (
          <>
            <p>Please fill in the form below to get started.</p>
            <RegisterForm setShowForm={setShowForm} />
            <p>
              Already have an account? Request <Link to={AppRoutes.SignUp.Resend}>verification email</Link>
            </p>
          </>
        )}
      </FlexContainer>
    </>
  );
};
