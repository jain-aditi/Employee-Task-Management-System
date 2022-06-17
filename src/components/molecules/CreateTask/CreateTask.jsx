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
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../services/FirebaseConfig";
import { getUsers } from "../../../services/FirestoreActions";

const CreateTask = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    estimatedHours: 0,
    assignedTo: "",
    assignedBy: "",
    status: "To-Do",
  });

  const [employees, setEmployees] = useState([]);
  const { user } = useSelector((state) => ({ ...state.user }));

  const createTask = (event) => {
    event.preventDefault();
    addDoc(collection(db, "tasks"), {
      ...values,
      assignedBy:user.uid
    }).then(() => {
      console.log("Task Created..");
      // hideModalHandler();
    }).catch((err)=>{
      console.log("err:",err);
    });
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
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Create New Task
      </Typography>
      <form onSubmit={createTask}>
        <TextField
          fullWidth
          variant="outlined"
          label="Title"
          name="title"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Description"
          name="description"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Estimated Hours"
          name="estimatedHours"
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{padding:0}}>
          <InputLabel>Assign To</InputLabel>
          <Select
            id="assignedTo"
            fullWidth
            size="small"
            type="outlined"
            label="Assign To"
            name="assignedTo"
            onChange={(event) => handleChange(event)}
            sx={{ mb: 2 , padding: "8.5px 14px" }}
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
          Create Task
        </Button>
      </form>
    </Box>
  );
};
export default CreateTask;
