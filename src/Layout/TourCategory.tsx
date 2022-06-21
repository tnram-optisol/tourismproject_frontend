import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React, { useEffect } from "react";
import { getUserCategoryData } from "store/reducers/userReducer";

function TourCategory(props: { filterData: (arg0: number) => void; }) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.value.loading);
  const categoryData = useAppSelector((state) => state.user.value.category)

  useEffect(() => {
    dispatch(getUserCategoryData())
  }, [dispatch])

  return (
    <>
      {!loading ? (
        <Grid container spacing={1} className="mt-2">
          <Grid container spacing={1} className="mt-2 category  ">
            {categoryData.map((category, index) => (
              <Grid item xs={1} className="m-2" key={index}>
                <Grid
                  item
                  xs={1}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    props.filterData(category.id);
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.category}
                    height="40"
                    width="40"
                    style={{ padding: "5px" }}
                  />
                  <Typography className="m-2">{category.category}</Typography>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={1} className="mt-2  text-center">
              <Button
                className="mt-2  button"
                onClick={() => {
                  props.filterData(0);
                }}
              >
                Clear All
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={1} className="mt-2">
          <Grid container spacing={1} className="mt-2 category  ">
            <Stack sx={{ width: "100%", color: "grey.500" }} className="mt-2" spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default TourCategory;
