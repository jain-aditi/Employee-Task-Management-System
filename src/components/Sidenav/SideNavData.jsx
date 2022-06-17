import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { useStyles } from "./SideNavStyles";

const SideNavData = () => {
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState("Dashboard");
  const listData = [
    {
      label: "Tasks",
      link: "/",
      icon: <AssignmentIcon />,
    },
    {
      label: "Projects",
      link: "/projects",
      icon: <BookIcon />,
    },
    {
      label: "Users",
      link: "/users",
      icon: <GroupIcon />,
    },
  ];

  return (
    <List>
      {listData.map((item, key) => (
        <ListItem
          component={NavLink}
          to={item.link}
          className={
            isActive === item.label ? classes.active : classes.navLinks
          }
          button
          key={key}
          onClick={() => setIsActive(item.label)}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>{item.label}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default SideNavData;
