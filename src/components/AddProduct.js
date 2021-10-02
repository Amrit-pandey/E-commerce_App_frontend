import React from "react";
//?libraries
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
//?utility
import axios from "../utility/axios";
//? hoc
import Layout from '../Hoc/Layout';
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import Paper from "@material-ui/core/Paper";

/**
 * This is the Add product form page where admine can add product!
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        Your Website
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMsg: {
    margin: "10px 0px",
    color: "red",
  },
}));

function AddProduct(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const { handleSubmit, errors, reset, register } = useForm();

  const addProductHandler = (reqBody, e) => {
    setLoading(true);
    axios({
      method: "POST",
      url: "/admin/add-product",
      data: { ...reqBody },
      headers: {
        userid: localStorage.getItem("userId"),
      },
    })
      .then((response) => {
        if (response?.status ?? 0 === 200) {
          setLoading(false);
          toastr.success("Product Added Successfully!");
          history.push("/");
        }
      })
      .catch((err) => {
        // console.log(err,"errMsg");
        setLoading(false);
        toastr.error("Product didn't Added");
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
                <AddCircleIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Add-Product
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(addProductHandler)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      type="text"
                      id="name"
                      label="Product Name"
                      inputRef={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <div className={classes.errorMsg}>
                        <ErrorIcon /> Product-Name is Required
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      type="text"
                      label="Description"
                      name="description"
                      autoComplete="description"
                      inputRef={register({ required: true })}
                    />
                    {errors.description &&
                      errors.description.type === "required" && (
                        <div className={classes.errorMsg}>
                          <ErrorIcon /> Add Product Description
                        </div>
                      )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="price"
                      type="number"
                      label="Price"
                      name="price"
                      autoComplete="price"
                      inputRef={register({ required: true })}
                    />
                    {errors.price && errors.price.type === "required" && (
                      <div className={classes.errorMsg}>
                        <ErrorIcon /> Add Product Price
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="image"
                      label="Image"
                      type="text"
                      id="image"
                      autoComplete="image"
                      inputRef={register({ required: true })}
                    />
                    {errors.image && errors.image.type === "required" && (
                      <div className={classes.errorMsg}>
                        <ErrorIcon /> Add Product Image
                      </div>
                    )}
                  </Grid>
                </Grid>
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <CircularProgress />
                  </div>
                ) : (
                  <Button
                    style={{ background: "#f0c040" }}
                    type="submit"
                    fullWidth
                    reset={reset}
                    variant="contained"
                    className={classes.submit}
                    disabled={
                      errors.name ||
                      errors.description ||
                      errors.price ||
                      errors.image
                    }
                  >
                    Add Product
                  </Button>
                )}
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} md={3} />
    </Grid>
  );
}

export default Layout(AddProduct);
