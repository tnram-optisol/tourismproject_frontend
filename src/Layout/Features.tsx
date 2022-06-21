import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import MyCardAction from "../Component/Cards/MyCardAction";
import MyCardBody from "../Component/Cards/MyCardBody";
import MyCardHeader from "../Component/Cards/MyCardHeader";
import MyCardMedia from "../Component/Cards/MyCardMedia";
import "./Layout.css";
export default function Features() {
  return (
    <Carousel className="m-2">
      <Carousel.Item>
        <Grid container spacing={2} className="card-carousel">
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"Cost Effective"} />
            <MyCardMedia
              img={
                "https://i.insider.com/611d03ffc040ad0018cede22?width=1000&format=jpeg&auto=webp"
              }
              alt={"wallet"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"secondary"}
                data={
                  "Cost Effective Package for make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"Memorable Days"} />
            <MyCardMedia
              img={
                "https://freepngimg.com/thumb/calendar/2-2-calendar-png-image.png"
              }
              alt={"Memorable Days"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"primary"}
                data={
                  "Time to Explore a new Thing.Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"World Tour"} />
            <MyCardMedia
              img={"https://www.seekpng.com/png/detail/18-184493_tour-travel-png-images-travel-tour-png.png"}
              alt={"World Tour"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"error"}
                data={
                  "Book Your Tour to Explore world with us.Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"Bon Voyage"} />
            <MyCardMedia
              img={
                "https://english.cdn.zeenews.com/sites/default/files/2022/05/15/1042734-jet-airways-up.jpg"
              }
              alt={"Bon Voyage"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"error"}
                data={
                  "Book a Tour with us.Bon Voyage to all.Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
        </Grid>
      </Carousel.Item>
      <Carousel.Item>
        <Grid container spacing={2} className="card-carousel">
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"Luxurious Hotels"} />
            <MyCardMedia
              img={
                "https://pix10.agoda.net/hotelImages/691/6919179/6919179_19032219230073193648.jpg?ca=8&ce=1&s=1024x768"
              }
              alt={"Luxurious Hotels"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"success"}
                data={
                  "Stay in Luxurious Hotels. Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"All Loactions"} />
            <MyCardMedia
              img={
                "https://www.seekpng.com/png/detail/18-184493_tour-travel-png-images-travel-tour-png.png"
              }
              alt={"All Loactions"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"primary"}
                data={
                  "Travel to all parts of the World.Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"All Days"} />
            <MyCardMedia
              img={
                "https://imageio.forbes.com/specials-images/dam/imageserve/1128442176/960x0.jpg?fit=bounds&format=jpg&width=960"
              }
              alt={"All Days"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"primary"}
                data={
                  "Customized for your holidays. Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
          <Card
            sx={{ maxWidth: 300, boxShadow: "5px 5px 5px black" }}
            className="my-card"
          >
            <MyCardHeader title={"Free for Children"} />
            <MyCardMedia
              img={
                "https://www.pinclipart.com/picdir/middle/98-989108_children-s-clothing-dress-cartoon-kids-welcome-clip.png"
              }
              alt={"Free for Children"}
            />
            <CardContent>
              <MyCardBody
                variant={"body1"}
                color={"danger"}
                data={
                  "Free for 2 Children upto 10 years .Make your holidays remarkable !!"
                }
              />
            </CardContent>
            <MyCardAction
              variant={"outlined"}
              color={"primary"}
              data={"Read More"}
            />
          </Card>
        </Grid>
      </Carousel.Item>
    </Carousel>
  );
}
