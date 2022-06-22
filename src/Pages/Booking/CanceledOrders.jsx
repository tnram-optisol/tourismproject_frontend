import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getCanceledOrders } from "Services/api/ordersAPI";
import MyTable from "Component/Table/MyTable";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getUserBookingData } from "store/reducers/userReducer";
import { useAppSelector } from "hooks/useAppSelector";

export default function CanceledOrders(props) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const user = token !== "" ? JSON.parse(atob(token.split(".")[1])) : {};
  const [orderCanceled, setOrderCanceled] = useState([]);
  const loading = useAppSelector((state) => state.user.value.loading);
  
  const getBookings = () => {
    getCanceledOrders()
      .then((res) => {
        setOrderCanceled([...res.data]);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(getUserBookingData(user.id));
  };

  useEffect(() => getBookings, []);

  return (
    <Box>
      <ToastContainer />
      <Typography variant="h6" color="blueviolet">
        Canceled Orders
      </Typography>
      {orderCanceled.length > 0 ? (
        <MyTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "5%" }}> Order Id </TableCell>
              <TableCell sx={{ width: "5%" }}> Package Name </TableCell>
              <TableCell sx={{ width: "5%" }}> Booked On </TableCell>
              <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
              <TableCell sx={{ width: "5%" }}> Order Cost </TableCell>
              <TableCell sx={{ width: "5%" }}> Status </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderCanceled.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bookTour.tour.package_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(row.orderdAt).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bookTour.max_person}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.orderCost}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className={row.orderStatus ? "text-success" : "text-danger"}
                >
                  {row.orderStatus ? "" : "Refund Initiated"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MyTable>
      ) : (
        <h6 className="text-danger">Cancel a Order to View</h6>
      )}
    </Box>
  );
}
