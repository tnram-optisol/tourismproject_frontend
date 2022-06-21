import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, } from "react";

import {
  adminApproveRequest,
  adminRejectRequest,
} from "Services/api/adminAPI";
import MyTable from "Component/Table/MyTable";
import { REQUEST_TABLE_FIELDS } from "utils/Table/tableFields";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { getAdminRequestData } from "store/reducers/adminReducer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

function Requests() {
  let sequence = 1;
  const dispatch = useAppDispatch()
  const loading = useAppSelector((state) => state.admin.value.loading);
  const requestData = useAppSelector((state) => state.admin.value.requests);
  const getRequest = () => {
    dispatch(getAdminRequestData());
  };
  useEffect(() => {
    dispatch(getAdminRequestData());
  }, [dispatch]);
  const approveStatus = (data:any) => {
    const role = data.user.role.id;
    if (role === 2) {
      adminApproveRequest({
        user: data.user.id,
        role: data.user.role.id,
        status: true,
        property: data.hotel_id,
        sequence: sequence + 1,
      })
        .then((res) => {
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      adminApproveRequest({
        user: data.user.id,
        role: data.user.role.id,
        status: true,
        property: data.tour_id,
        sequence: sequence + 1,
      })
        .then((res) => {
          getRequest();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const rejectStatus = (data: any) => {
    adminRejectRequest({
      user: data.user.id,
      role: data.user.role.id,
      status: false,
      sequence: sequence + 1,
    })
      .then((res) => {
        getRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <AdminLayout>
      {!loading ? (
        <Box>
          <MyTable>
            <TableHead>
              <TableRow>
                {REQUEST_TABLE_FIELDS.map((el) => (
                  <TableCell
                    key={el}
                    sx={
                      el === "Actions"
                        ? { width: "20%", textAlign: "center" }
                        : { width: "20%" }
                    }
                    colSpan={el === "Actions" ? 2 : 0}
                  >
                    {el}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requestData.map((data: any, index) => (
                <TableRow key={index}>
                  <TableCell>{data.user.role.role}</TableCell>
                  <TableCell>{data.user.name}</TableCell>
                  <TableCell>
                    {data.status ? "Approved" : "Not Approved"}
                  </TableCell>
                  <TableCell>
                    {data.hotel_name ? data.hotel_name : data.package_name}
                  </TableCell>
                  <TableCell>
                    {data.hotel_license ? data.hotel_license : data.provider_license}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        approveStatus(data);
                      }}
                    >
                      Approval
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        rejectStatus(data);
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MyTable>
        </Box>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}

export default Requests;
