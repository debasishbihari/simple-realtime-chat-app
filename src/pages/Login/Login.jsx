import { useState } from "react";
import assets from "../../assets/assets";
import { login, resetPass, signup } from "../../config/firebase";
import "./Login.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(currentState === "Sign Up") {
      signup(userName,email,password);
    }
    else{
      login(email,password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign Up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="username"
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currentState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrentState("Sign Up")}>click here</span>
            </p>
          )}
          {currentState === "Login" ? <p className="login-toggle">
              Forgot password{" "}
              <span onClick={() => resetPass(email)}>reset here</span>
            </p>:null}
        </div>
      </form>
    </div>
  );
};

export default Login;
