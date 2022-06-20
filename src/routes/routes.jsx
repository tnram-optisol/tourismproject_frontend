import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";


import Requests from "Pages/Admin/Requests";
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



export default function MyRoutes() {
  const role = useSelector((state)=>state.auth.value.role);
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
              <Route path="/admin/requests" element={<Requests />}></Route>{" "}
              <Route path="/admin/category" element={<Category />}></Route>{" "}
              <Route path="/admin/banner" element={<Banner />}></Route>{" "}
              <Route path="/admin/dashboard" element={<Dashboard />}></Route>{" "}
              <Route path="/admin/update/:id" element={<UpdateForm />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
          {role === 4 ? (
            <>
              <Route path="my/bookings" element={<MyBookings />}></Route>
              <Route path="/payment" element={<MyPayment />}></Route>
              <Route path="/my/orders" element={<MyOrders />}></Route>
              <Route path="/cancel" element={<Cancel />}></Route>
              <Route path="/success" element={<Success />}></Route>
            </>
          ) : (
            <Route path="*" element={<AccessDenied />} />
          )}
        </Route>
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signup/:id" element={<RegisterForm />} />
        <Route path="*" element={<AccessDenied />} />
      </Routes>
    </>
  );
}
