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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyTable from "Component/Table/MyTable";
import { useAppDispatch } from "hooks/useAppDispatch";
import { getUserCanceledOrders } from "store/reducers/userReducer";
import { useAppSelector } from "hooks/useAppSelector";
import Loader from "Layout/Loader";

export default function CanceledOrders() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.value.loading);
  const orderCanceled = useAppSelector(
    (state) => state.user.value.canceledHotelOrders
  );
  const totalData = useAppSelector(
    (state) => state.user.value.totalHotelCanceledOrders
  );
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getUserCanceledOrders({ limit, page }));
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
    <Box>
      <ToastContainer />
      <Typography variant="h6" color="blueviolet">
        Canceled Orders
      </Typography>
      {loading ? (
        <Loader />
      ) : orderCanceled.length > 0 ? (
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
                  {row.order_id.split("-")[0]}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bookRoom.room.room_name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {new Date(row.orderdAt).toLocaleDateString()}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.bookRoom.total_person}
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
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                rowSpan={2}
                colSpan={4}
                count={totalData}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </MyTable>
      ) : (
        <h6 className="text-danger">Cancel a Order to View</h6>
      )}
    </Box>
  );
}
