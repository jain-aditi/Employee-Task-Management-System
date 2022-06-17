import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../services/FirebaseConfig";
import { getUsers } from "../../../services/FirestoreActions";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditTask = ({ task, hideModalHandler }) => {
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = useState([]);

  const [values, setValues] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    assignedTo: task.assignedTo,
  });

  const editDetails = (event) => {
    event.preventDefault();
    const docRef = doc(db, "tasks", task.id);
    updateDoc(docRef, {
      ...values,
    }).then(() => {
      setOpen(true);
      hideModalHandler();
      alert("Task updated..");
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleChange = (e) => {
    switch (e.target.name) {
      case "estimatedHours":
        setValues({
          ...values,
          [e.target.name]: Number(e.target.value),
        });
        break;
      default:
        setValues({
          ...values,
          [e.target.name]: e.target.value,
        });
    }
  };

  useEffect(() => {
    getUsers().then((res) => {
      setEmployees(res);
    });
    return () => {
      setEmployees([]);
    };
  }, []);

  return (
    <>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Task
        </Typography>
        <form onSubmit={editDetails}>
          <TextField
            fullWidth
            variant="outlined"
            label="Title"
            name="title"
            defaultValue={task.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Description"
            name="description"
            defaultValue={task.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Estimated Hours"
            name="estimatedHours"
            defaultValue={task.estimatedHours}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ padding: 0 }}>
            <InputLabel>Assign To</InputLabel>
            <Select
              id="assignedTo"
              fullWidth
              size="small"
              type="outlined"
              label="Assign To"
              name="assignedTo"
              value={task.assignedTo}
              onChange={(event) => handleChange(event)}
              sx={{ mb: 2, padding: "8.5px 14px" }}
            >
              {employees.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.displayName} - {item.designation}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button variant="contained" fullWidth={true} type="submit">
            Update Task
          </Button>
        </form>
        <Button
            variant="outlined"
            color="error"
            fullWidth={true}
            onClick={hideModalHandler}
            sx={{mt:2}}
          >
            Cancel
          </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          task updated!
        </Alert>
      </Snackbar>
    </>
  );
};
export default EditTask;
