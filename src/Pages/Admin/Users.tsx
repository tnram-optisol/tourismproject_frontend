import React, { useEffect, useState } from "react";
import {
  FormControl,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Box
} from "@mui/material";

import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import { getAdminAllUserData } from "store/reducers/adminReducer";
import Loader from "Layout/Loader";

function Users() {
  const users = useAppSelector((state) => state.admin.value.users);
  const loading = useAppSelector((state) => state.admin.value.loading);
  const dispatch = useAppDispatch();
  const totalData = useAppSelector((state) => state.admin.value.usersCount);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(getAdminAllUserData({ page, limit, searchQuery }));
  }, [dispatch, limit, page, searchQuery]);
  const handleChangePage = (event: any, newPage: number) => {
    console.log(event, newPage);
    setPage(newPage);
    dispatch(getAdminAllUserData({ page, limit, searchQuery }));
  };
  const handleChangeRowsPerPage = (event: any) => {
    console.log(event.target.value, parseInt(event.target.value, 10));
    setLimit(event.target.value);
    dispatch(getAdminAllUserData({ page, limit, searchQuery }));
    setPage(0);
  };
  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <AdminLayout>
      <Box className="mt-2">
        {loading ? (
          <Loader />
        ) : (
          <Box className="mt-2">
            <Typography variant="h6" color="blue">
              All Users
            </Typography>
            <FormControl>
              <TextField
                className="mr-auto"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(event) => handleOnChange(event)}
                placeholder="Search for User"
                value={searchQuery}
                autoFocus
              />
            </FormControl>
            <MyTable>
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>User Email</TableCell>
                  <TableCell>Contact </TableCell>
                  <TableCell>Place</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-primary">{user.id}</TableCell>
                    <TableCell className="text-primary">{user.name}</TableCell>
                    <TableCell className="text-primary">{user.email}</TableCell>
                    <TableCell className="text-primary">
                      {user.contact}
                    </TableCell>
                    <TableCell className="text-primary">{user.place}</TableCell>
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
        )}
      </Box>
    </AdminLayout>
  );
}

export default Users;
