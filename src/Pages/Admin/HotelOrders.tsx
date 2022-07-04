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
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    <Box className="mt-2">
      {!loading ? (
        <Grid container spacing={2}>
          <Box className="mt-2">
            <Typography variant="h6" color="blue">
              All Hotel Orders
            </Typography>
            <FormControl>
              <TextField
                className="mr-auto form-control d-block"
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
                      {order.order_id.split("-")[0]}
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
          <Box className="mt-2">
            <Typography variant="h6">All Hotel Orders</Typography>
            <LineChart
              width={400}
              height={250}
              data={hotelOrders}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bookRoom.room.room_name" />
              <YAxis name="Order Cost" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orderCost" stroke="#8884d8" />
            </LineChart>
          </Box>
        </Grid>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

export default AdminHotelOrders;
