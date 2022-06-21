import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Card,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faCancel, faUser } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import ReactDatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";

import MyCardBody from "Component/Cards/MyCardBody";
import Description from "Component/Modal/Description";
import UserLayout from "Component/Wrapper/UserLayout";
import { viewSingleRoomData } from "store/reducers/hotelReducer";
import Loader from "Layout/Loader";
import { BOOKROOM_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import FormikContainer from "Component/Form/FormikContainer";
import { BOOKROOM_FORM_DATA } from "utils/Form/formFields/formFields";
import { roomBooking } from "Services/api/bookingAPI";
import FormControl from "Component/Form/FormControl";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export default function ViewRooms() {
  const navigate = useNavigate();
  const query: any = useParams();
  const room_id = +query.id;
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const roomData = useAppSelector((state) => state.hotel.value.viewRoom);
  const loading = useAppSelector((state) => state.hotel.value.loading);
  const [initialValues, setInitialValues] = useState({
    ...BOOKROOM_INITIAL_VALUES,
    user: user.role === 4 ? user : 0,
    roomId: room_id,
  });
  useEffect(() => {
    dispatch(viewSingleRoomData(room_id));
  }, [dispatch]);
  const validationSchema = () => {
    return Yup.object({
      maxPerson: Yup.number().min(1).required("Required"),
      inDate: Yup.date().required("Required"),
      outDate: Yup.date()
        .min(startDate, "Must stay for minimum 1 day")
        .required("Required"),
    });
  };
  const handleClickOpen = (id: number) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (dates: [any, any]) => {
    console.log(dates);
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setInitialValues({
      ...initialValues,
      inDate: startDate,
      outDate: endDate,
    });
  };
  return (
    <UserLayout>
      <Box className="tour_body">
        <ToastContainer />
        <Box>
          {!loading ? (
            roomData.map(
              (
                room: {
                  room_image: string;
                  room_name: string;
                  availability: boolean;
                  max_person: number;
                  description: string;
                  room_id: number;
                  cost: number;
                },
                index: React.Key | null | undefined
              ) => (
                <Box className="mt-5" key={index}>
                  <Divider />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Box className="m-2">
                        <img
                          src={room.room_image}
                          alt={room.room_name}
                          className="d-block w-100"
                          height="300"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box className="m-2">
                        <img
                          src={room.room_image}
                          alt={room.room_name}
                          className="d-block w-100"
                          height="300"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  <Box className="m-2">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="m-2 text-danger"
                    >
                      Brand New {room.room_name}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      className="m-2 text-primary"
                    >
                      <Typography variant="body1">
                        Availablity:{" "}
                        {room.availability ? "Available - 5" : "Not Available"}
                      </Typography>
                    </Typography>
                    <Typography variant="h6">
                      <FontAwesomeIcon icon={faUser} />
                      <MyCardBody
                        variant={"body1"}
                        data={` Max Person: ${room.max_person}`}
                        color={"green"}
                      />
                    </Typography>
                  </Box>
                  <Divider />
                  <Grid container spacing={1}>
                    <Grid item xs={7}>
                      <Grid container className="mt-1 tour">
                        <Grid container spacing={1} className="m-2">
                          <Grid item xs={6}>
                            <Grid container spacing={1}>
                              <Grid container spacing={1}>
                                <Grid item xs={1}>
                                  <FontAwesomeIcon
                                    icon={faSignIn}
                                    className="m-1 text-center"
                                  />
                                </Grid>
                                <Grid item xs={10}>
                                  <Typography variant="subtitle2">
                                    Self Check In
                                    <p>Check yourself in with the lockGrid.</p>
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container spacing={1}>
                                <Grid item xs={1}>
                                  <FontAwesomeIcon
                                    icon={faCancel}
                                    className="m-1 text-center"
                                  />
                                </Grid>
                                <Grid item xs={11}>
                                  <Typography variant="subtitle2">
                                    Cancellation Policy
                                    <p>Free Cancellation for 24 Hours</p>
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container className="mt-1 tour">
                        <Grid item xs={12} className="m-2 tour">
                          <Typography variant="h6" className="d-block">
                            Booking Dates
                          </Typography>
                        </Grid>
                        <Grid item xs={12} className="m-2 tour">
                          <ReactDatePicker
                            minDate={new Date()}
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            monthsShown={2}
                          />
                        </Grid>
                      </Grid>
                      <Divider />
                      <Grid container className="mt-1 tour">
                        <Grid item xs={12}>
                          <Typography variant="h6" className="mt-1 tour">
                            {" "}
                            Description About Room{" "}
                          </Typography>
                          <Typography variant="body2" className="mt-1 tour">
                            {room.description}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="error"
                            className="m-2 tour"
                            onClick={() => handleClickOpen(room.room_id)}
                          >
                            Read More
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={5} className="m-auto">
                      <Card
                        sx={{
                          maxWidth: 500,
                          margin: "10px",
                          border: "2px solid lightblue",
                          padding: "10px",
                        }}
                      >
                        <Box>
                          <Container maxWidth="sm" className="m-2">
                            <Typography
                              variant="h6"
                              className="text-center text-danger"
                            >
                              ₹​ {room.cost} /person
                            </Typography>
                            <FormikContainer
                              className="review-form"
                              initialValues={initialValues}
                              formData={BOOKROOM_FORM_DATA}
                              validationSchema={validationSchema()}
                              buttonName={"Book Now"}
                              endPoint={"/book/room"}
                              apiCall={roomBooking}
                              redirect={navigate}
                              location={"/my/bookings"}
                            >
                              {BOOKROOM_FORM_DATA.map((el, index) => (
                                <FormControl
                                  key={index}
                                  control={el.control}
                                  name={el.name}
                                  id={el.name}
                                  label={el.label}
                                  type={el.type}
                                />
                              ))}
                            </FormikContainer>
                          </Container>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )
            )
          ) : (
            <Loader />
          )}
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Description</DialogTitle>
          <Divider />
          <Description />
        </Dialog>
      </Box>
    </UserLayout>
  );
}
