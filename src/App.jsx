import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./config/firebase";
import { AppContext } from "./context/AppContext";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";

const App = () => {
  const navigate = useNavigate();
  const {loadUserData} = useContext(AppContext);
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid)
      } else {
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Routes>
    </>
  );
};

export default App;
