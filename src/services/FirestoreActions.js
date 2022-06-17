import { collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";

export const getUsers = async () => {
  let users = [];
  const snapshot = await getDocs(collection(db, "user-details"));
  snapshot.docs.forEach((doc) => {
    users.push({...doc.data(),"id":doc.id});
  });
  return users;
};

// export const getUserData = async (id) => {
  
// };
export const getUserData = async (id) => {

    const snapshot = await getDocs(collection(db, "user-details"));
    let localUserDetails = {};
      snapshot.docs.forEach((doc) => {
        if (id === doc.id) {
          localUserDetails = { ...doc.data(), id: doc.id };
        }
      });
    return localUserDetails;
  };

  export const getUserName = async (id) => {
    const snapshot = await getDocs(collection(db, "user-details"));
    let localItem = "";
    snapshot.docs.forEach((doc) => {
      if (id === doc.id) {
        localItem = doc.data().displayName;
      }
    });
    return localItem;
  };