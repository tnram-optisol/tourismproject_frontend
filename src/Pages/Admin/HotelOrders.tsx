import {
  Box,
  FormControl,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getAdminHotelOrdersData } from "store/reducers/adminReducer";
import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import Loader from "Layout/Loader";

const AdminHotelOrders = () => {
  const hotelOrders = useAppSelector((state) => state.admin.value.hotelOrders);
  const totalHotelOrders = useAppSelector(
    (state) => state.admin.value.totalHotelOrders
  );
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(getAdminHotelOrdersData({ limit, page, searchQuery }));
  }, [dispatch, limit, page, searchQuery]);

  const handleChangePage = (event: any, newPage: number) => {
    console.log(event, newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setLimit(event.target.value);
    setPage(0);
  };
  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <AdminLayout>
      <Box className="mt-2">
        {!loading ? (
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h6" color="blue">
                All Hotel Orders
              </Typography>
            </Grid>
            <Box className="mt-2">
              <FormControl>
                <TextField
                  className="mr-auto"
                  id="outlined-basic"
                  label="Outlined"
                  variant="outlined"
                  onChange={(event) => handleOnChange(event)}
                  placeholder="Search for Orders"
                  value={searchQuery}
                  autoFocus
                />
              </FormControl>
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
                  {hotelOrders.map((order, index) => (
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
                      count={totalHotelOrders}
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
};

export default AdminHotelOrders;
