import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, assignAdminRole, updateAdminStatus } from "../../actions/authActions";
import { Switch, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AssignAdminRole = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  const handleAssignAdminRole = (userId, isAdmin) => {
    dispatch(assignAdminRole(userId, isAdmin, token));
    dispatch(updateAdminStatus(userId, isAdmin)); // Dispatch action to update isAdmin state
  };

  return (
    <div className="container">
      <h4>Assign Admin Role</h4>
      <FormControl fullWidth variant="outlined" style={{ marginTop: "10px" }}>
        <InputLabel id="employee-label">Select Employee</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          label="Select Employee"

        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedUser && (
        <div style={{ marginTop: "20px" }}>
          <span>
            {users.find((user) => user._id === selectedUser)?.name} (
            {users.find((user) => user._id === selectedUser)?.email})
          </span>
          <Switch
            checked={users.find((user) => user._id === selectedUser)?.isAdmin || false}
            onChange={(e) =>
              handleAssignAdminRole(selectedUser, e.target.checked)
            }
          />
        </div>
      )}
    </div>
  );
};

export default AssignAdminRole;
