import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Container } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import UserProfile from "./pages/confirm_page/con_page";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Idcard_gen from "./components/idcard_gen/idcard_gen";
import QRScanner from "./components/idcard_scan/idcard_scan";
import RegisterPage_Admin from "./pages/Admin_Register/Admin_Reg";
import "./App.css";
import Dashboard2 from "./components/Side_Bar/sidebar";
import CheckInOut from "./components/CheckInCheckOut/CheckInOut";
import ProfilePicUpload from "./pages/AvatarUpload/ProfilePicUpload";
import Sidebar from "./components/Side_Bar/sidebar";
import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    if (!token) {
      setShowAccessDenied(true);
    } else {
      setShowAccessDenied(false);
    }
  }, [token]);

  const handleModalClose = () => {
    setShowAccessDenied(false);
    navigate("/login");
  };



  return showAccessDenied ? (
    <Modal show={showAccessDenied} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Access Denied</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please Login To Access the Portal</p>
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
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
      <Router>
          <div className="app">
              <Header />
              <div className="main-content">
                  <Sidebar isOpen={isSidebarOpen} />
                  <div className={`content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                      <Button onClick={toggleSidebar} className="toggle-btn">
                          {isSidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
                      </Button>
                      <Container fluid>
                          <Routes>
                              <Route path="/dashboard" component={Dashboard} />
                              
                              <Route path="/" component={Dashboard} />
                          </Routes>
                      </Container>
                  </div>
              </div>
              {/* <Footer /> */}
          </div>
      </Router>
  );
}

export default App;
