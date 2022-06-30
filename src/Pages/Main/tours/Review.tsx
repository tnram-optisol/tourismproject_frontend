import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../Main.css";
import { getReview, postReview } from "Services/api/userAPI";
import FormikContainer from "Component/Form/FormikContainer";
import { POSTREVIEW_INITIAL_VALUES } from "utils/Form/InitialValues/formInitial";
import { POSTREVIEW_VALIDATION_SCHEMA } from "utils/Form/ValidationSchema/formValidation";
import { REVIEW_FORM_DATA } from "utils/Form/formFields/formFields";
import InputControl from "Component/Form/InputControl";

function Review(props: any) {
  const tour_id = props.tour;
  const [reviews, setReview] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id: any) => {
    setOpen(true);
  };
  const [initialValues, setInitialValues] = useState({
    ...POSTREVIEW_INITIAL_VALUES,
    tour: tour_id,
  });
  const handleClose = () => {
    setOpen(false);
    getAllReviews();
  };
  const getAllReviews = () => {
    getReview(tour_id)
      .then((res) => {
        setReview([...res.data]);
        console.log(reviews);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => getAllReviews, []);
  return (
    <Box>
      <Box>
        {reviews.map((review, index) => (
          <Grid container spacing={1} key={index}>
            <Grid item xs={9}>
              <Typography variant="body1">
                Posted By: {review.posted_By}
              </Typography>
              <Typography variant="body1">Comment: {review.review}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Rating name="read-only" value={review.rating} readOnly />
            </Grid>
          </Grid>
        ))}
      </Box>
      <Grid container spacing={2} className="m-1">
        <Button
          variant="contained"
          color="success"
          className="m-1"
          onClick={() => handleClickOpen(tour_id)}
        >
          Post Review
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Review Form</DialogTitle>
          <Divider />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormikContainer
                className="review-form"
                initialValues={initialValues}
                formData={REVIEW_FORM_DATA}
                validationSchema={POSTREVIEW_VALIDATION_SCHEMA}
                buttonName={"Post Review"}
                endPoint={"/review"}
                apiCall={postReview}
              />
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default Review;
