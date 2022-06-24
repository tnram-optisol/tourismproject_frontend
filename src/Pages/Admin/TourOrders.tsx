import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import Loader from "Layout/Loader";
import React, { useEffect, useState } from "react";
import { getAdminOrdersData } from "store/reducers/adminReducer";

function AdminTourOrders() {
  const tourOrders = useAppSelector((state) => state.admin.value.tourOrders);
  const totalTourOrders = useAppSelector(
    (state) => state.admin.value.totalTourOrders
  );
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    dispatch(getAdminOrdersData({ limit, page }));
  }, [dispatch, limit, page]);

  const handleChangePage = (event: any, newPage: number) => {
    console.log(event, newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setLimit(event.target.value);
    setPage(0);
  };
  return (
    <AdminLayout>
      <Box className="mt-2">
        {!loading ? (
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="blue">
                All Tour Orders
              </Typography>
            </Grid>
            <Box className="mt-2">
              <MyTable>
                <TableHead>
                  <TableRow>
                    <TableCell>Order Id</TableCell>
                    <TableCell>Order By</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>OrderCost</TableCell>
                    <TableCell>Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tourOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-primary">
                        {order.order_id}
                      </TableCell>
                      <TableCell className="text-primary">
                        {order.purchased_by}
                      </TableCell>
                      <TableCell className="text-primary">
                        {order.email}
                      </TableCell>
                      <TableCell className="text-primary">
                        {order.description}
                      </TableCell>
                      <TableCell className="text-danger">
                        ₹ {order.orderCost}
                      </TableCell>
                      <TableCell
                        className={
                          order.orderStatus && order.paymentStatus
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {" "}
                        {order.orderStatus && order.paymentStatus
                          ? "Booked"
                          : "Canceled"}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10]}
                      rowSpan={2}
                      colSpan={4}
                      count={totalTourOrders}
                      rowsPerPage={limit}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableBody>
              </MyTable>
            </Box>
          </Grid>
        ) : (
          <Loader />
        )}
      </Box>
    </AdminLayout>
  );
}

export default AdminTourOrders;
