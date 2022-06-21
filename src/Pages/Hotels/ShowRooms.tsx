import React, { useEffect } from "react";
import { Box, CardContent, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faCamera,
  faMobile,
  faUser,
  faWallet,
  faLock,
  faWater,
} from "@fortawesome/free-solid-svg-icons";

import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import MyCardBody from "Component/Cards/MyCardBody";
import MyCard from "Component/Cards/MyCard";
import { getAdminRoomData } from "store/reducers/hotelReducer";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

export default function ShowRooms(props: any) {
  const query: any = useParams();
  const hotel_id = +query.id;
  console.log(hotel_id);
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.hotel.value.room);
  const loading = useAppSelector((state) => state.hotel.value.loading);
  useEffect(() => {
    dispatch(getAdminRoomData(hotel_id));
  }, [dispatch]);
  return (
    <AdminLayout>
      <Box className="tour_body">
        <Box>
          {loading ? (
            <Loader />
          ) : (
            rooms.map((room, index) => (
              <MyCard
                key={room.room_id}
              >
                <Link to={`/room/${room.room_id}`} className="nav-link">
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
                    <MyCardBody
                      variant={"body1"}
                      data={`  Price: ₹​ ${room.cost} /person for 1 Nights`}
                      color={"green"}
                    />
                  </Typography>
                  <Typography variant="body1">
                    Descriptions: {room.description}
                  </Typography>
                  <Typography variant="h6">List of Ammenities</Typography>
                  <Box className="m-2">
                    <Typography
                      variant="body1"
                      color="blueviolet"
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faCamera} />
                      Camera
                    </Typography>
                    <Typography
                      variant="body1"
                      color="blueviolet"
                      className=" m-1"
                    >
                      <FontAwesomeIcon icon={faMobile} />
                      Mobiles
                    </Typography>
                    <Divider />
                    <Typography
                      variant="body1"
                      color="blueviolet"
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faBowlFood} />
                      Free Break Fast
                    </Typography>
                    <Divider />
                    <Typography
                      variant="body1"
                      color="blueviolet"
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faLock} />
                      Locker Service
                    </Typography>
                    <Typography
                      variant="body1"
                      color="blueviolet"
                      className="m-1"
                    >
                      <FontAwesomeIcon icon={faWater} />
                      Pure Drinking Water
                    </Typography>
                  </Box>
                </CardContent>
              </MyCard>
            ))
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
}
