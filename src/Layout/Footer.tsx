import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";
import React from "react";
import ContactForm from "../Pages/Forms/ContactForm";
import { MDBFooter } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <footer>
      <MDBFooter
        bgColor="dark"
        className=" text-center text-lg-start text-muted my-footer"
      >
        <Box sx={{ color: "#f5deb3" }}>
          <Grid container spacing={1} className="footer-grid">
            <Grid item xs={2}>
              <Container maxWidth="md">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgColor: "background.paper",
                  }}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Tours" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="My Orders" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Terms and Conditions" />
                  </ListItem>
                </List>
              </Container>
            </Grid>
            <Grid item xs>
              <Container maxWidth="md">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgColor: "background.paper",
                  }}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem button>
                    <ListItemText primary="Working Hours : " />
                    <ListItemText primary="10 A.M to 8 P.M" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Available Days : " />
                    <ListItemText primary="All Days" />
                  </ListItem>
                </List>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container maxWidth="md">
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgColor: "background.paper",
                  }}
                  component="nav"
                  aria-label="mailbox folders"
                >
                  <ListItem button>
                    <ListItemText primary="Locations " />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="India" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="France" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="USA" />
                  </ListItem>
                </List>
              </Container>
            </Grid>
            <Grid item xs={4}>
              <Container maxWidth="lg">
                <Typography variant="h6" color="whitesmoke">
                Contact Us !!
              </Typography>
              <ContactForm />
              </Container>
            </Grid>
          </Grid>
        </Box>
      </MDBFooter>
    </footer>
  );
}
