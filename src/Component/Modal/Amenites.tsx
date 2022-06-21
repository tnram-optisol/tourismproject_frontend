import {
  faBowlFood,
  faCamera,
  faLock,
  faMobile,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Divider,Typography } from "@mui/material";
import React from "react";

function Amenites() {
  return (
    <Box className="m-2">
      <Typography variant="h6">List of Ammenities</Typography>
      <Typography variant="body1" color="blueviolet" className="m-1">
        <FontAwesomeIcon icon={faCamera} className="m-1" />
        Camera
      </Typography>
      <Typography variant="body1" color="blueviolet" className=" m-1">
        <FontAwesomeIcon icon={faMobile} className="m-1" />
        Mobiles
      </Typography>
      <Divider />
      <Typography variant="body1" color="blueviolet" className="m-1">
        <FontAwesomeIcon icon={faBowlFood} className="m-1"/>
        Free Break Fast
      </Typography>
      <Divider />
      <Typography variant="body1" color="blueviolet" className="m-1">
        <FontAwesomeIcon icon={faLock} className="m-1" />
        Locker Service
      </Typography>
      <Typography variant="body1" color="blueviolet" className="m-1">
        <FontAwesomeIcon icon={faWater} className="m-1"/>
        Pure Drinking Water
      </Typography>
    </Box>
  );
}

export default Amenites;
