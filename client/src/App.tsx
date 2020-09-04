import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AuthContext from "./contexts/auth-context";

import "./App.css";
import Login from "./pages/authentications/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Societies from "./pages/society/Societies";
import Navigation from "./components/navigations/Navigation";
import LeftSideWrapper from "./components/leftSideWrapper/LeftSideWrapper";
import Students from "./pages/student/Students";
import CreateSociety from "./pages/society/CreateSociety";
import Society from "./pages/society/Society";

function App() {
  const [token, setToken] = useState<string>("");
  const [adminId, setAdminId] = useState<string>("");
  const [tokenExpiration, setTokenExpiration] = useState<string>("");

  useEffect(() => {
    const adminInfoToken = JSON.parse(localStorage.getItem("adminInfo")!);
    const adminIdLocal = JSON.parse(localStorage.getItem("adminId")!);
    const tokenExp = JSON.parse(localStorage.getItem("tokenExpiration")!);
    if (adminInfoToken && adminIdLocal && tokenExp) {
      setToken(adminInfoToken);
      setAdminId(adminIdLocal);
      setTokenExpiration(tokenExp);
    }
  }, []);

  const login = (token: string, adminId: string, tokenExpiration: string) => {
    setToken(token);
    setAdminId(adminId);
    setTokenExpiration(tokenExpiration);
  };

  const logout = () => {
    setToken("");
    setAdminId("");
    setTokenExpiration("");
    localStorage.removeItem("adminInfo");
    localStorage.removeItem("adminId");
    localStorage.removeItem("tokenExpiration");
  };

  return (
    <Router>
      <AuthContext.Provider
        value={{
          token,
          adminId,
          login,
          logout,
          tokenExpiration,
        }}
      >
        <main className="main-content">
          <Navigation />
          <div className="content">
            {token && (
              <div className="left_side_wrapper">
                <LeftSideWrapper />
              </div>
            )}
            <Switch>
              {token && <Route path="/" exact component={Dashboard} />}
              {token && <Redirect path="/login" to="/" />}
              {token && <Route path="/societies" component={Societies} />}
              {token && <Route path="/students" component={Students} />}
              {token && (
                <Route path="/create_society" component={CreateSociety} />
              )}
              {token && (
                <Route path="/society/:society_id" component={Society} />
              )}
              {!token && <Route path="/login" component={Login} />}
            </Switch>
          </div>
        </main>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
