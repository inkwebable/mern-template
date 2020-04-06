import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { PageTitle1, PageTitle2 } from '../../modules/page/pages.styled';

// import { ContainerStyled } from '@modules/core/container';
// import { FlexContainer } from '@modules/core/flex-container';

export const ProfilePage = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState({ name: '*NAME' });
  const [loadedProfile, setloadedProfile] = useState(false);
  const [loadingProfile, setloadingProfile] = useState(false);

  useEffect(() => {
    if (!loadedProfile) {
      setloadingProfile(true);
      axios
        .get('/api/user')
        .then(res => {
          setUserProfile({ name: res.data.user.name });
          setloadingProfile(false);
          setloadedProfile(true);
        })
        .catch(err => {
          // prevent no op react msg
          if (loadedProfile) {
            setloadingProfile(false);
            setloadedProfile(false);
          }
        });
    }
  }, [loadedProfile]);

  return (
    <>
      {loadedProfile
        ? (
          <PageTitle1>Welcome {userProfile.name}</PageTitle1>
        )
        : (
          <p>Loading</p>
        )}
    </>
  );
};
