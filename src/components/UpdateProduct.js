import React from "react";
//?Libraries
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toastr } from "react-redux-toastr";
//? hoc
import Layout from "../Hoc/Layout";
//?action
import { updateProduct } from "../store/actions/update-product";
//? material-ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import EditIcon from "@material-ui/icons/Edit";
import { Paper } from "@material-ui/core";

/**
 * This is update product form page, here admin can edit the product.
 */
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

function UpdateProduct(props) {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const { productData } = props;
  const { handleSubmit, errors, reset, register } = useForm({
    defaultValues: {
      ...productData,
    },
  });
  const updateProductHandler = (reqBody, e) => {
    setLoading(true);
    const { updateProduct } = props;
    reqBody.prodId= productData._id;
    updateProduct(reqBody, ({ isLoading, success, error }) => {
      if (success) {
        toastr.success("Product Updated Successfully!");
        history.push("/");
      } else if (error) {
        setLoading(isLoading);
        toastr.error("Product Update Failed!");
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
                <EditIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Update-Product
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit(updateProductHandler)}
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
                {/* show loader when click on the  button */}
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
                    Update Product
                  </Button>
                )}
              </form>
            </div>
          </Container>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} md={3} />
    </Grid>
  );
}

const mapStateToProps = (state) => {
  const { productToEdit } = state?.updateProduct ?? {};
  return {
    productData: productToEdit,
  };
};

const updateProductForm = connect(mapStateToProps, { updateProduct })(
  UpdateProduct
);

export default Layout(updateProductForm);
