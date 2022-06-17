import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Divider,
  FormControl, IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginStart } from "../../redux/RegisterRedux/RegisterActions";
import "./Login.css";
import LoginLeft from "./LoginLeft";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
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

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart(values.email, values.password))
  };

  useEffect(() => {
    user ? navigate("/") : navigate("/login");
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      setValues(values => ({
        ...values,
        email: "",
        password: "",
      }));
    };
  }, []);

  return (
    <Box className="login-outer">
      <LoginLeft />
      <Box className="form-signin">
        <form onSubmit={handleSubmit}>
          <Typography variant="h5">Mala ML</Typography>
          <Box>
            <FormControl sx={{ mt: 3, width: "100%" }} variant="outlined">
              <TextField
                fullWidth
                id="login-email"
                name="email"
                defaultValue={values.email}
                label="Email"
                onChange={handleChange}
                required={true}
              />
            </FormControl>

            <FormControl
              sx={{ mt: 1, mb: 2, width: "100%" }}
              variant="outlined"
            >
              <InputLabel htmlFor="password">Password *</InputLabel>
              <OutlinedInput
                fullWidth
                id="password"
                type={values.showPassword ? "text" : "password"}
                defaultValue={values.password}
                name="password"
                label="Password"
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
          <Button variant="contained" type="submit">
            Sign-in
          </Button>
        </form>
        <Divider sx={{ my: 4 }} />
        <Link to="/register" className="text-decor-none">
          <Button variant="text">Create new Account</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
