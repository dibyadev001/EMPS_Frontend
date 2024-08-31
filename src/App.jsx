import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import UserProfile from "./pages/confirm_page/con_page";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Idcard_gen from "./components/idcard_gen/idcard_gen";
import QRScanner from "./components/idcard_scan/idcard_scan";
import RegisterPage_Admin from "./pages/Admin_Register/Admin_Reg";
import { fetchAdminStatus } from "./actions/authActions";
import "./App.css";
import Dashboard2 from "./components/Side_Bar/sidebar";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import CheckInOut from "./components/CheckInCheckOut/CheckInOut";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminStatus(token));
    if (isAdmin === false) {
      setShowAccessDenied(true);
    } else {
      setShowAccessDenied(false);
    }
  }, [dispatch, isAdmin, token]);

  const handleModalClose = () => {
    setShowAccessDenied(false);
    navigate("/user_profile");
  };

  return showAccessDenied ? (
    <Modal show={showAccessDenied} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Access Denied</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You don't have permission to access this page.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  ) : (
    <Element {...rest} />
  );
};

function App() {
  const currentPath = window.location.pathname;

  // Determine whether to show the navbar based on the current route
  const showNavbar = !currentPath.startsWith("/login");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/admin" element={<RegisterPage_Admin />} />
        <Route path="/user_profile" element={<UserProfile />} />
        <Route path="/id_verify" element={<QRScanner />} />
        <Route
          path="/dashboard/:admin_name"
          element={<ProtectedRoute element={Dashboard2} />}
        />

        <Route
          path="/dashboard/id-card-gen/:employeeID/:name/:dob/:bloodGroup/:email/:designation"
          element={<ProtectedRoute element={Idcard_gen} />}
        />
        <Route
          path="/checkinout"
          element={<CheckInOut />}
        />
      </Routes>
    </Router>
  );
}

export default App;
