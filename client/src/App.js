import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <main className="main-content">
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    </Router>
  )
}

export default App;