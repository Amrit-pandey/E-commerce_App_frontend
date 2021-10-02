import React from "react";
import ReactDOM from "react-dom";
//? react-router
import { useHistory } from "react-router-dom";
//? material-ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

/**
 * Displays the order Message in a modal.
 */
const Modal = (props) => {
   const history = useHistory();

   return props.show
      ? ReactDOM.createPortal(
           <div>
              <Dialog
                 open={true}
                 //onClose={handleClose}
                 aria-labelledby="responsive-dialog-title"
                 fullWidth={true}
              >
                 <DialogTitle id="responsive-dialog-title">
                    {"ThankYou! your Order is successful?"}
                 </DialogTitle>
                 <DialogContent>
                    <DialogContentText>
                       you can check your order summary to click the button
                    </DialogContentText>
                 </DialogContent>
                 <DialogActions>
                    <Button color="primary" onClick={() => history.push("/orders")} autoFocus>
                       See your orders
                    </Button>
                 </DialogActions>
              </Dialog>
           </div>,
           document.querySelector("#modal")
        )
      : null;
};

export default Modal;
