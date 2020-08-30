import React from 'react';

export default React.createContext({
	token: '',
	adminId: '',
  tokenExpiration: '',
  // eslint-disable-next-line
  login: (token, adminId, tokenExpiration) => {},
  logout: () => {},
})