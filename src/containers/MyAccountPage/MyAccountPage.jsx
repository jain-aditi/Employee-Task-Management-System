import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AccountProfile from "../../components/molecules/AccountProfile/AccountProfile";
import ChangePasswordModal from "../../components/molecules/ChangePassword/ChangePasswordModal";
import EditUserDetailsModal from "../../components/molecules/EditUserDetails/EditUserDetailsModal";
import Modals from "../../components/atoms/Modals/Modals";
import { db } from "../../services/FirebaseConfig";
import { getCookieStorage } from "../../utils/Cookies/Cookies";

const MyAccountPage = () => {
  const [user, setuser] = useState(null);
  const [currentUserDetails, setCurrentUserDetails] = useState({
    displayName: "",
    email: "",
    designation: "",
    Salary: null,
  });

  let rows = [
    {
      name: "Name",
      value: currentUserDetails.displayName,
    },
    {
      name: "Email",
      value: currentUserDetails.email,
    },
    {
      name: "Designation",
      value: currentUserDetails.designation,
    },
    {
      name: "Salary",
      value: currentUserDetails.Salary,
    },
  ];

  useEffect(() => {
    setuser(getCookieStorage("user"));
  }, []);
  
  useEffect(() => {
    const getUserData = async () => {
      const snapshot = await getDocs(collection(db, "user-details"));
      let localUserDetails = {};
      snapshot.docs.forEach((doc) => {
        if (user?.uid && user.uid === doc.id) {
          if (user && user.uid && user.uid === doc.id) {
            localUserDetails = { ...doc.data(), id: doc.id };
          }
        }
      });
      setCurrentUserDetails((u) => localUserDetails);
    };

    getUserData();

    return () => {
      setCurrentUserDetails((u) => ({
        displayName: "",
        email: "",
        designation: "",
        Salary: null,
      }));
    };
  }, [user]);

  return (
    <>
      {user ? (
        <Box>
          <Typography variant="h5">My Account</Typography>
          <AccountProfile user={user} />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, mt: 1 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Modals buttonText="Edit Details">
            <EditUserDetailsModal userDetails={currentUserDetails} />
          </Modals>
          <Modals buttonText="Change Password">
            <ChangePasswordModal />
          </Modals>
        </Box>
      ) : (
        <Box>loading..</Box>
      )}
    </>
  );
};

export default MyAccountPage;
