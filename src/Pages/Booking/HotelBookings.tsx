import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { getOrders, refundHotelOrders } from "Services/api/ordersAPI";
import {
  cancelRoomBookings,
  cancelTourBookings,
} from "Services/api/bookingAPI";
import MyTable from "Component/Table/MyTable";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getUserBookingData } from "store/reducers/userReducer";
import { useAppSelector } from "hooks/useAppSelector";
import Loader from "Layout/Loader";
import { BookRoomModel } from "utils/model/hotelModel";

export default function HotelBookings(props: any) {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const user = token !== "" ? JSON.parse(atob(token!.split(".")[1])) : {};
  const id = +user.id;
  const navigate = useNavigate();
  const room = useAppSelector((state) => state.user.value.hotelOrders);
  const loading = useAppSelector((state) => state.user.value.loading);
  const totalData = useAppSelector(
    (state) => state.user.value.totalHotelOrders
  );
  let discount = 0;
  let totalCost = 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const getBookings = () => {
    if (user.id > 0) {
      dispatch(getUserBookingData({ id, limit, page }));
    }
  };

  useEffect(() => {
    if (id > 0) {
      dispatch(getUserBookingData({ id, limit, page }));
    }
  }, [dispatch, id, limit, page]);

  const handleCancel = (data: BookRoomModel, name: string) => {
    let userConfirm = window.confirm(`Is it ok to cancel booking for ${name}`);
    console.log(data);
    if (userConfirm) {
      if (data.room) {
        cancelRoomBookings(data.id)
          .then((res) => {
            toast(res.data);
          })
          .catch((err) => {
            toast(err);
          });
      } else {
        cancelTourBookings(data.id)
          .then((res) => {
            toast(res.data);
          })
          .catch((err) => {
            toast(err);
          });
      }
    }
  };

  const handlePayNow = (row: BookRoomModel) => {
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

  const cancelOrder = (row: BookRoomModel) => {
    let userConfirm = window.confirm(
      `Is it ok to cancel order for ${row.room.room_name}`
    );
    console.log(row);
    if (userConfirm) {
      refundHotelOrders({
        bookId: row.id,
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
    <>
      <Box>
        <ToastContainer />
        <Typography variant="h6" color="blueviolet">
          Active Orders
        </Typography>
        {loading ? (
          <Loader />
        ) : room.length > 0 ? (
          <Box>
            <Typography variant="h6" color="blueviolet">
              Hotel Orders
            </Typography>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }}> Hotel Name </TableCell>
                  <TableCell sx={{ width: "5%" }}> Room Name </TableCell>
                  <TableCell sx={{ width: "5%" }}> Check In Date </TableCell>
                  <TableCell sx={{ width: "5%" }}> Check Out Date </TableCell>
                  <TableCell sx={{ width: "1%" }}> Total Days </TableCell>
                  <TableCell sx={{ width: "1%" }}> Total Person </TableCell>
                  <TableCell sx={{ width: "5%" }}> Cost </TableCell>
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
                {room.map((row, index: number) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.room.hotel.hotel_name}
                    </TableCell>
                    <TableCell>{row.room.room_name}</TableCell>
                    <TableCell>{row.in_Date}</TableCell>
                    <TableCell>{row.out_Date}</TableCell>
                    <TableCell>{row.total_Days}</TableCell>
                    <TableCell>{row.total_person}</TableCell>
                    <TableCell>
                      {" "}
                      ₹​{" "}
                      {row.total_person *
                        row.room.room_price *
                        row.total_Days}{" "}
                    </TableCell>
                    <TableCell
                      className={row.payment ? "text-success" : "text-danger"}
                    >
                      {row.payment ? "Successfully Booked" : "Pending"}
                    </TableCell>
                    {!row.payment ? (
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="success"
                          className="btn m-2"
                          onClick={() => handlePayNow(row)}
                        >
                          {" "}
                          Pay Now{" "}
                        </Button>{" "}
                        <Button
                          variant="outlined"
                          color="error"
                          className="btn m-2"
                          onClick={() => handleCancel(row, row.room.room_name)}
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
                          onClick={() => viewOrder(row.id)}
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
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    rowSpan={2}
                    colSpan={6}
                    count={totalData}
                    rowsPerPage={limit}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableBody>
            </MyTable>
          </Box>
        ) : (
          <h6 className="text-danger">Book A Room to View</h6>
        )}
      </Box>
    </>
  );
}
