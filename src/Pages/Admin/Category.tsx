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
import React, { useEffect, useState } from "react";

import MyTable from "Component/Table/MyTable";
import AdminLayout from "Component/Wrapper/AdminLayout";
import Loader from "Layout/Loader";
import { adminRemoveCategory } from "Services/api/adminAPI";
import { CATEGORY_TABLE_FIELDS } from "utils/Table/tableFields";
import AddCategory from "./AddCategory";
import { getAdminCategoryData } from "store/reducers/adminReducer";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";

function Category() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.admin.value.loading);
  const category = useAppSelector((state) => state.admin.value.category);
  const totalData = useAppSelector((state) => state.admin.value.categoryCount);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(getAdminCategoryData({ page, limit, searchQuery }));
  };
  const getAllCategory = () => {
    dispatch(getAdminCategoryData({ page, limit, searchQuery }));
  };
  useEffect(() => {
    dispatch(getAdminCategoryData({ page, limit, searchQuery }));
  }, [dispatch, limit, page, searchQuery]);

  const deleteCategory = (id: number) => {
    adminRemoveCategory(id)
      .then((res) => {
        console.log(res);
        getAllCategory();
      })
      .catch((err) => {
        console.log(err);
      });
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
  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <AdminLayout>
      {!loading ? (
        <Box className="m-auto">
          <Box>
            <FormControl>
              <TextField
                className="mr-auto"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={(event) => handleOnChange(event)}
                placeholder="Search for Category"
                value={searchQuery}
                autoFocus
              />
            </FormControl>
            <MyTable>
              <TableHead>
                <TableRow>
                  {CATEGORY_TABLE_FIELDS.map((el) => (
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
                {category.map((category: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {category.id}
                    </TableCell>
                    <TableCell>{category.category}</TableCell>
                    <TableCell>
                      <img
                        src={category.image}
                        alt={category.category}
                        height="70"
                        width="70"
                        style={{ padding: "5px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
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
            </MyTable>
          </Box>
          <Button className="button" onClick={() => handleClickOpen()}>
            Add Category
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <AddCategory />
          </Dialog>
        </Box>
      ) : (
        <Loader />
      )}
    </AdminLayout>
  );
}

export default Category;
