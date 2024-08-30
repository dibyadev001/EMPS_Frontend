import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import { fetchAvatar } from "../../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
// import QRScanner from './test';
// import Panel from './Panel';
import "./idcard.css";
const Idcard_gen = () => {
  const { employeeID, name, bloodGroup, email, designation } = useParams();
  const token = localStorage.getItem("token");
  const avatar = useSelector((state) => state.auth.avatar);
  console.log(avatar);
  const dispatch = useDispatch();
  const [headerColor, setHeaderColor] = useState("#3498db"); // Default header color

  const handleGenerateCard = () => {
    const cardContainer = document.getElementById("id-card");
    const scale = 1.8; // Increase scale for higher resolution

    html2canvas(cardContainer, {
      backgroundColor: null,
      scale: scale, // Apply scale
      logging: true, // Enable logging for debugging
      allowTaint: true, // Allow taint to support CORS images
    }).then(async (canvas) => {
      // Access the canvas element and set willReadFrequently attribute
      const canvasElement = canvas.querySelector("canvas");
      if (canvasElement) {
        canvasElement.willReadFrequently = true;
      }
      // Convert canvas to data URL with higher quality
      const dataUrl = canvas.toDataURL("image/png", 1.0); // Adjust compression quality
      try {
        const response = await fetch("http://localhost:3000/api/send-id-card", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass JWT token for authentication
          },
          body: JSON.stringify({
            email: email, // Replace with recipient's email address
            attachment: dataUrl, // Attach the ID card image as base64 string
          }),
        });

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${name}-${employeeID}.png`;
      a.click();
    });
  };

  useEffect(() => {
    // Access the canvas element and set willReadFrequently attribute
    dispatch(fetchAvatar(employeeID, token));

    const cardContainer = document.getElementById("id-card");
    const canvasElement = cardContainer?.querySelector("canvas");
    if (canvasElement) {
      canvasElement.willReadFrequently = true;
    }
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="containerx">
      <div className="gutter-container">
        <div id="id-card-container" className="id-card-container">
          {/* <div id="id-card" className="id-card">
            <div className="header" style={{ backgroundColor: headerColor }}>
              Dibyajyoti InfoTech
            </div>

            <div className="info">
              <div className="photo-container">
                <img
                  src={`data:image/jpeg;base64,${avatar}`}
                  alt="User"
                  className="photo"
                />
              </div>
              <div
                className="field"
                style={{
                  margintop: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {name}
              </div>
              <div
                className="field"
                style={{ fontSize: "15px", marginBottom: "2px" }}
              >
                {designation}
              </div>
              <div
                className="field"
                style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}
              >
                {bloodGroup}
              </div>

              <div className="field qr-code">
                <QRCode value={employeeID} />
              </div>
            </div>
          </div> */}

          <div id="id-card" className="id-card">
          <div class="header-id" style={{ backgroundColor: headerColor }}>
            ZOVIONIX
        </div>
            <div>
              <img src={`data:image/jpeg;base64,${avatar}`}
                alt="User" className="profile" />
              <h2>{name}</h2>
              <p>{employeeID}</p>
              <p>{designation}</p>
              <div class="details">
                <p>Email: john.doe@example.com</p>
                <p>Phone: (123) 456-7890</p>
              </div>
            </div>
            <div class="qr-code">
              <QRCode value={employeeID} className="qr" />
            </div>
          </div>
        </div>
      </div>

      <div className="gutter-container">
        <div className="form">
          <label>
            Name:
            <input type="text" value={name} readOnly />
          </label>
          <label>
            Blood Group:
            {/* Dropdown for blood groups */}
            <input value={bloodGroup} readOnly></input>
          </label>
          <label>
            Header Color:
            <select
              value={headerColor}
              onChange={(e) => setHeaderColor(e.target.value)}
            >
              <option value="rgba(255, 255, 255, 0.2)">Regular</option>
              <option value="#3498db">Blue</option>
              <option value="#2ecc71">Green</option>
              <option value="#e74c3c">Red</option>
              <option value="#f39c12">Orange</option>
              {/* Add more options as needed */}
            </select>
          </label>
          <button
            style={{ marginTop: "10px", padding: "10px" }}
            onClick={handleGenerateCard}
          >
            Generate ID Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Idcard_gen;
