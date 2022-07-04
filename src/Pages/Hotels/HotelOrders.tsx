import React, { useEffect, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import MyTable from "Component/Table/MyTable";
import PanelLayout from "Component/Wrapper/PanelLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getAdminHotelOrders } from "store/reducers/hotelReducer";
import Loader from "Layout/Loader";

function HotelOrders() {
  const dispatch = useAppDispatch();
  const hotelOrders = useAppSelector((state) => state.hotel.value.hotelOrders);
  const loading = useAppSelector((state) => state.hotel.value.loading);
  const totalHotelOrders = useAppSelector(
    (state) => state.hotel.value.totalHotelOrders
  );
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  useEffect(() => {
    dispatch(getAdminHotelOrders({ limit, page }));
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
    <PanelLayout>
      {!loading ? (
        <MyTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "10%" }}> Order Id </TableCell>
              <TableCell sx={{ width: "10%" }}> Booked On </TableCell>
              <TableCell sx={{ width: "10%" }}> Recipient </TableCell>
              <TableCell sx={{ width: "10%" }}> Recipient Email </TableCell>
              <TableCell sx={{ width: "10%" }}> Recipient Contact </TableCell>
              <TableCell sx={{ width: "7%" }}>Room Name</TableCell>
              <TableCell sx={{ width: "7%" }}>Hotel Name</TableCell>
              <TableCell sx={{ width: "7%" }}>Hotel Address</TableCell>
              <TableCell sx={{ width: "7%" }}>Total Cost</TableCell>
              <TableCell sx={{ width: "5%" }}>Discount</TableCell>
              <TableCell sx={{ width: "5%" }}>Deductions</TableCell>
              <TableCell align="right">Paid Price</TableCell>
              <TableCell sx={{ width: "7%" }}>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hotelOrders.map((room, index) => (
              <TableRow>
                <TableCell>{room.order_id}</TableCell>
                <TableCell>
                  {new Date(room.orderdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{room.purchased_by}</TableCell>
                <TableCell>{room.email}</TableCell>
                <TableCell>{room.user.contact}</TableCell>
                <TableCell>{room.bookRoom.room.room_name}</TableCell>
                <TableCell>{room.bookRoom.room.hotel.hotel_name}</TableCell>
                <TableCell>{room.bookRoom.room.hotel.address}</TableCell>
                <TableCell className="text-danger">
                  INR {room.bookRoom.room.room_price}
                </TableCell>
                <TableCell className="text-danger">{room.discount}%</TableCell>
                <TableCell className="text-danger">
                  {" "}
                  INR {room.bookRoom.room.room_price - room.orderCost}
                </TableCell>
                <TableCell className="text-danger">
                  {" "}
                  INR {room.orderCost}
                </TableCell>
                <TableCell
                  className={room.orderStatus ? "text-success" : "text-danger"}
                >
                  {" "}
                  {room.orderStatus ? "Booked" : "Canceled"}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                rowSpan={2}
                colSpan={8}
                count={totalHotelOrders}
                rowsPerPage={limit}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableBody>
        </MyTable>
      ) : (
        <Loader />
      )}
    </PanelLayout>
  );
}

export default HotelOrders;
