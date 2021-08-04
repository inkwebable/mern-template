import { FlexContainer } from 'components/layout/layout.styled';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { PageTitle1 } from '../../components/page/pages.styled';
import { RegisterForm } from '../../components/registerForm/registerForm';
import AppRoutes from '../../shared/const/routes';

const SignUpPage = (): JSX.Element => {
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

export default SignUpPage;
