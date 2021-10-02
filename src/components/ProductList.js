import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { toastr } from "react-redux-toastr";
//? action
import { saveProductToEdit } from "../store/actions/update-product";
//? utility
import axios from "../utility/axios";
//? lodash
import _get from "lodash/get";
//? import from  material
import MaterialTable from "material-table";
import { Grid } from "@material-ui/core";

/**
 * This is the ProductList Page, here products displays in the Table.
 */
const ProductList = (props) => {
  const history = useHistory();
  const tableRef = React.createRef();

  const editProductHandler = (product) => {
    const { saveProductToEdit } = props;
    saveProductToEdit(product);
    history.push(`/update-product/${product._id}`);
  };

  const deleteProductHandler = (productId) => {
    axios({
      method: "POST",
      url: `/admin/delete-product?prodId=${productId}`,
      headers: {
        userid: localStorage.getItem("userId"),
      },
    })
      .then((response) => {
        if (response?.status ?? 0 === 200) {
          toastr.success("Product Deleted Successfully!");
          tableRef.current && tableRef.current.onQueryChange();
        }
      })
      .catch((err) => {
        // console.log(err, "error");
        toastr.error("Something went wrong!");
      });
  };

  const tableColumns = [
    { title: "Name", field: "name" },
    { title: "Price", field: "price" },
    { title: "Description", field: "description" },
  ];

  return (
    <div className="container">
      <Grid container>
        <Grid item xs={12}>
          {
            <MaterialTable
              title="Products List"
              options={{
                search: false,
                pageSize: 10,
                pageSizeOptions: [5, 10, 15, 20, 25, 30],
              }}
              tableRef={tableRef}
              columns={tableColumns}
              actions={[
                {
                  icon: "edit",
                  tooltip: "edit product",
                  onClick: (event, rowData) => {
                    editProductHandler(rowData);
                  },
                },
                {
                  icon: "delete",
                  tooltip: "delete product",
                  onClick: (event, rowData) => {
                    deleteProductHandler(rowData?._id);
                  },
                },
                {
                  icon: "refresh",
                  tooltip: "Refresh Products",
                  isFreeAction: true,
                  onClick: () =>
                    tableRef.current && tableRef.current.onQueryChange(),
                },
              ]}
              data={(query) =>
                new Promise((resolve, reject) => {
                  let productData = [];
                  axios({
                    method: "GET",
                    url: "/admin/products",
                    headers: {
                      userid: localStorage.getItem("userId"),
                    },
                  }).then((response) => {
                    console.log(response,"hii");
                 //   productData = [..._get(response, "data", [])];
                 productData = response.data.message
                    resolve({
                      data: productData,
                      page: _get(query, "page", 1),
                      totalCount: (productData || []).length,
                    });
                  });
                })
              }
            />
          }
        </Grid>
      </Grid>
    </div>
  );
};

const productList = connect(null, { saveProductToEdit })(ProductList);
export default productList;
