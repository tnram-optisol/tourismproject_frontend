import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect } from "react";

import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { getAdminTourOrders } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

function TourOrders() {
  const dispatch = useAppDispatch();
  const tourOrders = useAppSelector((state) => state.tour.value.tourOrders);
  const loading = useAppSelector((state) => state.tour.value.loading);

  useEffect(() => {
    dispatch(getAdminTourOrders());
  }, [dispatch]);

  return (
    <AdminLayout>
      {!loading ? (
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
              <TableRow>
                <TableCell>{tour.order_id}</TableCell>
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
                <TableCell className="text-danger">{tour.discount}%</TableCell>
                <TableCell className="text-danger">
                  {" "}
                  INR {tour.bookTour.tour.cost - tour.orderCost}
                </TableCell>
                <TableCell className="text-danger">
                  {" "}
                  INR {tour.orderCost}
                </TableCell>
                <TableCell
                  className={tour.orderStatus ? "text-success" : "text-danger"}
                >
                  {" "}
                  {tour.orderStatus ? "Booked" : "Canceled"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MyTable>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}

export default TourOrders;
