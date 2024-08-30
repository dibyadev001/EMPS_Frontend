import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import "./login.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userlogin);

  useEffect(() => {
    if (user && user.status === 1) {
      localStorage.setItem("login_status", "true");
      navigate(`/dashboard/${user.username}/${user.userid}`);
      localStorage.setItem("userid", user.userid);
      localStorage.setItem("token", user.token);
    } else if (user && user.status === 0) {
      alert("Login Failed. " + (user.message || "An error occurred."));
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { email, password } = formData;

    try {
      await dispatch(login({ email, password }));
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Pane */}
        <div className="col-md-6 left-pane">
          <div className="logo-container">
            <img
              src="https://i.ibb.co/gWGwpvB/zovionix.png"
              alt="Logo"
              className="logo"
            />
          </div>
        </div>
        {/* Right Pane */}
        <div className="col-md-6 right-pane">
          <div className="login-form">
            {/* Center-aligned image */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://i.ibb.co/yprdyY4/zovionix-removebg.png"
                alt=""
                style={{ width: "150px", height: "70px" }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input
                  className="form-control"
                  id="email"
                  label="Email"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  label="Password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
                className="login-button"
                style={{backgroundColor:"black"}}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
