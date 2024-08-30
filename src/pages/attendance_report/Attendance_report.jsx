import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestions, fetchAttendanceReport } from "../../actions/authActions";
import { TextField, List, ListItem, ListItemText, Typography, Card, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.auth.suggestions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const attendanceReport = useSelector((state) => state.auth.attendanceReport);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    if (value.trim() !== "") {
      dispatch(fetchSuggestions(value, token));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmployeeClick = (employeeID) => {
    dispatch(fetchAttendanceReport(employeeID, token));
    setShowSuggestions(false);
  };

  const renderCheckInOutSessions = () => {
    const { checkInOutSessions } = attendanceReport;

    if (!checkInOutSessions) return null;

    return Object.keys(checkInOutSessions).map((monthKey) => (
      <div key={monthKey}>
        <Typography variant="h6" style={{ padding: "20px" }}>
          {monthKey}
        </Typography>
        {Object.keys(checkInOutSessions[monthKey]).map((date) => {
          const { sessions, totalWorkHours } = checkInOutSessions[monthKey][date];
          return (
            <div key={date}>
              <Typography variant="body1" style={{ padding: "0 20px" }}>
                {date}: Total Work Hours - {totalWorkHours}
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Check In Date</TableCell>
                      <TableCell>Check In Time</TableCell>
                      <TableCell>Check In Location</TableCell>
                      <TableCell>Check Out Date</TableCell>

                      <TableCell>Check Out Time</TableCell>
                      <TableCell>Check Out Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sessions.map((session, index) => (
                      <TableRow key={index}>
                        <TableCell>{session.check_in_date}</TableCell>
                        <TableCell>{session.check_in_time}</TableCell>
                        <TableCell style={{ whiteSpace: "pre-wrap" }}>{session.check_in_location}</TableCell>
                        <TableCell>{session.check_out_date}</TableCell>
                        <TableCell>{session.check_out_time}</TableCell>
                        <TableCell style={{ whiteSpace: "pre-wrap" }}>{session.check_out_location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div ref={searchRef} style={{ padding: "20px" }}>
      <TextField
        label="Search for an employee..."
        variant="outlined"
        value={searchTerm}
        onChange={handleInputChange}
        fullWidth
        style={{ marginBottom: "20px" }}
      />
      {showSuggestions && suggestions.length > 0 && (
        <List component="nav">
          {suggestions.map((employee) => (
            <ListItem
              key={employee.employeeID}
              button
              onClick={() => handleEmployeeClick(employee.employeeID)}
            >
              <ListItemText primary={`${employee.name} - ${employee.email}`} />
            </ListItem>
          ))}
        </List>
      )}
      {attendanceReport && (
        <Card>
          <Typography variant="h6" style={{ padding: "20px" }}>
            Employee Details
          </Typography>
          <Typography variant="body1" style={{ padding: "0 20px" }}>
            Name: {attendanceReport.name}
          </Typography>
          <Typography variant="body1" style={{ padding: "0 20px" }}>
            Email: {attendanceReport.email}
          </Typography>
          <Typography variant="body1" style={{ padding: "0 20px" }}>
            Date of Birth: {attendanceReport.dob}
          </Typography>
          <Typography variant="body1" style={{ padding: "0 20px" }}>
            Blood Group: {attendanceReport.bloodGroup}
          </Typography>
          <Typography variant="h6" style={{ padding: "20px" }}>
            Check In/Out Sessions
          </Typography>
          {renderCheckInOutSessions()}
        </Card>
      )}
    </div>
  );
};

export default SearchComponent;
