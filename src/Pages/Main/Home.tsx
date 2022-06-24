import { Box, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LocationOn } from "@mui/icons-material";
import LazyLoad from "react-lazyload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

import TourCategory from "Layout/TourCategory";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import { filterTourData } from "Services/api/userAPI";
import "./Main.css";
import Loader from "Layout/Loader";
import MyCard from "Component/Cards/MyCard";
import { getUserTourData, setUserTourData } from "store/reducers/tourReducer";
import UserLayout from "Component/Wrapper/UserLayout";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";

export default function Home() {
  const tourData = useAppSelector((state) => state.tour.value.tour);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserTourData());
  }, [dispatch]);
  const filterData = (category: number) => {
    window.scrollTo(0, 0);
    if (category !== 0) {
      filterTourData(category)
        .then((res) => {
          dispatch(setUserTourData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      dispatch(getUserTourData());
    }
  };
  return (
    <>
      <UserLayout>
        <ToastContainer />
        <TourCategory filterData={filterData} />
        <Box className="tour">
          <Grid container spacing={1}>
            {tourData.length > 0
              ? tourData.map((data, index) => (
                  <LazyLoad key={data.sequence} placeholder={<Loader />}>
                    <MyCard value={index}>
                      <MyCardMedia
                        img={data.tour.tour_image}
                        alt={data.tour.package_name}
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <Link
                            to={`/tour/${data.tour.tour_id}`}
                            className="nav-link"
                          >
                            <MyCardHeader title={data.tour.package_name} />
                          </Link>
                        </Grid>
                        <Grid item xs={3} className="mt-4">
                          {data.rating ? (
                            <>
                              {data.rating}
                              <FontAwesomeIcon icon={faStar} color="yellow" />
                            </>
                          ) : (
                            <>
                              New
                              <FontAwesomeIcon icon={faStar} color="yellow" />
                            </>
                          )}
                        </Grid>
                      </Grid>
                      <CardContent>
                        <Typography variant="subtitle1" color="brown">
                          <LocationOn /> {data.tour.from} --- {data.tour.from}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={"m-2 text-danger"}
                        >
                          {`₹​  ${data.tour.cost} /person`}
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
