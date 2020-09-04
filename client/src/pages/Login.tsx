import React, { useState, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import AuthContext from "../contexts/auth-context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

interface LoginComponentProps extends RouteComponentProps<any> {}

const Login: React.FC<LoginComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const context = useContext(AuthContext);

  const handleLogin = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    fetch("/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emailVal: email,
        passwordVal: password,
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
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
