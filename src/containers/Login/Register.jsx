import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../../redux/RegisterRedux/RegisterActions";
import { Link, useNavigate } from "react-router-dom";
import LoginLeft from "./LoginLeft";

const Register = () => {
  const [values, setValues] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.user }));

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) return;
    dispatch(registerStart(values.email, values.password, values.displayName));
    setValues({
      ...values,
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    user ? navigate("/") : navigate("/register");
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      setValues(values => ({
        ...values,
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }));
    };
  }, []);

  return (
    <Box className="login-outer">
      <LoginLeft />
      <Box className="form-signin">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Sign - Up</Typography>
          <Box>
            <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
              <TextField
                fullWidth
                id="displayName"
                name="displayName"
                defaultValue={values.displayName}
                label="Full Name"
                onChange={handleChange}
                required={true}
              />
            </FormControl>
            <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
              <TextField
                fullWidth
                id="login-email"
                name="email"
                defaultValue={values.email}
                label="Email"
                required={true}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                fullWidth
                id="password"
                type={values.showPassword ? "text" : "password"}
                defaultValue={values.password}
                name="password"
                label="Password"
                required={true}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="password">Confirm Password *</InputLabel>
              <OutlinedInput
                fullWidth
                id="confirmPassword"
                type={values.showPassword ? "text" : "password"}
                defaultValue={values.password}
                name="confirmPassword"
                label="Confirm Password"
                onChange={handleChange}
                required={true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Button sx={{ mt: 2 }} variant="contained" type="submit">
            Sign-up
          </Button>
        </form>
        <Divider sx={{ my: 4 }} />
        <Link to="/login" className="text-decor-none">
          <Button variant="text" sx={{ textDecoration: "none" }}>
            Back to Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
