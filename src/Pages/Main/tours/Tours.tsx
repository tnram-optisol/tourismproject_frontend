import React, { useEffect } from "react";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import "../Main.css";
import { LocationOn } from "@mui/icons-material";
import MyCardHeader from "Component/Cards/MyCardHeader";
import { Link, useLocation } from "react-router-dom";
import MyCardMedia from "Component/Cards/MyCardMedia";
import LazyLoad from "react-lazyload";
import MyCard from "Component/Cards/MyCard";
import TourCategory from "Layout/TourCategory";
import { getUserTourData, setUserTourData } from "store/reducers/tourReducer";
import { filterTourData, searchTourData } from "Services/api/userAPI";
import MyCardBody from "Component/Cards/MyCardBody";
import Loader from "Layout/Loader";
import UserLayout from "Component/Wrapper/UserLayout";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

export default function Tours() {
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("location");
  const tourData = useAppSelector(state => state.tour.value.tour);
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!query) {
      searchTourData(query)
        .then((res) => {
          dispatch(setUserTourData(res.data));
          window.scrollTo(0, 0);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(getUserTourData());
    }
  }, [dispatch]);
  const filterData = (category: any) => {
    console.log(category);
    window.scrollTo(0, 0);
    filterTourData(category)
      .then((res) => {
        dispatch(setUserTourData(res.data));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <UserLayout>
        <TourCategory filterData={filterData} />
        <Box className="tour">
          <Grid container spacing={1}>
            {tourData.length > 0
              ? tourData.map((data, index) => (
                <LazyLoad key={data.sequence} placeholder={<Loader />}>
                  <MyCard value={index}>
                    <MyCardMedia
                      img={data.tour.tour_image}
                      alt={
                        data.tour.package_name
                      }
                      className={"card-img ripple"}
                    />
                    <Link
                      to={`/tour/${data.tour.tour_id
                        }`}
                      className="nav-link"
                    >
                      <MyCardHeader
                        title={
                          data.tour.package_name
                        }
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="subtitle1" color="brown">
                        <LocationOn />{" "}
                        {data.tour.from} ---{" "}
                        {data.tour.to}
                      </Typography>
                      <MyCardBody
                        variant={"body1"}
                        data={` Max Person: ${data.tour.max_person
                          }`}
                        color={"green"}
                      />
                      <MyCardBody
                        variant={"body1"}
                        data={` Total Days : ${data.tour.total_days
                          }`}
                        color={"green"}
                      />
                      <MyCardBody
                        variant={"body1"}
                        data={`  Booking Start Date : ${new Date(
                          data.tour.startDate
                        ).toLocaleDateString()
                          }`}
                        color={"blue"}
                      />
                      <MyCardBody
                        variant={"body1"}
                        data={`  Booking End Date: ${new Date(
                          data.tour.endDate
                        ).toLocaleDateString()
                          }`}
                      color={"success"}
                      />
                      <Typography
                        variant="subtitle1"
                        className={"m-2 text-danger"}
                      >
                        {`₹​  ${data.tour.cost
                          } /person`}
                      </Typography>
                    </CardContent>
                  </MyCard>
                </LazyLoad>
              ))
              : ""}
          </Grid>
        </Box>
      </UserLayout>
    </>
  );
}
