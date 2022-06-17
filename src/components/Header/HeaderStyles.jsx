import { blue } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingTop: "64px",
    paddingLeft: "256px",
    paddingRight: "16px",
    paddingBottom: "16px"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  SidenavMargin:{
    marginRight:'256px',
  },
  logo: {
    color: "white",
    
  },
  navlist: {
    minWidth: "250px",
    maxWidth: "300px",
  },
  ulAvatar: {
    backgroundColor: blue["A200"],
    color: "white",
  },
  navAvatar: {
    width: "35px",
    height: "35px",
  },
}));
