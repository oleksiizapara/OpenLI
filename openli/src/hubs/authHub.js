import { Hub, Logger } from 'aws-amplify';

// const logger = new Logger('My-Logger');

const listener = data => {
  switch (data.payload.event) {
    case 'signIn':
      // logger.error('user signed in'); //[ERROR] My-Logger - user signed in
      break;
    case 'signUp':
      // logger.error('user signed up');
      break;
    case 'signOut':
      // logger.error('user signed out');
      break;
    case 'signIn_failure':
      // logger.error('user sign in failed');
      break;
    case 'configured':
    // logger.error('the Auth module is configured');
  }
};

export const listen = () => {
  Hub.listen('auth', listener);
};
