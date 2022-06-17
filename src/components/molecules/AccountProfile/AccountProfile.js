import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Box } from "@mui/material";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, storage } from "../../../services/FirebaseConfig";
import {
  getCookieStorage,
  setCookieStorage
} from "../../../utils/Cookies/Cookies";
import "./AccountProfileStyle.css"

const AccountProfile = () => {
  const user = getCookieStorage("user");
  const [photoURL, setPhotoURL] = useState(user.photoURL);


  useEffect(() => {
    setPhotoURL(user.photoURL);
  }, [user.photoURL]);

  const uploadImage = async (event) => {
    const imageUpload = event.target.files[0];
    if (imageUpload === null) return;

    const fileRef = ref(storage, "profilePictures/" + user.uid + ".png");
    await uploadBytes(fileRef, imageUpload);
    const localPhotoURL = await getDownloadURL(fileRef);
    setPhotoURL(localPhotoURL);
    updateProfile(auth.currentUser, {
      photoURL: localPhotoURL,
    })
      .then(() => {
        setCookieStorage("user", user);
        return alert("updated profile");
      })
      .catch(() => {});
  };

  return (
    <Box className="container">
      <Avatar
        src={photoURL}
        sx={{ height: "100px", width: "100px" }}
      ></Avatar>
        <label htmlFor="selectProfilePicture" className="selectProfilePicture">
          <input
            type="file"
            id="selectProfilePicture"
            onChange={uploadImage}
            hidden
          />
          <PhotoCameraIcon fontSize="large" color="primary" />
        </label>
    </Box>
  );
};

export default AccountProfile;
