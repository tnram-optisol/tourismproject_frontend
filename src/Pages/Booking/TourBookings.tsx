import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  getOrders,
  getCanceledOrders,
  refundOrders,
} from "Services/api/ordersAPI";
import {
  cancelRoomBookings,
  cancelTourBookings,
} from "Services/api/bookingAPI";
import MyTable from "Component/Table/MyTable";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getUserBookingData } from "store/reducers/userReducer";
import { useAppSelector } from "hooks/useAppSelector";
import Loader from "Layout/Loader";
import { BookTourModel } from "utils/model/tourModel";


export default function TourBookings(props: any) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const user = token !== "" ? JSON.parse(atob(token!.split(".")[1])) : {};
  const navigate = useNavigate();
  const tour = useAppSelector((state) => state.user.value.tourOrders);
  const loading = useAppSelector((state) => state.user.value.loading);
  let discount = 0;
  let totalCost = 0;

  const getBookings = () => {
    if (user.id > 0) {
      dispatch(getUserBookingData(user.id));
    }
  };

  useEffect(() => getBookings, []);

  const handleCancel = (data: BookTourModel, name: string) => {
    let userConfirm = window.confirm(`Is it ok to cancel booking for ${name}`);
    console.log(data);
    if (userConfirm) {
       cancelTourBookings(data.book_id)
         .then((res) => {
           toast(res.data);
         })
         .catch((err) => {
           toast(err);
         });
    }
  };

  const calculateCost = (totalPerson: number, tourCost: number, totalDays: number) => {
    let discountPrice = 0;
    if (totalPerson > 3) {
      discount = 40;
      discountPrice = tourCost - (tourCost / 100) * discount;
      totalCost = discountPrice * totalPerson;
      return totalCost;
    } else {
      discount = 20;
      discountPrice = tourCost - (tourCost / 100) * discount;
      totalCost = discountPrice * totalPerson;
      return totalCost;
    }
  };

  const handlePayNow = (row: BookTourModel) => {
    navigate("/payment", {
      replace: true,
      state: {
        data: row,
        totalCost: totalCost,
        discount: discount,
      },
    });
  };

  const viewOrder = (id: number) => {
    getOrders(id)
      .then((res) => {
        navigate("/my/bookings/my/orders", { state: res.data, replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrder = (row: BookTourModel) => {
    let userConfirm = window.confirm(
      `Is it ok to cancel order for ${row.tour.package_name}`
    );
    console.log(row);
    if (userConfirm) {
      refundOrders({
        bookId: row.book_id,
      })
        .then((res) => {
          getBookings();
          toast("Refund Initiated");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <Box>
        <ToastContainer />
        <Typography variant="h6" color="blueviolet">
          Active Orders
        </Typography>
        {loading ? (
          <Loader />
        ) : tour.length > 0 ? (
          <Box>
            <Typography variant="h6" color="blueviolet">
              Tour Orders
            </Typography>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}> Package Name </TableCell>
                  <TableCell sx={{ width: "5%" }}> Booked On </TableCell>
                  <TableCell sx={{ width: "1%" }}> Total Days </TableCell>
                  <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
                  <TableCell sx={{ width: "1%" }}> Discount </TableCell>
                  <TableCell sx={{ width: "5%" }}> Cost </TableCell>
                  <TableCell sx={{ width: "4%" }}>
                    {" "}
                    Price After Discount{" "}
                  </TableCell>
                  <TableCell sx={{ width: "5%" }}> Payment Status </TableCell>
                  <TableCell
                    sx={{ width: "10%", textAlign: "center" }}
                    colSpan={3}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tour.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.tour.package_name}
                    </TableCell>
                    <TableCell>{row.book_date}</TableCell>
                    <TableCell>{row.tour.total_days}</TableCell>
                    <TableCell>{row.max_person}</TableCell>
                    <TableCell>
                      {" "}
                      {row.max_person > 3 ? "40 % " : "20%"}{" "}
                    </TableCell>
                    <TableCell> ₹​ {row.max_person * row.tour.cost} </TableCell>
                    <TableCell>
                      {" "}
                      ₹​{" "}
                      {calculateCost(
                        row.max_person,
                        row.tour.cost,
                        row.tour.total_days
                      )}{" "}
                    </TableCell>
                    <TableCell
                      className={row.payment ? "text-success" : "text-danger"}
                    >
                      {row.payment ? "Successfully Booked" : "Pending"}
                    </TableCell>
                    {!row.payment ? (
                      <TableCell>
                        <Tooltip
                          title={<>Use Promotion code VIPTOUR at checkout</>}
                        >
                          <Button
                            variant="outlined"
                            color="success"
                            className="btn m-2"
                            onClick={() => handlePayNow(row)}
                          >
                            {" "}
                            Pay Now{" "}
                          </Button>
                        </Tooltip>
                        <Button
                          variant="outlined"
                          color="error"
                          className="btn m-2"
                          onClick={() =>
                            handleCancel(row, row.tour.package_name)
                          }
                        >
                          {" "}
                          Cancel{" "}
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          className="btn m-2"
                          onClick={() => viewOrder(row.book_id)}
                        >
                          {" "}
                          View Order{" "}
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          className="btn m-2"
                          onClick={() => cancelOrder(row)}
                        >
                          {" "}
                          Cancel Order{" "}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </MyTable>
          </Box>
        ) :  (
          <h6 className="text-danger">Book A Package to View</h6>
        )}
      </Box>
    </>
  );
}
