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

import { getAdminTourOrdersData } from "store/reducers/adminReducer";
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

const AdminTourOrders = () => {
  const tourOrders = useAppSelector((state) => state.admin.value.tourOrders);
  const totalTourOrders = useAppSelector(
    (state) => state.admin.value.totalTourOrders
  );
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(getAdminTourOrdersData({ limit, page, searchQuery }));
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
  return (
    <AdminLayout>
      <Box className="mt-2">
        {!loading ? (
          <Grid container spacing={2}>
            <Box className="mt-2">
              <Typography variant="h6" color="blue">
                All Tour Orders
              </Typography>
              <FormControl>
                <TextField
                  className="m-2"
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
                    <TableCell>Package </TableCell>
                    <TableCell>OrderCost</TableCell>
                    <TableCell>Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tourOrders.map((order, index) => (
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
                        {order.bookTour.tour.package_name}
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
            <Box className="mt-2">
              <Typography variant="h6">All Tour Orders</Typography>
              <LineChart
                width={400}
                height={250}
                data={tourOrders}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="bookTour.tour.package_name"
                  name="Package Name"
                />
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
    </AdminLayout>
  );
};

export default AdminTourOrders;
