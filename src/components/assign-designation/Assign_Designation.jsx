// AssignDesignation.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, assignDesignationToUser, fetchDesignations } from "../../actions/authActions";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
const AssignDesignation = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.auth);
  const { designations } = useSelector((state) => state.auth); // Fetch designations from the Redux store
  const token = localStorage.getItem("token");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const handleChangeEmployee = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const handleChangeDesignation = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const handleAssignDesignation = () => {
    dispatch(assignDesignationToUser(selectedEmployee, selectedDesignation, token));
  };

  useEffect(() => {
    dispatch(fetchUsers(token));
    dispatch(fetchDesignations(token));
  }, [dispatch, token]);

  return (
    <div className="container" style={{ paddingBottom: "55px" }}>
      <h4>Assign Designation to Employee</h4>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "10px" }}>
        <InputLabel id="employee-label">Select Employee</InputLabel>
        <Select
          labelId="employee-label"
          id="employee-select"
          value={selectedEmployee}
          onChange={handleChangeEmployee}
          label="Select Employee"
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "20px" }}>
        <InputLabel id="designation-label">Select Designation</InputLabel>
        <Select
          labelId="designation-label"
          id="designation-select"
          value={selectedDesignation}
          onChange={handleChangeDesignation}
          label="Select Designation"
        >
          {designations.map((designation) => (
            <MenuItem key={designation._id} value={designation._id}>
              {designation.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAssignDesignation}
        style={{ marginTop: "20px" }}
        fullWidth
      >
        Assign Designation
      </Button>
    
    </div>
  );
};

export default AssignDesignation;
