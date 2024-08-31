import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faTable, faCog, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStatus, logout } from "../../actions/authActions";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import UserProfile from "../../pages/confirm_page/con_page";
// import AnalyticsDashboard from "../../pages/admin_analytics/Analytics";
import UserList from "../../pages/user_list/Userlist";
import SearchComponent from "../../pages/attendance_report/Attendance_report";
import AddDesignationForm from "../../components/create_designaton/Create_Designation";
import AssignDesignation from "../../components/assign-designation/Assign_Designation";
import AssignAdminRole from "../../components/Assign_Admin_Role/Assign_Admin_Role";
import "./Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState("dashboard");
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const { admin_name } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchAdminStatus(token));
    }
  }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (content) => {
    setActiveContent(content);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button type="button" className="btn btn-primary" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <DropdownButton title={`Hi, ${admin_name}`} id="dropdown-basic">
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </nav>
      <div className={`wrapper ${isOpen ? "active" : ""}`}>
        <nav id="sidebar" className={isOpen ? "active" : ""}>
          <div className="sidebar-header">
            <img src="https://i.ibb.co/7CGGkcP/zovionix-removebg-preview.png" alt="Logo" />
          </div>
          <ul className="list-unstyled components">
            <li className="menu-item">
              <a href="#" onClick={() => handleMenuClick("dashboard")}>
                <div className="menu-card">
                  <FontAwesomeIcon icon={faHome} />
                  <span>Dashboard</span>
                </div>
              </a>
            </li>
            {isAdmin && (
              <>
                <li className="menu-item">
                  <a href="#" onClick={() => handleMenuClick("analytics")}>
                    <div className="menu-card">
                      <FontAwesomeIcon icon={faChartBar} />
                      <span>Analytics</span>
                    </div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#" onClick={() => handleMenuClick("users")}>
                    <div className="menu-card">
                      <FontAwesomeIcon icon={faTable} />
                      <span>Users</span>
                    </div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#" onClick={() => handleMenuClick("attendance")}>
                    <div className="menu-card">
                      <FontAwesomeIcon icon={faTable} />
                      <span>Attendance</span>
                    </div>
                  </a>
                </li>
                <li className="menu-item">
                  <a href="#" onClick={() => handleMenuClick("settings")}>
                    <div className="menu-card">
                      <FontAwesomeIcon icon={faCog} />
                      <span>Settings</span>
                    </div>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div id="content" className={isOpen ? "active" : ""}>
          <div className="container-content">
            {activeContent === "dashboard" && (
              <div className="scrollable-content">
                <UserProfile />
              </div>
            )}
            {activeContent === "analytics" && (
              <div className="scrollable-content">
                <AnalyticsDashboard />
              </div>
            )}
            {activeContent === "users" && (
              <div className="scrollable-content">
                <UserList />
              </div>
            )}
            {activeContent === "attendance" && (
              <div className="scrollable-content">
                <SearchComponent />
              </div>
            )}
            {activeContent === "settings" && (
              <div className="scrollable-content">

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import React from 'react';
// import { Nav } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isOpen }) => {
//     return (
//         <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//             <Nav className="flex-column">
//                 <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
//                 <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
//                 <Nav.Link as={Link} to="/reports">Reports</Nav.Link>
//                 <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
//             </Nav>
//         </div>
//     );
// };

// export default Sidebar;




