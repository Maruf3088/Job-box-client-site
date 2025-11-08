import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init"; // ✅ from your config
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

const signInWithGoogle =()=>{
    return signInWithPopup(auth,googleProvider);
}

const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };




  const logOut = () => signOut(auth);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log(currentUser);
    });

    return () => unSubscribe();
  }, [user]);

  const AuthInfo = {
    creatUser,
    user,
    signIn,
    logOut,
    loading,
    signInWithGoogle,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
