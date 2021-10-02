import React from "react";
//? Libraries
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
//? layout
import Layout from "../Hoc/Layout";
//? action
import { loginUser } from "../store/actions/login";
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: {
    margin: "10px 0px",
    color: "red",
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);

  const { handleSubmit, errors, register } = useForm();

  const loginHandler = (reqBody, e) => {
    setLoading(true);
    const { loginUser } = props;
    loginUser(reqBody, ({ success, isLoading, error }) => {
      if (success) {
        toastr.success("Login Successfully!");
        history.push("/");
      } else if (error) {
        setLoading(isLoading);
        toastr.error("LogIn Failed!", "check your email&password!");
      } else {
        return null;
      }
    });
    e.target.reset();
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={3} md={3} />
      <Grid item xs={12} sm={6} md={6}>
        <Paper>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form
                className={classes.form}
                onSubmit={handleSubmit(loginHandler)}
                noValidate
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <div className={classes.errorMsg}>
                    <ErrorIcon /> Email is Required
                  </div>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <div className={classes.errorMsg}>
                    <WarningIcon /> Invalid Email
                  </div>
                )}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  inputRef={register({ required: true, minLength: 4 })}
                />
                {errors.password && errors.password.type === "required" && (
                  <div className={classes.errorMsg}>
                    <ErrorIcon /> Password is Required
                  </div>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <div className={classes.errorMsg}>
                    <WarningIcon /> Invalid Password
                  </div>
                )}
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: "#f0c040" }}
                    className={classes.submit}
                    disabled={errors.email || errors.password}
                  >
                    Sign In
                  </Button>
                )}

                <Grid container>
                  {/* <Grid item xs>
                  <Link href="#" variant="body2">
                     Forgot password?
                  </Link>
               </Grid> */}
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} md={3} />
    </Grid>
  );
}

const login = connect(null, { loginUser })(SignIn);

export default Layout(login);
