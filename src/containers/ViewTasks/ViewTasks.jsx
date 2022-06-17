import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyTasks from '../../components/molecules/TaskLists/MyTasks';
import TasksIAssigned from '../../components/molecules/TaskLists/TasksIAssigned';
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import { getCookieStorage } from "../../utils/Cookies/Cookies";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ViewTasks() {
  const [value, setValue] = useState(0);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([])


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setUser(getCookieStorage("user"));
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      if (!user?.uid) return;
      const snapshot = await getDocs(collection(db, "tasks"));
      const localTasks = [];
      for (const doc of snapshot.docs) {
        const result = await doc.data();
        localTasks.push({...result,id:doc.id})
      }
      setTasks([...localTasks]);
    };
    getTasks();
    return () => setTasks([]);
  }, [user]);


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} sx={{mt:-4}}>
          <Tab label="My Tasks" {...a11yProps(0)} />
          <Tab label="Tasks I Assigned" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <MyTasks tasks={tasks}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TasksIAssigned tasks={tasks}/>
      </TabPanel>
    </Box>
  );
}
