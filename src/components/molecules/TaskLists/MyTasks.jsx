import { MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  getComparator,
  stableSort,
} from "../../../components/atoms/Table/TableFunctions";
import { db } from "../../../services/FirebaseConfig";
import { getUserName } from "../../../services/FirestoreActions";
import { getCookieStorage } from "../../../utils/Cookies/Cookies";

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Title",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "assignedBy",
    numeric: false,
    disablePadding: false,
    label: "Assigned By",
  },
  {
    id: "estimatedHours",
    numeric: true,
    disablePadding: false,
    label: "Estimated Hours",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

const MyTasks = ({ tasks }) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
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

  const handleStatusChange = (event, id) => {
    let status = event.target.value;
    const docRef = doc(db, "tasks", id);
    updateDoc(docRef, {
      status: status,
    }).then(() => console.log("status changed.."));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    setUser(getCookieStorage("user"));
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      if (!user?.uid) return;
      const localTasks = [];
      for (const doc of tasks) {
        if (user && user.uid && user.uid === doc.assignedTo) {
          const res = await getUserName(doc.assignedBy);
          localTasks.push({
            ...doc,
            assignedBy: res,
            id: doc.id,
          });
        }
      }
      console.log(localTasks);
      setRows([...localTasks]);
    };
    getTasks();
    return () => setRows([]);
  }, [user, tasks]);

  return (
    <>
      {!rows?.length ? (
        <Box>You have No Tasks</Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} title="Tasks" />
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
                      const isItemSelected = isSelected(row.title);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.title}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              onClick={(event) => handleClick(event, row.title)}
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
                            {row.title}
                          </TableCell>
                          <TableCell>{row.description}</TableCell>

                          <TableCell>{row.assignedBy}</TableCell>
                          <TableCell align="right">
                            {row.estimatedHours}
                          </TableCell>
                          <TableCell sx={{}}>
                            <Select
                              id="status"
                              size="small"
                              defaultValue={row.status}
                              onChange={(event) =>
                                handleStatusChange(event, row.id)
                              }
                            >
                              <MenuItem value="To-Do">To-Do</MenuItem>
                              <MenuItem value="In Progress">
                                In Progress
                              </MenuItem>
                              <MenuItem value="Done">Done</MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow>
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
      )}
    </>
  );
};

export default MyTasks;
