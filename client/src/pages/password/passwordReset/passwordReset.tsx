import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FlexContainer } from '../../../modules/layout';
import { PageTitle1 } from '../../../modules/page/pages.styled';
import { ResetPasswordForm } from '../../../modules/resetPasswordForm';

export const PasswordResetPage: React.FunctionComponent = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(true);

  return (
    <>
      <PageTitle1>Password Reset</PageTitle1>
      <FlexContainer align="center">
        {!showForm ? (
          <p>
            Your password has been updated, please
            <Link to="/login"> login</Link>
          </p>
        ) : (
          <>
            <p>Please enter your new password in the form below.</p>
            <ResetPasswordForm setShowForm={setShowForm} />
          </>
        )}
      </FlexContainer>
    </>
  );
};
