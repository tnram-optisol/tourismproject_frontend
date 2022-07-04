import {
  Box,
  Button,
  FormControl,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { adminApproveRequest, adminRejectRequest } from "Services/api/adminAPI";
import MyTable from "Component/Table/MyTable";
import { REQUEST_TABLE_FIELDS } from "utils/Table/tableFields";
import Loader from "Layout/Loader";
import { getAdminHotelRequestData } from "store/reducers/adminReducer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

const HotelRequests = () => {
  let sequence = 1;
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.admin.value.loading);
  const totalData = useAppSelector(
    (state) => state.admin.value.hotelRequestsCount
  );
  const requestData = useAppSelector(
    (state) => state.admin.value.hotelRequests
  );
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const getRequest = () => {
    dispatch(getAdminHotelRequestData({ page, limit, searchQuery }));
  };
  useEffect(() => {
    dispatch(getAdminHotelRequestData({ page, limit, searchQuery }));
  }, [dispatch, limit, page, searchQuery]);

  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleChangePage = (event: any, newPage: number) => {
    console.log(event, newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setLimit(event.target.value);
    setPage(0);
  };

  const approveStatus = (data: any) => {
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
  };
  const rejectStatus = (data: any) => {
    adminRejectRequest({
      user: data.user.id,
      role: data.user.role.id,
      status: false,
      property: data.hotel_id,
      sequence: sequence + 1,
    })
      .then((res) => {
        getRequest();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return !loading ? (
    <Box className="mt-3">
      <FormControl>
        <TextField
          className="mr-auto"
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={(event) => handleOnChange(event)}
          placeholder="Search for Packages"
          value={searchQuery}
          autoFocus
        />
      </FormControl>
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
          {requestData.map((data: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{data.user.role.role}</TableCell>
              <TableCell>{data.user.name}</TableCell>
              <TableCell
                className={data.status ? "text-success" : "text-danger"}
              >
                {data.status ? "Approved" : "Not Approved"}
              </TableCell>
              <TableCell>{data.hotel_name}</TableCell>
              <TableCell>{data.hotel_license}</TableCell>
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
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              rowSpan={2}
              colSpan={4}
              count={totalData}
              rowsPerPage={limit}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableBody>
      </MyTable>
    </Box>
  ) : (
    <Loader />
  );
};

export default HotelRequests;
