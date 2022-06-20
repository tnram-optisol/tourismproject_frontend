import { Box, CardActions, CardContent, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyCardBody from "Component/Cards/MyCardBody";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import MyCarousel from "../../../Layout/Carousel";
import Features from "../../../Layout/Features";
import MyCard from "Component/Cards/MyCard";
import { getUserHotelData } from "store/reducers/hotelReducer";
import UserLayout from "Component/Wrapper/UserLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export default function Hotel() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hotels = useAppSelector(((state) => state.hotel.value.hotel));
  const getAllHotels = () => {
    dispatch(getUserHotelData());
    console.log(hotels);
    window.scrollTo(0, 0);
  };
  useEffect(() => getAllHotels, [dispatch]);
  const viewRooms = (id:number) => {
    navigate(`/hotel/rooms/${id}`);
  };
  return (
    <UserLayout>
      <Box>
        <MyCarousel />
        <Features />
        {hotels.map((hotel, index) => (
          <MyCard key={hotel.hotel_id}>
            <MyCardHeader title={hotel.hotel_name} />
            <MyCardMedia img={hotel.hotel_image} alt={hotel.hotel_name} />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                data={`Address : ${hotel.address}`}
                color={"error"}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="success"
                className="button"
                onClick={() => viewRooms(hotel.hotel_id)}
              >
                View Rooms
              </Button>
            </CardActions>
          </MyCard>
        ))}
      </Box>
    </UserLayout>
  );
}
