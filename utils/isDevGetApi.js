import keys from '../config/keys';

export default () => {
  return keys.nodeEnv === 'development' ? 'http://localhost:5001' : keys.clientUrl;
};
