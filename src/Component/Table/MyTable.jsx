import { Table, TableContainer} from "@mui/material";
import React from "react";

function MyTable(props) {
  const { children } = props;
  return (
    <TableContainer>
      <Table sx={{ minWidth:"50%" }} size="small" aria-label="a dense table">
        {children}
      </Table>
    </TableContainer>
  );
}

export default MyTable;
