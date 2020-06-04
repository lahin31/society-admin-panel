import React from 'react';

export default React.createContext({
  token: null,
  adminId: null,
  tokenExpiration: null,
  // eslint-disable-next-line
  login: (token, adminId, tokenExpiration) => {},
  logout: () => {},
});