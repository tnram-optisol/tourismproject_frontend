import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faMessage,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { getUserProfileData } from "store/reducers/userReducer";
import UserLayout from "Component/Wrapper/UserLayout";
import Loader from "Layout/Loader";

function Profile() {
  const dispatch = useAppDispatch();
  const myProfile = useAppSelector((state) => state.user.value.userData);
  const loading = useAppSelector((state) => state.user.value.loading);

  useEffect(() => {
    dispatch(getUserProfileData());
  }, [dispatch]);

  return (
    <UserLayout>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg" className="profile">
          <Typography variant="h6" color="red" className="data">
            My Profile
          </Typography>
          <hr />
          <Box className="m-2">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <img
                  src="https://icons-for-free.com/download-icon-human+male+profile+user+icon-1320196240448793481_512.png"
                  height={200}
                  width={200}
                  alt="profile_icon"
                />
              </Grid>
              <Grid item xs={8}>
                {myProfile.map((e, index) => (
                  <List key={index}>
                    <ListItem>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            <FontAwesomeIcon
                              className="m-1 text-success"
                              icon={faUser}
                            />{" "}
                            Name
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            {e.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            <FontAwesomeIcon
                              className="m-1 text-success"
                              icon={faMessage}
                            />
                            Email
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            {e.email}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            <FontAwesomeIcon
                              className="m-1 text-success"
                              icon={faPhone}
                            />
                            Contact
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            {e.contact}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      <Grid container spacing={3} key={index}>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            <FontAwesomeIcon
                              className="m-1 text-success"
                              icon={faLocation}
                            />
                            City
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" className="data">
                            {e.place}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </UserLayout>
  );
}

export default Profile;
