import {
  Box,
  Button,
  Dialog,
  FormControl,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import MyTable from "Component/Table/MyTable";
import Loader from "Layout/Loader";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import AddCoupon from "./AddCoupon";
import { getAdminCoupon } from "store/reducers/adminReducer";

function Coupons() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.admin.value.loading);
  const coupons = useAppSelector((state) => state.admin.value.coupons);
  const totalData = useAppSelector((state) => state.admin.value.totalCoupon);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getAdminCoupon({ page, limit, searchQuery }));
  };

  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    dispatch(getAdminCoupon({ page, limit, searchQuery }));
  }, [dispatch, limit, page, searchQuery]);

  const handleChangePage = (event: any, newPage: number) => {
    console.log(event, newPage);
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setLimit(event.target.value);
    setPage(0);
  };
  return (
    <Box>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
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
                <TableCell>Coupon Id</TableCell>
                <TableCell>Coupon Name</TableCell>
                <TableCell>Percentage Off</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((row, index: number) => (
                <TableRow
                  className="tab_row"
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.coupon_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.coupon_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.percent_off}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    { label: "All", value: totalData },
                  ]}
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
          <Button
            className="button"
            color="success"
            onClick={() => handleClickOpen()}
          >
            Add Coupon
          </Button>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <AddCoupon />
      </Dialog>
    </Box>
  );
}

export default Coupons;
