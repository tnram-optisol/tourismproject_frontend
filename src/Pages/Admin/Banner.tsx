import {
  Box,
  Button,
  Dialog,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { BANNER_TABLE_FIELDS } from "utils/Table/tableFields";
import SequenceForm from "./SequenceForm";
import { getAdminBannerData } from "store/reducers/adminReducer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

function Banner() {
  const [open, setOpen] = useState(false);
  const [tourId, setTourId] = useState(0);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.admin.value.loading);
  const banner = useAppSelector((state) => state.admin.value.banner);
  const handleClickOpen = (id: number) => {
    setTourId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(getAdminBannerData());
  };
  useEffect(() => {
    dispatch(getAdminBannerData());
  }, [dispatch]);
  return (
    <AdminLayout>
      <Box>
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <MyTable>
            <TableHead>
              <TableRow>
                {BANNER_TABLE_FIELDS.map((el) => (
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
              {banner.map((row: any, index:number) => (
                <TableRow
                  className="tab_row"
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.tour.package_name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.sequence}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="button"
                      color="success"
                      onClick={() => handleClickOpen(row.tour.tour_id)}
                    >
                      Change Sequence
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button className="button">
                      <Link
                        to={`/admin/update/${row.tour.tour_id}`}
                        className="nav-link"
                      >
                        Update Category
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MyTable>
        )}

        <Dialog open={open} onClose={handleClose}>
          <SequenceForm tourId={tourId} />
        </Dialog>
      </Box>
    </AdminLayout>
  );
}

export default Banner;
