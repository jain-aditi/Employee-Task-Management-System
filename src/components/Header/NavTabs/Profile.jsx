import LogoutIcon from "@mui/icons-material/Logout";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutStart } from "../../../redux/RegisterRedux/RegisterActions";
import { useStyles } from "../HeaderStyles";
// import { getCookieStorage } from "../../../utils/Cookies/Cookies";

const Profile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => ({ ...state.user }));
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutStart());
  };

  const handleProfile = () => {
    navigate("/myaccount");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dropDownData = [
    {
      label: "My Account",
      icon: <PermIdentityIcon />,
      onClick: handleProfile,
    },
    {
      label: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Box>
      <Button
        id="profile-icon"
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={
          <Avatar className={classes.navAvatar} src={user.photoURL}>
            {user.email[0]}
          </Avatar>
        }
      ></Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "profile-icon",
        }}
      >
        {dropDownData.map((item, i) => (
          <MenuItem
            key={i}
            component={ListItem}
            onClick={(e) => {
              item.onClick(e);
              handleClose();
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
