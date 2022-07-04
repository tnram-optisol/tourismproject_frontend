import React, { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import {
  getAdminNotifications,
  setAdminNotifications,
} from "store/reducers/adminReducer";
import { deleteNotification } from "Services/api/adminAPI";

function Notification() {
  const notifications = useAppSelector(
    (state) => state.admin.value.notifications
  );
  const totalNotifications = useAppSelector(
    (state) => state.admin.value.totalNotifications
  );
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAdminNotifications());
  }, [dispatch]);

  const viewData = (endPoint: string, id: number) => {
    deleteNotification(id)
      .then((res) => {
        dispatch(setAdminNotifications(res.data));
        navigate(endPoint);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const discardNotification = (id: number) => {
    deleteNotification(id)
      .then((res) => {
        dispatch(setAdminNotifications(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewButton = (props: {
    color: "primary" | "secondary" | "success" | "error" | "info" | "warning";
    endPoint: string;
    data: string;
    id: number;
  }) => {
    return (
      <Button
        variant="outlined"
        color={props.color}
        className="m-2"
        onClick={() => viewData(props.endPoint, props.id)}
      >
        {props.data}
      </Button>
    );
  };
  const deleteButton = (props: { id: number }) => {
    return (
      <Button
        variant="outlined"
        color="error"
        className="m-2"
        onClick={() => discardNotification(props.id)}
      >
        Discard
      </Button>
    );
  };

  const displayData = (e: {
    type: string;
    notification: string;
    id: number;
  }) => {
    switch (e.type) {
      case "user":
        return (
          <>
            <Alert severity="success">
              <AlertTitle> Notifications </AlertTitle>
              {e.notification}
              {viewButton({
                color: "success",
                endPoint: "/admin/users",
                data: "View",
                id: e.id,
              })}
              {deleteButton({
                id: e.id,
              })}
            </Alert>
          </>
        );
      case "hotel_order":
        return (
          <>
            <Alert severity="success">
              <AlertTitle> Notifications </AlertTitle>
              {e.notification}
            </Alert>
            {viewButton({
              color: "success",
              endPoint: "/admin/hotel/orders",
              data: "View",
              id: e.id,
            })}
            {deleteButton({
              id: e.id,
            })}
          </>
        );
      case "tour_order":
        return (
          <>
            <Alert severity="success">
              <AlertTitle> Notifications </AlertTitle>
              {e.notification}
              {viewButton({
                color: "success",
                endPoint: "/admin/tour/orders",
                data: "View",
                id: e.id,
              })}
              {deleteButton({
                id: e.id,
              })}
            </Alert>
          </>
        );
      case "tour_request":
        return (
          <>
            <Alert severity="success">
              <AlertTitle> Notifications </AlertTitle>
              {e.notification}
              {viewButton({
                color: "success",
                endPoint: "/admin/requests/tour",
                data: "View",
                id: e.id,
              })}
              {deleteButton({
                id: e.id,
              })}
            </Alert>
          </>
        );
      case "hotel_request":
        return (
          <>
            <Alert severity="success">
              <AlertTitle> Notifications </AlertTitle>
              {e.notification}
              {viewButton({
                color: "success",
                endPoint: "/admin/requests/hotel",
                data: "View",
                id: e.id,
              })}
              {deleteButton({
                id: e.id,
              })}
            </Alert>
          </>
        );
      default:
        return <Typography variant="subtitle1">{e.notification}</Typography>;
    }
  };

  return (
    <Box className="mt-2">
      {!loading ? (
        notifications.length > 0 ? (
          notifications.map((e, index) => (
            <List key={index}>
              <ListItem>
                <ListItemText>{displayData(e)}</ListItemText>
              </ListItem>
            </List>
          ))
        ) : (
          <Typography variant="h6" color="red">
            No new Notifications
          </Typography>
        )
      ) : (
        <Loader />
      )}
    </Box>
  );
}

export default Notification;
