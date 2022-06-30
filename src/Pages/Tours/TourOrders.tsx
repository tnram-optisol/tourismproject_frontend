import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { getAdminTourOrders } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TourOrders() {
  const dispatch = useAppDispatch();
  const tourOrders = useAppSelector((state) => state.tour.value.tourOrders);
  const loading = useAppSelector((state) => state.tour.value.loading);
  const totalTourOrders = useAppSelector(
    (state) => state.tour.value.tourOrdersCount
  );
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getAdminTourOrders({ limit, page }));
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
  const chartData: {
    order_id: string;
    name: string;
    cost: number;
    status: string;
  }[] = [];
  const showChart = () => {
    tourOrders.map((e) =>
      chartData.push({
        order_id: e.order_id.split("-")[0],
        name: e.bookTour.tour.package_name,
        cost: e.orderCost,
        status: e.orderStatus ? "booked" : "canceled",
      })
    );
    return chartData;
  };
  return (
    <AdminLayout>
      {!loading ? (
        <Box className="mt-2">
          <Typography variant="h6">All Tour Orders</Typography>
          <MyTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "10%" }}> Order Id </TableCell>
                <TableCell sx={{ width: "10%" }}> Booked On </TableCell>
                <TableCell sx={{ width: "10%" }}> Recipient </TableCell>
                <TableCell sx={{ width: "10%" }}> Recipient Email </TableCell>
                <TableCell sx={{ width: "10%" }}> Recipient Contact </TableCell>
                <TableCell sx={{ width: "7%" }}>Package Name</TableCell>
                <TableCell sx={{ width: "7%" }}>From Location</TableCell>
                <TableCell sx={{ width: "7%" }}>To Location</TableCell>
                <TableCell sx={{ width: "7%" }}>Tour Cost</TableCell>
                <TableCell sx={{ width: "5%" }}>Discount</TableCell>
                <TableCell sx={{ width: "5%" }}>Deductions</TableCell>
                <TableCell align="right">Paid Price</TableCell>
                <TableCell sx={{ width: "7%" }}>Order Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tourOrders.map((tour, index) => (
                <TableRow key={index}>
                  <TableCell>{tour.order_id.split("-")[0]}</TableCell>
                  <TableCell>
                    {new Date(tour.orderdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{tour.purchased_by}</TableCell>
                  <TableCell>{tour.email}</TableCell>
                  <TableCell>{tour.user.contact}</TableCell>
                  <TableCell>{tour.bookTour.tour.package_name}</TableCell>
                  <TableCell>{tour.bookTour.tour.from}</TableCell>
                  <TableCell>{tour.bookTour.tour.to}</TableCell>
                  <TableCell className="text-danger">
                    INR {tour.bookTour.tour.cost}
                  </TableCell>
                  <TableCell className="text-danger">
                    {tour.discount}%
                  </TableCell>
                  <TableCell className="text-danger">
                    {" "}
                    INR {tour.bookTour.tour.cost - tour.orderCost}
                  </TableCell>
                  <TableCell className="text-danger">
                    {" "}
                    INR {tour.orderCost}
                  </TableCell>
                  <TableCell
                    className={
                      tour.orderStatus ? "text-success" : "text-danger"
                    }
                  >
                    {" "}
                    {tour.orderStatus ? "Booked" : "Canceled"}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  rowSpan={2}
                  colSpan={6}
                  count={totalTourOrders}
                  rowsPerPage={limit}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableBody>
          </MyTable>
          <Box className="mt-2">
            <Typography variant="h6">All Tour Orders</Typography>
            <LineChart
              width={500}
              height={250}
              data={showChart()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="order_id" name="Package Name" />
              <YAxis name="Order Cost" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#8884d8" />
              <Line type="monotone" dataKey="status" stroke="#ff0000" />
            </LineChart>
          </Box>
        </Box>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}

export default TourOrders;
