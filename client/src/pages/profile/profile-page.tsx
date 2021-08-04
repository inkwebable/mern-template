import axios from 'axios';
import React, { useEffect, useState } from 'react';

import useMqttSub from '../../components/mqtt/useMqttSub';
import { PageTitle1 } from '../../components/page/pages.styled';
import { APIUser } from '../../shared/const';

const ProfilePage = (): JSX.Element => {
  const [userProfile, setUserProfile] = useState({ name: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showStar, setShowStar] = useState<boolean>(false);
  const [loadingProfile, setloadingProfile] = useState(true);
  const [error, setError] = useState<string>('');
  const { message } = useMqttSub([`MERN/evt/star`]);

  useEffect(() => {
    if (message) {
      setShowStar(true);
    }

    if (!message) {
      setShowStar(false);
    }
  }, [message]);

  useEffect(() => {
    if (!submitted) {
      axios
        .get(APIUser.Index)
        .then((res) => {
          if (res.status === 200) {
            setUserProfile({ name: res.data.user.name });
          } else {
            setError(res.data.error);
          }

          setSubmitted(true);
          setloadingProfile(false);
        })
        .catch((err) => {
          setError(err.response.data.error);
          setSubmitted(true);
          setloadingProfile(false);
        });
    }
  }, [submitted]);

  if (error) {
    return <p>{error}</p>;
  }

  // eslint-disable-next-line react/jsx-one-expression-per-line
  return (
    <>
      {loadingProfile ? (
        <p>Loading</p>
      ) : (
        <PageTitle1>
          Welcome to your profile
          {userProfile.name}
        </PageTitle1>
      )}
      {showStar && <p>You are a Star</p>}
    </>
  );
};

export default ProfilePage;
