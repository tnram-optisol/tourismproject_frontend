import {
  Box,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MyTable from "Component/Table/MyTable";
import UserLayout from "Component/Wrapper/UserLayout";
import React from "react";
import { useLocation } from "react-router-dom";

import "./Orders.css";
function MyOrders(props) {
  const location = useLocation();
  const bookData = location.state;
  const { tourOrderExist, hotelOrderExist } = bookData;
  console.log(hotelOrderExist);
  return (
    <UserLayout>
      <Box className="m-3">
        <Typography variant="h5" className="text-center">
          Orders
        </Typography>
        {tourOrderExist ? (
          <>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "10%" }}> Order Id </TableCell>
                  <TableCell> Booked On </TableCell>
                  <TableCell> Recipient </TableCell>
                  <TableCell> Recipient Email </TableCell>
                  <TableCell> Recipient Contact </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "5%" }} align="left">
                    {" "}
                    {tourOrderExist.order_id}{" "}
                  </TableCell>
                  <TableCell> {tourOrderExist.bookTour.book_date} </TableCell>
                  <TableCell> {tourOrderExist.purchased_by} </TableCell>
                  <TableCell> {tourOrderExist.email} </TableCell>
                  <TableCell> {tourOrderExist.user.contact} </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell>Package Name</TableCell>
                  <TableCell>From Location</TableCell>
                  <TableCell>To Location</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Discount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {tourOrderExist.bookTour.tour.package_name}
                  </TableCell>
                  <TableCell>{tourOrderExist.bookTour.tour.from}</TableCell>
                  <TableCell>{tourOrderExist.bookTour.tour.to}</TableCell>
                  <TableCell>{tourOrderExist.bookTour.tour.endDate}</TableCell>
                  <TableCell>{tourOrderExist.discount} %</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={5} />
                  <TableCell colSpan={2}>Price</TableCell>
                  <TableCell align="right">
                    {tourOrderExist.bookTour.tour.cost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total Cost</TableCell>
                  <TableCell align="right">
                    {tourOrderExist.bookTour.tour.cost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Discount</TableCell>
                  <TableCell align="right">
                    {tourOrderExist.bookTour.tour.cost -
                      tourOrderExist.orderCost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Net Paid </TableCell>
                  <TableCell align="right">
                    {tourOrderExist.orderCost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Paid On</TableCell>
                  <TableCell align="right">
                    {tourOrderExist.bookTour.book_date}
                  </TableCell>
                </TableRow>
              </TableBody>
            </MyTable>
            <MyTable></MyTable>
            <Container fixed className="text-center m-auto">
              <Button variant="outlined" color="error" className="m-2">
                Export to PDF
              </Button>
            </Container>
          </>
        ) : (
          ""
        )}
        {hotelOrderExist ? (
          <>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "10%" }}> Order Id </TableCell>
                  <TableCell> Booked On </TableCell>
                  <TableCell> Recipient </TableCell>
                  <TableCell> Recipient Email </TableCell>
                  <TableCell> Recipient Contact </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ width: "5%" }} align="left">
                    {" "}
                    {hotelOrderExist.order_id}{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {new Date(
                      hotelOrderExist.orderdAt
                    ).toLocaleDateString()}{" "}
                  </TableCell>
                  <TableCell> {hotelOrderExist.purchased_by} </TableCell>
                  <TableCell> {hotelOrderExist.email} </TableCell>
                  <TableCell> {hotelOrderExist.user.contact} </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell>Hotel Name</TableCell>
                  <TableCell>Room Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Check In Date</TableCell>
                  <TableCell>Check Out Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {hotelOrderExist.bookRoom.room.hotel.hotel_name}
                  </TableCell>
                  <TableCell>
                    {hotelOrderExist.bookRoom.room.room_name}
                  </TableCell>
                  <TableCell>
                    {hotelOrderExist.bookRoom.room.hotel.address}
                  </TableCell>
                  <TableCell>{hotelOrderExist.bookRoom.in_Date}</TableCell>
                  <TableCell>{hotelOrderExist.bookRoom.out_Date}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell rowSpan={5} />
                  <TableCell colSpan={3}>Price</TableCell>
                  <TableCell align="right">
                    {hotelOrderExist.bookRoom.room.room_price}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total Cost</TableCell>
                  <TableCell align="right">
                    {hotelOrderExist.orderCost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Net Paid </TableCell>
                  <TableCell align="right">
                    {hotelOrderExist.orderCost}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Paid On</TableCell>
                  <TableCell align="right">
                    {new Date(hotelOrderExist.orderdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </MyTable>
            <Container fixed className="text-center">
              <Button variant="outlined" color="error" className="m-2">
                Export to PDF
              </Button>
            </Container>
          </>
        ) : (
          ""
        )}
      </Box>
    </UserLayout>
  );
}

export default MyOrders;
