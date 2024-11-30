import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCjaVFOY8fNGMPdU0GyKiGnEkvOJKXdaTo",
  authDomain: "simple-chat-app-4566a.firebaseapp.com",
  projectId: "simple-chat-app-4566a",
  storageBucket: "simple-chat-app-4566a.appspot.com",
  messagingSenderId: "12116734427",
  appId: "1:12116734427:web:5b792bc3fedb03a721f7fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, I am using chat app",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: [],
    });
  } catch (error) {
    console.error("Error creating user:", error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const resetPass = async (email) => {
  if (!email) {
    toast.error("Please enter your email address");
    return null;
  }
  try {
    const userRef = collection(db, "users");
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDocs(q);
    if (querySnap.empty) {
      toast.error("No user found with this email address");
      return null;
    }
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent successfully");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

export { auth, db, login, logout, resetPass, signup };

