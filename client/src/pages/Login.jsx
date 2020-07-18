import React, { useContext, useRef, useState } from "react";
import { Alert, Input } from "element-react";
import AuthContext from "../contexts/auth-context";
import "./Login.scss";

const Login = (props) => {
  const email = useRef();
  const password = useRef();
  const [status, setStatus] = useState("");
  const context = useContext(AuthContext);

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
      .then((res) => {
        if (res.message !== "Email or Password isn't matched") {
          context.login(res.accessToken, res.adminId, res.expiresIn);
          localStorage.setItem("adminInfo", JSON.stringify(res.accessToken));
          localStorage.setItem("adminId", JSON.stringify(res.adminId));
          localStorage.setItem(
            "tokenExpiration",
            JSON.stringify(res.expiresIn)
          );
          props.history.push("/");
        } else {
          setStatus(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="login_wrapper" id="login_wrapper">
      {status !== "" && (
        <Alert title={status} type="error" className="status_wrapper" />
      )}
      <form className="login_form" onSubmit={handleLogin}>
        <div className="form_group">
          <label htmlFor="email">Email</label>
          <Input type="text" placeholder="Email" id="email" ref={email} />
        </div>
        <div className="form_group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            id="password"
            ref={password}
          />
        </div>
        <button type="submit" className="login_action_btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
