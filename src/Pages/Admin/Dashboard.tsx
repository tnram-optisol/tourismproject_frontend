import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { getAdminTourData } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import {
  getAdminAllUserData,
  getAdminOrdersData,
} from "store/reducers/adminReducer";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

function Dashboard() {
  const packages = useAppSelector((state) => state.tour.value.tour);
  const users = useAppSelector((state) => state.admin.value.users);
  const orders = useAppSelector((state) => state.admin.value.orders);
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminTourData());
    dispatch(getAdminAllUserData());
    dispatch(getAdminOrdersData());
  }, [dispatch]);
  console.log(packages.length);
  return (
    <AdminLayout>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
            >
              <Card
                sx={{ maxWidth: 300, display: "inline-block" }}
                className="card-data m-2"
              >
                <CardHeader title={"Users"} />
                <CardMedia
                  component={"img"}
                  image={
                    "https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png"
                  }
                  alt="users"
                  width="200"
                  height="200"
                />
                <CardContent>
                  <Typography variant="subtitle1" color="green">
                    All Users {users.length}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{ maxWidth: 300, display: "inline-block" }}
                className="card-data m-2"
              >
                <CardHeader title={"Tour Packages "} />
                <CardMedia
                  component={"img"}
                  image={
                    "https://mpng.subpng.com/20180211/xiq/kisspng-india-travel-agent-air-travel-travel-website-statue-of-liberty-vector-earth-5a807fb2939509.5824589915183707386045.jpg"
                  }
                  alt="users"
                  width="200"
                  height="200"
                />
                <CardContent>
                  <Typography variant="subtitle1" color="green">
                    Available Tour Packages {packages.length}
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{ maxWidth: 300, display: "inline-block" }}
                className="card-data m-2"
              >
                <CardHeader title={"All Orders "} />
                <CardMedia
                  component={"img"}
                  image={
                    "https://www.kindpng.com/picc/m/280-2801416_customer-order-orders-icon-clipart-png-download-order.png"
                  }
                  alt="orders"
                  width="200"
                  height="200"
                />
                <CardContent>
                  <Typography variant="subtitle1" color="green">
                    All Orders {orders.length}
                  </Typography>
                </CardContent>
              </Card>
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis.
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Typography variant="h6" color="blue">
              All Users
            </Typography>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Email</TableCell>
                  <TableCell>User Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && !loading
                  ? users.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-primary">
                          {user.id}
                        </TableCell>
                        <TableCell className="text-primary">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-primary">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-primary">
                          {user.role.role}
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </MyTable>
          </Grid>
          {orders.length > 0 && !loading ? (
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="h6" color="blue">
                  All Orders
                </Typography>
              </Grid>
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
                  {orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-primary">
                        {order.order_id}
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
                </TableBody>
              </MyTable>
            </Grid>
          ) : (
            ""
          )}
        </>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
