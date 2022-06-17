import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Hidden, IconButton } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useStyles } from "./HeaderStyles";
import Profile from "./NavTabs/Profile";


const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems:'center',
            }}
          >
            <IconButton type="text" color="inherit" onClick={props.handleDrawerOpen}>
              <MenuRoundedIcon />
            </IconButton>
            <Typography variant="h4" component='h6' className={classes.logo}>
              ETMS
            </Typography>
          </Box>
          <Hidden mdDown>
            <Box sx={{ display: "flex", alignContent: "center" }}>
              <Profile />
            </Box>
          </Hidden>
          <Hidden mdUp>
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
