import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  EnhancedTableHead,
  EnhancedTableToolbar,
  getComparator,
  stableSort,
} from "../../../components/atoms/Table/TableFunctions";
import { db } from "../../../services/FirebaseConfig";
import { getUserName } from "../../../services/FirestoreActions";
import { getCookieStorage } from "../../../utils/Cookies/Cookies";
import Modals from "../../atoms/Modals/Modals";
import { customStyles } from "../../atoms/Modals/ModalStyles";
import CreateTask from "../CreateTask/CreateTask";
import EditTask from "../EditTask/EditTask";
import Draggable from "react-draggable";

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
    id: "assignedTo",
    numeric: false,
    disablePadding: false,
    label: "Assigned To",
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
  {
    id: "edit",
    numeric: false,
    disablePadding: false,
    label: "",
  },
  {
    id: "delete",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const TasksIAssigned = ({ tasks }) => {
  const [user, setUser] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [taskDetails, setTaskDetails] = useState({});
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const hideEditTaskModalHandler = () => {
    setIsEditTaskModalOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogOpen = (row) => {
    setRecordToDelete(row);
    setIsDialogOpen(true);
  };

  const deleteTask = () => {
    deleteDoc(doc(db, "tasks", recordToDelete.id))
      .then(() => {
        console.log("deletion successful..");
        handleDialogClose();
        alert("Item deleted..");
      })
      .catch((err) => {
        console.log("Deletion error:", err);
        alert("Deletion error:", err);
      });
  };

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

  const openEditModal = (event, details) => {
    setTaskDetails(details);
    setIsEditTaskModalOpen(true);
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
        if (user && user.uid && user.uid === doc.assignedBy) {
          const res = await getUserName(doc.assignedTo);
          localTasks.push({
            ...doc,
            assignedToName: res,
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
        <Box>You have Assigned No Tasks</Box>
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
                          {console.log("rowdetails: ", row)}
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
                          <TableCell>{row.assignedToName}</TableCell>
                          <TableCell align="right">
                            {row.estimatedHours}
                          </TableCell>
                          <TableCell>
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
                          <TableCell>
                            {
                              <Tooltip title="Edit" color="primary">
                                <IconButton
                                  onClick={(event) => openEditModal(event, row)}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            }
                          </TableCell>
                          <TableCell>
                            {
                              <Tooltip title="Delete" color="error">
                                <IconButton
                                  onClick={() => handleDialogOpen(row)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            }
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
      <Modals buttonText="Create New Task">
        <CreateTask />
      </Modals>
      <Modal
        style={customStyles}
        isOpen={isEditTaskModalOpen}
        onRequestClose={hideEditTaskModalHandler}
      >
        <EditTask
          task={taskDetails}
          hideModalHandler={hideEditTaskModalHandler}
        />
      </Modal>
      {/* Delete Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete {recordToDelete.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will not be able to recover deleted data. Do you wish to
            continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            No
          </Button>
          <Button onClick={() => deleteTask()}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TasksIAssigned;
