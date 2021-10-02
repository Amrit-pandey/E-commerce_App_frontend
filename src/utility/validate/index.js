const validate = formValue => {
    const error = {};
    if (!formValue.productName) {
      error.productName = "enter the product-name";
    }
    if (!formValue.description) {
      error.description = "enter product description";
    }
    if (!formValue.price) {
      error.price = "enter product-price";
    }
    if(!formValue.imageURL) {
      error.imageURL = "set your product-image"
    }
    if(!formValue.name) {
      error.name = "enter your name"
    }
    if(!formValue.email) {
      error.email = "enter your email"
    }
    if(!formValue.password) {
      error.password = "enter your password"
    }
    if(!formValue.userType) {
      error.userType = "enter your userType"
    }
    return error;
  };
  
  export default validate;
  
  
  
  
  
  
  
  
  
  
  