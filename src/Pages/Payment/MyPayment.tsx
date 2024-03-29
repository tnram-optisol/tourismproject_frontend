import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBBtn } from "mdb-react-ui-kit";

import "./Payment.css";
import axiosIntercept from "Services/axios";
import UserLayout from "Component/Wrapper/UserLayout";
import MyCarousel from "Layout/Carousel";
import AnimatedText from "Component/styled/AnimatedText";
import { getUserCoupon } from "Services/api/userAPI";
import { CouponModel } from "utils/model/adminModel";

function MyPayment() {
  const [coupon, setCoupon] = useState<CouponModel>({
    coupon_id: 0,
    coupon_name: "",
    percent_off: 0,
    addedOn: new Date(),
  });
  const location: any = useLocation();
  const token = localStorage.getItem("token");
  const user = JSON.parse(atob(token!.split(".")[1]));
  console.log(location.state);

  useEffect(() => {
    getUserCoupon()
      .then((res) => {
        setCoupon({
          ...res.data.coupons[0],
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleToken(
    token?: undefined | any,
    address?: undefined | any
  ) {
    if (location.state.data.tour) {
      await axiosIntercept
        .post(`${process.env.REACT_APP_SERVER_URL}/payment`, {
          product: {
            name: location.state.data.tour.package_name,
            images: location.state.data.tour.tour_image,
            totalPerson: location.state.data.max_person,
            cost: location.state.data.tour.cost,
            description: location.state.data.tour.description,
            discount: coupon.percent_off,
            coupon: coupon.coupon_name,
            user: user.id,
          },
        })
        .then(async (res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          toast("Payment Failed");
        });
    } else {
      await axiosIntercept
        .post(`${process.env.REACT_APP_SERVER_URL}/payment`, {
          product: {
            name: location.state.data.room.room_name,
            images: location.state.data.room.room_image,
            totalPerson: location.state.data.total_person,
            cost:
              location.state.data.room.room_price *
              location.state.data.total_Days *
              location.state.data.total_person,
            description: location.state.data.room.description,
            discount: 5,
            user: user.id,
          },
        })
        .then(async (res) => {
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          toast("Payment Failed");
        });
    }
  }
  return (
    <UserLayout>
      <MyCarousel />
      <Box className="m-5">
        <AnimatedText
          data={`USE CODE ${coupon.coupon_name} For Discount`}
          className="text-center"
        />
        {location.state.data.tour ? (
          <Box className="m-auto ">
            <Typography variant="h6" className="text-center text-success">
              Booking For : {location.state.data.tour.package_name}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Booking User : {location.state.data.user.name}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Booking Date : {location.state.data.bookDate}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Total Days : {location.state.data.tour.total_days}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Total Person : {location.state.data.max_person}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Booking Cost : ₹{" "}
              {location.state.data.max_person * location.state.data.tour.cost}
            </Typography>
            <Box className="text-center">
              <MDBBtn
                rounded
                className="m-2"
                color="success"
                onClick={() => handleToken()}
              >
                Pay Now
              </MDBBtn>
            </Box>
          </Box>
        ) : (
          <Box className="m-auto">
            <Typography variant="h6" className="text-center text-success">
              Hotel Name : {location.state.data.room.hotel.hotel_name}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Room Name : {location.state.data.room.room_name}
            </Typography>
            <Typography variant="h6" className="text-center text-danger">
              Check In Date : {location.state.data.in_Date}
            </Typography>
            <Typography variant="h6" className="text-center text-danger">
              Check Out Date : {location.state.data.out_Date}
            </Typography>
            <Typography variant="h6" className="text-center text-primary">
              Booked By : {location.state.data.user.name}
            </Typography>
            <Typography variant="h6" className="text-center text-success">
              Total Days : {location.state.data.total_Days}
            </Typography>
            <Typography variant="h6" className="text-center text-danger">
              Cost Per Person : ₹ {location.state.data.room.room_price}/nights
            </Typography>
            <Typography variant="h6" className="text-center text-danger">
              Total Cost : ₹{" "}
              {location.state.data.room.room_price *
                location.state.data.total_Days *
                location.state.data.total_person}
              /nights
            </Typography>
            <Box className="text-center">
              <MDBBtn
                rounded
                className="m-2"
                color="success"
                onClick={() => handleToken()}
              >
                Pay Now
              </MDBBtn>
            </Box>
          </Box>
        )}
      </Box>
    </UserLayout>
  );
}

export default MyPayment;
