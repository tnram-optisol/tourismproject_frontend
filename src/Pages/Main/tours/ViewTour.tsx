import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Review from "./Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faLocation,
  faSignIn,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import ReactDatePicker from "react-datepicker";

import { getRating } from "Services/api/userAPI";
import Description from "Component/Modal/Description";
import "../Main.css";
import UserLayout from "Component/Wrapper/UserLayout";
import { viewSingleTourData } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import { BOOKTOUR_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import FormikContainer from "Component/Form/FormikContainer";
import { BOOKTOUR_FORM_DATA } from "utils/Form/formFields/formFields";
import { tourBooking } from "Services/api/bookingAPI";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export default function ViewTour(props: any) {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token!.split(".")[1])) : {};
  const [reviews, setReview] = useState(0);
  const navigate = useNavigate();
  const query: any = useParams();
  const tour_id = +query.id;
  const [startDate, setStartDate] = useState(new Date());
  const [excludeDays, setExcludeDays] = useState([addDays(new Date(), 5)]);
  const [errMsg, setErrMsg] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tourData = useAppSelector((state) => state.tour.value.viewTour);
  const loading = useAppSelector((state) => state.tour.value.loading);
  const [initialValues, setInitialValues] = useState({
    ...BOOKTOUR_INITIAL_VALUES,
    user: user.role === 4 ? user : 0,
    package_id: tour_id,
    date: startDate,
  });
  const validationSchema = () => {
    return Yup.object({
      maxPerson: Yup.number().min(1).required("Required"),
      maxDays: Yup.number()
        .min(
          tourData[0].total_days,
          `Must be equal to ${tourData[0].total_days} days`
        )
        .required("Required"),
      date: Yup.date().max(tourData[0].endDate).required("Required"),
    });
  };
  useEffect(() => {
    dispatch(viewSingleTourData(tour_id));
    window.scrollTo(0, 0);
    getRating(tour_id)
      .then((res) => {
        setReview(res.data.rating);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, tour_id]);
  const handleClickOpen = (id: any) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dateOnChange = (date: Date) => {
    if (
      date.getTime() / 1000 >
      new Date(tourData[0].endDate).getTime() / 1000
    ) {
      excludeDays.push(date);
      setErrMsg(" You cant Book on " + date.toISOString().split("T")[0]);
    } else {
      setStartDate(date);
      setErrMsg("");
      setInitialValues({
        ...initialValues,
        date: date,
      });
    }
    console.log(date);
  };
  return (
    <UserLayout>
      <Box>
        <ToastContainer />
        <Box>
          {!loading ? (
            tourData.map((tour, index) => (
              <Box className="mt-5" key={index}>
                <Divider />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box className="m-2">
                      <img
                        src={tour.tour_image}
                        alt={tour.package_name}
                        className="d-block w-100"
                        height="300"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box className="m-2">
                      <img
                        src={tour.tour_image}
                        alt={tour.package_name}
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
                    Brand New {tour.package_name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className="m-2 text-primary"
                  >
                    <FontAwesomeIcon icon={faStar} />
                    {reviews}{" "}
                    <Link to="#" className="nav-link d-inline">
                      {" "}
                      Reviews{" "}
                    </Link>
                    <p className="text-danger d-inline">
                      <FontAwesomeIcon icon={faLocation} />
                      {tour.from}--{tour.to}
                    </p>
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
                          selected={new Date()}
                          onChange={dateOnChange}
                          minDate={new Date()}
                          maxDate={new Date(tour.endDate)}
                          excludeDates={excludeDays}
                          placeholderText="Start Date"
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
                          Description About Tour{" "}
                        </Typography>
                        <Typography variant="body2" className="mt-1 tour">
                          {tour.description}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="error"
                          className="m-2 tour"
                          onClick={() => handleClickOpen(tour.tour_id)}
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
                      <Typography variant="h6">
                        ₹​ {tour.cost} /person
                      </Typography>
                      <Box>
                        {errMsg ? <Alert severity="error">{errMsg}</Alert> : ""}
                        <FormikContainer
                          className="review-form"
                          initialValues={initialValues}
                          formData={BOOKTOUR_FORM_DATA}
                          validationSchema={validationSchema()}
                          buttonName={"Book Tour"}
                          endPoint={"/book/tour"}
                          apiCall={tourBooking}
                          redirect={navigate}
                          location={"/my/bookings/tour/bookings"}
                        />
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
                <Divider />
                <Grid container spacing={1} className="tour">
                  <Typography variant="h6" className="mt-1 tour">
                    Package Reviews:
                  </Typography>
                  <Divider />
                  <Grid item xs={12} className="mt-1 tour">
                    <Review tour={tour_id} />
                  </Grid>
                </Grid>
              </Box>
            ))
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
