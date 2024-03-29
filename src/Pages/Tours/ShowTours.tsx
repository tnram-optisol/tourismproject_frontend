import LocationOn from "@mui/icons-material/LocationOn";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";

import MyCardBody from "Component/Cards/MyCardBody";
import MyCardHeader from "Component/Cards/MyCardHeader";
import MyCardMedia from "Component/Cards/MyCardMedia";
import AnimatedText from "Component/styled/AnimatedText";
import MyCard from "Component/Cards/MyCard";
import ToursList from "Component/Tours/ToursList";
import {
  adminTour,
  deleteTourPackage,
  paginateTour,
} from "Services/api/toursAPI";
import { setAdminTourData } from "store/reducers/tourReducer";
import Loader from "Layout/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { TourModel } from "utils/model/tourModel";
import { toast } from "react-toastify";
import PanelLayout from "Component/Wrapper/PanelLayout";

export default function ShowTours() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const dispatch = useAppDispatch();
  const tour = useAppSelector((state) => state.tour.value.adminTour);
  const loading = useAppSelector((state) => state.tour.value.loading);
  useEffect(() => {
    adminTour()
      .then((res) => {
        setMaxPage(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
    paginateTour(page)
      .then((res) => {
        dispatch(setAdminTourData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, page]);
  const tourPagination = (current: number) => {
    setPage(current);
    if (current < maxPage) {
      paginateTour(current)
        .then((res) => {
          dispatch(setAdminTourData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setPage(page - 1);
      paginateTour(current)
        .then((res) => {
          dispatch(setAdminTourData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const pages = () => {
    let items = [];
    let totalPage = 0;
    if (maxPage % 2 === 0) {
      totalPage = maxPage / 2;
    } else {
      totalPage = maxPage / 2 + 1;
    }
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item key={number} onClick={() => tourPagination(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const removePackage = (data: TourModel) => {
    const confirmation = window.confirm(
      `Is it ok to remove Package ${data.package_name}`
    );
    if (confirmation) {
      deleteTourPackage(data.tour_id)
        .then((res) => {
          toast(res.data);
          tourPagination(page);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <PanelLayout>
        <ToursList>
          {!loading ? (
            tour.length > 0 ? (
              tour.map((data) => (
                <MyCard key={data.tour_id}>
                  <MyCardHeader title={data.package_name} />
                  <MyCardMedia img={data.tour_image} alt={data.package_name} />
                  <CardContent>
                    <Typography variant="subtitle1" color="brown">
                      <LocationOn /> {data.from} --- {data.to}
                    </Typography>
                    <MyCardBody
                      variant={"body1"}
                      data={` Max Person: ${data.max_person}`}
                      color={"green"}
                    />
                    <MyCardBody
                      variant={"body1"}
                      data={` Total Days : ${data.total_days}`}
                      color={"green"}
                    />
                    <MyCardBody
                      variant={"body1"}
                      data={`  Booking Start Date : ${new Date(
                        data.startDate
                      ).toLocaleDateString()}`}
                      color={"blue"}
                    />
                    <MyCardBody
                      variant={"body1"}
                      data={`  Booking End Date: ${new Date(
                        data.endDate
                      ).toLocaleDateString()}`}
                      color={"success"}
                    />
                    <AnimatedText
                      className={"m-2 text-danger"}
                      data={`₹​  ${data.cost} /person`}
                    />
                    <MyCardBody
                      variant={"body1"}
                      data={`  Status: ​ ${
                        data.status ? "Approved" : "Not Approved"
                      } `}
                      color={data.status ? "green" : "red"}
                    />
                  </CardContent>
                  <CardActions>
                    <Button className="button">
                      <Link
                        to={`/add/tours/${data.tour_id}`}
                        className="nav-link"
                      >
                        Update
                      </Link>
                    </Button>
                    <Button
                      className="button"
                      onClick={() => removePackage(data)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </MyCard>
              ))
            ) : (
              <h1 className="text-center text-danger">
                Create a Package to View
              </h1>
            )
          ) : (
            <Loader />
          )}
        </ToursList>
        {!loading ? (
          <Pagination className="paginate">{pages()}</Pagination>
        ) : (
          ""
        )}
      </PanelLayout>
    </>
  );
}
