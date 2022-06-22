import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import MyCardBody from "Component/Cards/MyCardBody";
import AnimatedText from "Component/styled/AnimatedText";
import { getUserRoomData } from "store/reducers/hotelReducer";
import UserLayout from "Component/Wrapper/UserLayout";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export default function Rooms() {
  const query:any = useParams();
  const hotel_id = +query.id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const rooms = useAppSelector((state) => state.hotel.value.room);
  useEffect(() => {
    dispatch(getUserRoomData(hotel_id));
    window.scrollTo(0, 0);
  }, [dispatch, hotel_id]);

  const bookNow = (id:number) => {
    navigate(`/show/room/${id}`);
  };

  return (
    <UserLayout>
      <Box className="tour_body">
        <Box>
          {rooms.map((room, index) => (
            <Card
              sx={{ maxWidth: 400, margin: "10px", display: "inline-block" }}
              key={room.room_id}
            >
              <Link to={`/show/room/${room.room_id}`} className="nav-link">
                <MyCardHeader title={room.room_name} />
              </Link>
              <MyCardMedia img={room.room_image} alt={room.room_name} />
              <CardContent>
                <Typography variant="h6">
                  <FontAwesomeIcon icon={faUser} />
                  <MyCardBody
                    variant={"body1"}
                    data={` Max Person: ${room.max_person}`}
                    color={"green"}
                  />
                </Typography>
                <Typography variant="h6">
                  <FontAwesomeIcon icon={faWallet} />
                  <AnimatedText
                    data={`  Price: ₹​ ${room.room_price} /person for 1 Nights`}
                  />
                </Typography>
                <Typography variant="body1">
                  Availablity:{" "}
                  {room.availability ? "Available - 5" : "Not Available"}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => bookNow(room.room_id)}
                >
                  Book Now
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </UserLayout>
  );
}
