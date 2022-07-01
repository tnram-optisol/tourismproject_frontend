import React from "react";
import { Routes, Route } from "react-router-dom";

import MyBookings from "Pages/Booking/MyBookings";
import LoginForm from "Pages/Forms/LoginForm";
import RegisterForm from "Pages/Forms/RegisterForm";
import SignUpForm from "Pages/Forms/SignUp";
import AddRoom from "Pages/Hotels/AddRoom";
import HotelForm from "Pages/Hotels/HotelForm";
import ViewHotel from "Pages/Hotels/ViewHotel";
import ShowRooms from "Pages/Hotels/ShowRooms";
import Home from "Pages/Main/Home";
import Tours from "Pages/Main/tours/Tours";
import Hotels from "Pages/Main/hotels/Hotel";
import ViewTour from "Pages/Main/tours/ViewTour";
import MyOrders from "Pages/Orders/Orders";
import Cancel from "Pages/Payment/Cancel";
import MyPayment from "Pages/Payment/MyPayment";
import Success from "Pages/Payment/Success";
import ShowTours from "Pages/Tours/ShowTours";
import TourForm from "Pages/Tours/TourForm";
import Rooms from "Pages/Main/hotels/Rooms";
import Banner from "Pages/Admin/Banner";
import ViewRoom from "Pages/Main/hotels/ViewRoom";
import TourOrders from "Pages/Tours/TourOrders";
import Category from "Pages/Admin/Category";
import UpdateForm from "Pages/Admin/UpdateForm";
import Dashboard from "Pages/Admin/Dashboard";
import HotelOrders from "Pages/Hotels/HotelOrders";
import ProtectedRoute from "./ProtectedRoute";
import AccessDenied from "Pages/AccessDenied";
import { useAppSelector } from "hooks/useAppSelector";
import TourBookings from "Pages/Booking/TourBookings";
import HotelBookings from "Pages/Booking/HotelBookings";
import Users from "Pages/Admin/Users";
import AdminTourOrders from "Pages/Admin/TourOrders";
import AdminHotelOrders from "Pages/Admin/HotelOrders";
import TourRequests from "Pages/Admin/TourRequests";
import HotelRequests from "Pages/Admin/HotelRequests";
import Notification from "Pages/Admin/Notification";
import SendOTP from "Pages/Forms/SendOTP";
import ResetPass from "Pages/Forms/ResetPass";
import CanceledTour from "Pages/Booking/CanceledTour";
import CanceledHotel from "Pages/Booking/CanceledHotel";
import Profile from "Pages/Main/Profile";

export default function MyRoutes() {
  const role = useAppSelector((state) => state.auth.value.role);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/tour" element={<Tours />}></Route>
        <Route path="/hotels" element={<Hotels />}></Route>
        <Route path="/tour/:id" element={<ViewTour />}></Route>
        <Route path="/hotel/rooms/:id" element={<Rooms />}></Route>
        <Route path="/show/room/:id" element={<ViewRoom />}></Route>
        <Route element={<ProtectedRoute />}>
          {role === 2 ? (
            <>
              <Route path="/add/hotels" element={<HotelForm />}></Route>
              <Route path="/add/room/:id" element={<AddRoom />}></Route>
              <Route path="/view/room/:id" element={<ShowRooms />}></Route>
              <Route path="/view/hotels" element={<ViewHotel />}></Route>
              <Route path="/hotel/orders" element={<HotelOrders />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
          {role === 3 ? (
            <>
              <Route path="/add/tours" element={<TourForm />}></Route>
              <Route path="/add/tours/:id" element={<TourForm />}></Route>
              <Route path="/view/tours" element={<ShowTours />}></Route>
              <Route path="/tour/orders" element={<TourOrders />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
          {role === 1 ? (
            <>
              {" "}
              <Route
                path="/admin/requests/tour"
                element={<TourRequests />}
              ></Route>{" "}
              <Route
                path="/admin/requests/hotel"
                element={<HotelRequests />}
              ></Route>{" "}
              <Route path="/admin/category" element={<Category />}></Route>{" "}
              <Route path="/admin/banner" element={<Banner />}></Route>{" "}
              <Route path="/admin/dashboard" element={<Dashboard />}></Route>{" "}
              <Route
                path="/admin/notification"
                element={<Notification />}
              ></Route>{" "}
              <Route path="/admin/users" element={<Users />}></Route>
              <Route
                path="/admin/tour/orders"
                element={<AdminTourOrders />}
              ></Route>
              <Route
                path="/admin/hotel/orders"
                element={<AdminHotelOrders />}
              ></Route>
              <Route path="/admin/update/:id" element={<UpdateForm />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
          {role === 4 ? (
            <>
              <Route path="my/bookings/" element={<MyBookings />}>
                <Route path="tour/bookings" element={<TourBookings />}></Route>
                <Route
                  path="hotel/bookings"
                  element={<HotelBookings />}
                ></Route>
                <Route path="cancel/hotel" element={<CanceledHotel />}></Route>
                <Route path="cancel/tour" element={<CanceledTour />}></Route>
                <Route path="my/orders" element={<MyOrders />}></Route>
              </Route>
              <Route path="/payment" element={<MyPayment />}></Route>
              <Route path="/cancel" element={<Cancel />}></Route>
              <Route path="/success" element={<Success />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
        </Route>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/get-otp" element={<SendOTP />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signup/:id" element={<RegisterForm />} />
        <Route path="/my/profile" element={<Profile />} />
        <Route path="*" element={<AccessDenied />} />
      </Routes>
    </>
  );
}
