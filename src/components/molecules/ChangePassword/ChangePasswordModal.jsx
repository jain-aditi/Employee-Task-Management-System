import { Box, Button, TextField, Typography } from "@mui/material";
import {
  EmailAuthProvider, reauthenticateWithCredential,
  updatePassword
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../../services/FirebaseConfig";

const ChangePasswordModal = ({ hideModalHandler }) => {
  const [values, setValues] = useState({
    curPassword: "",
    newPassword: "",
    cnfPassword: "",
  });

  const changePassword = (event) => {
    event.preventDefault();
    const user = auth.currentUser;
    const password = values.curPassword;
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      reauthenticateWithCredential(user, credential).then(() => {
        values.newPassword === values.cnfPassword &&
          updatePassword(user, values.newPassword)
            .then(() => {
              alert("password updated");
            })
            .catch((error) => {
              alert("password updation failed..");
            });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Change Password
      </Typography>
      <form onSubmit={changePassword}>
        <TextField
          fullWidth
          variant="outlined"
          label="Current Password"
          name="curPassword"
          sx={{ mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="New Password"
          name="newPassword"
          sx={{ mb: 2 }}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          label="Confirm New Password"
          sx={{ mb: 2 }}
          name="cnfPassword"
          onChange={handleChange}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" fullWidth={true} type="submit">
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ChangePasswordModal;
