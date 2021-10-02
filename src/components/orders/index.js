import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Hoc/Layout";
//? redux
import { connect } from "react-redux";
//? action
import { fetchOrder } from "../../store/actions/fetch-orders";
//? material-ui
import { CircularProgress } from "@material-ui/core";

/**
 * This is Orders page where we can see our product which are orderd.
 */
const Orders = ({ data, isLoading, success, error, fetchOrder, ordersLength }) => {
   //?de-structuring orders data
   useEffect(() => {
      fetchOrder();
   }, []);

   return (
      <div>
         <style>{`
      .loader {
        position: fixed; /* or absolute */
        top: 40%;
        left: 50%;
      }
      .order {
        margin: 1rem;
      }
    `}</style>
         {/* show loader when fetching */}
         {isLoading ? (
            <div className="loader">
               <CircularProgress color="primary" />
            </div>
         ) : (
            <React.Fragment>
               {success ? (
                  //? shows content when loader is stopped and success is true
                  <>
                     <div className="order">
                        <Link to="/">Back to HomePage</Link>
                     </div>
                     <div className="placeorder">
                        <div className="placeorder-info">
                           <div>
                              {ordersLength === 0 ? (
                                 <div>Your Order is empty</div>
                              ) : (
                                 (data || []).map((order) => {
                                    const { products } = order || {};
                                    let total = 0;
                                    return (products || []).map((prod) => {
                                       const { product, quantity } = prod || {};
                                       const { name, price, image } = product || {};
                                       total += price;
                                       return (
                                          <div
                                             style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                             }}
                                             className="row mb-2"
                                          >
                                             <div
                                                className="col-md-3"
                                                style={{
                                                   width: "60px",
                                                   height: "60px",
                                                }}
                                             >
                                                <img
                                                   // style={{ height: "100%", width: "auto" }}
                                                   src={image}
                                                   alt="prod"
                                                   height="60px"
                                                   width="60px"
                                                />
                                             </div>
                                             <div
                                                className="col-md-3"
                                                style={{ fontWeight: "bold" }}
                                             >
                                                <span>{name}</span>
                                             </div>
                                             <div className="col-md-3">
                                                <span>Rs.{price}</span>
                                             </div>
                                             <div className="col-md-3">
                                                <span>Quantity: {quantity}</span>
                                             </div>
                                          </div>
                                       );
                                    });
                                 })
                              )}
                              {/* </ul> */}
                           </div>
                        </div>
                     </div>
                  </>
               ) : (
                  //? shows error message if not success
                  <p>{error}</p>
               )}
            </React.Fragment>
         )}
      </div>
   );
};

const mapStateToProps = (state) => {
   const { data, isLoading, success, error } = state?.orders ?? {};
   const ordersLength = (state?.orders?.data ?? []).length;
   return {
      ordersLength,
      data,
      isLoading,
      success,
      error,
   };
};

const orderSummary = connect(mapStateToProps, { fetchOrder })(Orders);
export default Layout(orderSummary);
