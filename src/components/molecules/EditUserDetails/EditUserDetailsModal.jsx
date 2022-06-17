import { Box, Button, TextField, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../../services/FirebaseConfig";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditUserDetailsModal = ({ userDetails, hideModalHandler }) => {
  const [open, setOpen] = React.useState(false);

  const [values, setValues] = useState({
    displayName: userDetails.displayName,
    email: userDetails.email,
    designation: userDetails.designation,
    Salary: userDetails.Salary,
  });

  const rows = [
    {
      label: "Full Name",
      name: "name",
      defaultValue: values.displayName,
      disabled: false,
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      defaultValue: values.email,
      disabled: true,
      type: "text",
    },
    {
      label: "Designation",
      name: "designation",
      defaultValue: values.designation,
      disabled: false,
      type: "text",
    },
    {
      label: "Salary",
      name: "Salary",
      defaultValue: values.Salary,
      disabled: false,
      type: "number",
    },
  ];

  const editDetails = (event) => {
    event.preventDefault();
    const docRef = doc(db, "user-details", auth.currentUser.uid);
    updateDoc(docRef, {
      ...values,
    }).then(() => {
      setOpen(true);
      alert("Details updated..");
    });
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "Salary":
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box sx={{}}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Your Details
        </Typography>
        <form onSubmit={editDetails}>
          {rows.map((row, idx) => (
            <TextField
              key={row.name}
              fullWidth
              variant="outlined"
              label={row.label}
              name={row.name}
              defaultValue={row.defaultValue}
              disabled={row.disabled}
              onChange={handleChange}
              sx={{ mb: 2 }}
              type={row.type}
            />
          ))}
          <Button variant="contained" fullWidth={true} type="submit">
            Update Details
          </Button>
        </form>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
};
export default EditUserDetailsModal;
