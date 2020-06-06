import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AuthContext from './contexts/auth-context';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateSociety from './pages/CreateSociety';
import Navigation from './components/navigations/Navigation';

function App() {
  const [token, setToken] = useState("");
  const [adminId, setAdminId] = useState("");
  const [tokenExpiration, setTokenExpiration] = useState('');

  useEffect(() => {
    const adminInfoToken = JSON.parse(
      localStorage.getItem('adminInfo')
    );
    const adminIdLocal = JSON.parse(localStorage.getItem('adminId'));
    const tokenExp = JSON.parse(
      localStorage.getItem('tokenExpiration')
    );
    if (adminInfoToken && adminIdLocal && tokenExp) {
      setToken(adminInfoToken);
      setAdminId(adminIdLocal);
      setTokenExpiration(tokenExp);
    }
  })

  const login = (token, adminId, tokenExpiratopn) => {
    setToken(token);
    setAdminId(adminId);
    setTokenExpiration(tokenExpiratopn);
  };

  const logout = () => {
    setToken(null);
    setAdminId(null);
    setTokenExpiration(null);
    localStorage.removeItem('adminInfo');
    localStorage.removeItem('adminId');
    localStorage.removeItem('tokenExpiration');
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          adminId,
          login,
          logout,
          tokenExpiration
        }}>
        <main className="main-content">
          <Navigation />
          <Switch>
            {token && <Route path="/" exact component={Dashboard} />}
            {token && <Route path="/create_society" component={CreateSociety} />}
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </AuthContext.Provider>
    </Router>
  )
}

export default App;