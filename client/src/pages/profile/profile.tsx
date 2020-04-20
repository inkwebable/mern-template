import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { PageTitle1 } from '../../modules/page/pages.styled';
import { APIUser } from '../../shared/const';

export const ProfilePage = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState({ name: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loadingProfile, setloadingProfile] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!submitted) {
      axios
        .get(APIUser.Index)
        .then(res => {
          if (res.status === 200) {
            setUserProfile({ name: res.data.user.name });
          } else {
            setError(res.data.error);
          }

          setSubmitted(true);
          setloadingProfile(false);
        })
        .catch(err => {
          setError(err.response.data.error);
          setSubmitted(true);
          setloadingProfile(false);
        });
    }
  }, [submitted]);

  if (error) {
    return <p>{error}</p>;
  }

  return <>{loadingProfile ? <p>Loading</p> : <PageTitle1>Welcome {userProfile.name}</PageTitle1>}</>;
};
