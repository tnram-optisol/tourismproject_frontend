import { Box, Grid } from "@mui/material";
import MyCarousel from "./Carousel";
import Features from "./Features";

function ToursLayout() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <MyCarousel />
        </Grid>
      </Grid>
      <Grid container className="detail">
        <Features/>
      </Grid>
    </Box>
  );
}

export default ToursLayout;
