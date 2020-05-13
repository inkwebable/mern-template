import keys from '../config/keys';

const generateAuthCookies = (
  token,
  res,
  maxAge = (keys.dbEnv === 'testing' ? 1000 * 60 * 60 * 8 : 1000 * 60 * 60 * 1)
) => {
  // Split token into array to set onto cookies
  const arrayToken = token.split('.');

  // Reset Payload Cookie expiration time
  res.cookie('_p', `${arrayToken[0]}.${arrayToken[1]}`, {
    maxAge,
    secure: false, // TODO: Set to true when not on localhost
    sameSite: true,
    httpOnly: false,
  });

  // Reset the sig (as it may be missing)
  res.cookie('_s', `${arrayToken[2]}`, {
    maxAge,
    secure: false, // TODO: Set to true when not on localhost
    sameSite: true,
    httpOnly: true,
  });

  return res;
};

export default generateAuthCookies;
