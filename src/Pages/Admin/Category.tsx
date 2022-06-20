import {
  Box,
  Button,
  Dialog,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
  const loading = useAppSelector((state) => state.admin.value.loading)
  const category = useAppSelector((state)=>state.admin.value.category)
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(getAdminCategoryData())
  };
  const getAllCategory = () => {
    dispatch(getAdminCategoryData())
  };
  useEffect(() => getAllCategory, [dispatch]);
  const deleteCategory = (id:number) => {
    adminRemoveCategory(id)
      .then((res) => {
        console.log(res);
        getAllCategory();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AdminLayout>
      {!loading ? (
        <Box className="m-auto">
          <Box>
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
                {category.map((category, index) => (
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
