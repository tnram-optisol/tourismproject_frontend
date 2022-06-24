import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";

import AdminLayout from "Component/Wrapper/AdminLayout";
import { getUserTourData } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

function Dashboard() {
  const packages = useAppSelector((state) => state.tour.value.tour);
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserTourData());
  }, [dispatch]);
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
        </>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
