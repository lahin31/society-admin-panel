import React, { useRef } from "react";
import { Button, Input } from "element-react";
import "./Login.scss";

const Login = (props) => {
  const email = useRef();
  const password = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    let emailVal = email.current.refs.input.value;
    let passwordVal = password.current.refs.input.value;
    fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailVal,
        passwordVal,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_wrapper" id="login_wrapper">
      <form className="login_form" onSubmit={handleLogin}>
        <div className="form_group">
          <label>Email</label>
          <Input type="text" placeholder="Email" ref={email} />
        </div>
        <div className="form_group">
          <label>Password</label>
          <Input type="password" placeholder="Password" ref={password} />
        </div>
        <button type="submit" className="login_action_btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
