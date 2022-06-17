import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SET_USER,
} from "./actionTypes";
import { auth, db } from "../../services/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {removeCookieStorage, setCookieStorage} from "../../utils/Cookies/Cookies.jsx";

const register = () => ({
  type: REGISTER,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerStart = (email, password, displayName) => {
  return (dispatch) => {
    dispatch(register());
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(auth.currentUser, {
          displayName: displayName,
        })
          .then(() => {
            // localStorage.setItem("user", JSON.stringify(user));
            setCookieStorage('user',user)
          })
          .catch((error) => {
            console.log("Registration error from Firebase : ", error);
          });

        setDoc(doc(db, "user-details", user.uid), {
          displayName: displayName,
          email: email,
        });
        dispatch(registerSuccess(user));
      })
      .catch((error) => dispatch(registerFailure(error.message)));
  };
};

// LOGIN
const login = () => ({
  type: LOGIN,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginStart = (email, password) => {
  console.log("email,password : ", email, password);
  return async (dispatch) => {
    dispatch(login());

    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setCookieStorage("user",user);
      dispatch(loginSuccess(user));
    })
    .catch((error) => dispatch(loginFailure(error.message)));
  };
};

// SET_USER
export const setuser = (user) => ({
  type: SET_USER,
  payload: user,
});

// LOGOUT
const logout = () => ({
  type: LOGOUT,
});

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
  payload: null,
});

const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const logoutStart = () => {
  return (dispatch) => {
    dispatch(logout());
    signOut(auth)
      .then(() => {
        removeCookieStorage("user")
        // localStorage.setItem("user", null);
        dispatch(logoutSuccess());
      })
      .catch((error) => dispatch(logoutFailure(error.message)));
  };
};