import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  assignTaskToEmployee,
  deleteUser,
} from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaIdCard } from "react-icons/fa";
import { Form, Table, Button } from "react-bootstrap";
import "./userlist.css";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const [taskNames, setTaskNames] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssignTask = (userId) => {
    dispatch(assignTaskToEmployee(userId, taskNames[userId], token));
    setTaskNames({ ...taskNames, [userId]: "" });
  };

  const handleAddEmployee=()=>
    {
      navigate("/register/admin")
    }

  const handleTaskNameChange = (userId, value) => {
    setTaskNames({ ...taskNames, [userId]: value });
  };

  const handleGenerateIDCard = (
    name,
    dob,
    employeeID,
    bloodGroup,
    email,
    designation
  ) => {
    alert(`Generating ID card for user with ID: ${employeeID}, ${name}, ${dob}`);
    navigate(
      `/dashboard/id-card-gen/${employeeID}/${name}/${dob}/${bloodGroup}/${email}/${designation}`
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId, token));
    }
  };

  return (
    <div className="container-userlist table-responsive">
      <Form className="search-bar-x">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search for an employee"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">Error: {error}</p>}
      <Button className="text-left" variant="success" onClick={handleAddEmployee}>
          Add Employee
        </Button>
      <Table striped bordered hover responsive className="user-list mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>ID Card</th>
            <th>Delete</th>
            <th>Task Name</th>
            <th>Assign Task</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="text-center">
                <img
                  src={`data:image/jpeg;base64,${user.avatar}`}
                  alt="Avatar"
                  className="avatar img-thumbnail"
                />
              </td>
              <td>{user.name}</td>
              <td className="email-cell">{user.email}</td>
              <td>{user.designation}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleGenerateIDCard(
                      user.name,
                      user.dob,
                      user.employeeID,
                      user.bloodGroup,
                      user.email,
                      user.designation
                    )
                  }
                >
                  <FaIdCard />
                </Button>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  <FaTrash />
                </Button>
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter task name"
                  value={taskNames[user._id] || ""}
                  onChange={(e) => handleTaskNameChange(user._id, e.target.value)}
                />
              </td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleAssignTask(user._id)}
                >
                  Assign Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
