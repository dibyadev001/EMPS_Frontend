import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDesignation } from "../../actions/authActions";
import "./AddDesig.css"; // Import CSS file for styling

const AddDesignationForm = () => {
  const dispatch = useDispatch();
  const [designationName, setDesignationName] = useState("");
  const token = localStorage.getItem("token");


  const handleAddDesignation = () => {
    if (!designationName) return;
    dispatch(createDesignation(designationName, token));
    setDesignationName(""); // Clear the input field after submission
  };

  return (
    <div className="container">
      <h4 style={{ marginBottom: "20px" }}>Add New Designation</h4>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Designation Name"
          value={designationName}
          onChange={(e) => setDesignationName(e.target.value)}
        />
        <button className="search-button" onClick={handleAddDesignation}>
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default AddDesignationForm;
