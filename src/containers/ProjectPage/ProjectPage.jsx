import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";
import * as React from "react";
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  getComparator,
  stableSort
} from "../../components/atoms/Table/TableFunctions";

function createData(name, projectHead, client, startDate, endDate) {
  return {
    name,
    projectHead,
    client,
    startDate,
    endDate,
  };
}

const rows = [
  createData(
    "Envir",
    "Lokesh",
    "X",
    new Date("2021/11/12"),
    new Date("2022/02/02")
  ),
  createData(
    "Amnic",
    "Kapil",
    "E",
    new Date("2021/12/21"),
    new Date("2022/02/02")
  ),
  createData(
    "Eclair",
    "Mayank",
    "F",
    new Date("2021/01/12"),
    new Date("2022/02/02")
  ),
  createData(
    "Frozen yoghurt",
    "Ashish",
    "G",
    new Date("2021/12/13"),
    new Date("2022/02/02")
  ),
  createData(
    "Gingerbread",
    "Amisha",
    "Q",
    new Date("2021/05/05"),
    new Date("2022/02/02")
  ),
  createData(
    "Honeycomb",
    "Harsh",
    "C",
    new Date("2021/06/10"),
    new Date("2022/02/02")
  ),
  createData(
    "Sandwich",
    "Pooja",
    "K",
    new Date("2021/11/11"),
    new Date("2022/02/02")
  ),
  createData(
    "Jelly Bean",
    "Hiren",
    "T",
    new Date("2021/12/11"),
    new Date("2022/02/02")
  ),
  createData(
    "KitKat",
    "Ronak",
    "I",
    new Date("2021/09/03"),
    new Date("2022/02/02")
  ),
  createData(
    "Lollipop",
    "Divye",
    "L",
    new Date("2021/02/07"),
    new Date("2022/02/02")
  ),
  createData(
    "Marshmallow",
    "Nishant",
    "S",
    new Date("2021/08/07"),
    new Date("2022/02/02")
  ),
  createData(
    "Nougat",
    "Shubham",
    "P",
    new Date("2021/12/22"),
    new Date("2022/02/02")
  ),
  createData(
    "Oreo",
    "Sumit",
    "Z",
    new Date("2021/12/11"),
    new Date("2022/02/02")
  ),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Project Title",
  },
  {
    id: "projectHead",
    numeric: false,
    disablePadding: false,
    label: "Project Head",
  },
  {
    id: "client",
    numeric: false,
    disablePadding: false,
    label: "Client",
  },
  {
    id: "startDate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "endDate",
    numeric: true,
    disablePadding: false,
    label: "End Date",
  },
];

const ProjectPage = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          title="Projects"
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.projectHead}</TableCell>
                      <TableCell>{row.client}</TableCell>
                      <TableCell>
                        {format(row.startDate, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(row.endDate, "dd MMM yyyy")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                // style={{
                //   height: 53 * emptyRows,
                // }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ProjectPage;
