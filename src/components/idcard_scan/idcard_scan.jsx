import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyQRCode } from "../../actions/authActions";
import successSound from "./audio/success.mp3";
import errorSound from "./audio/error.mp3";
import QrScanner from "react-qr-scanner";
import './idcard_scan.css';

const QRScanner = () => {
  const dispatch = useDispatch();
  const [result, setResult] = useState("");
  const [match, setMatch] = useState(null);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);
  const [verificationInProgress, setVerificationInProgress] = useState(false); // Flag to indicate whether verification is in progress
  const loading = useSelector((state) => state.auth.loading);
  const verificationData = useSelector((state) => state.auth.verificationData);
  const scannerRef = useRef(null); // Reference to the QR scanner component

  const handleError = (err) => {
    console.error("Error while scanning:", err);
    setError(err.message || "An error occurred");
  };

  const handleScan = useCallback(async (result) => {
    if (result && !verificationInProgress) { // Check if verification is not in progress
      setResult(result);
      setVerificationInProgress(true); // Set verification in progress
      try {
        const { text } = result; // Assuming text is the correct property, verify it with console.log(result) first
        const location = await getCurrentLocation(); // Fetch current location
        await dispatch(verifyQRCode(text,location)); // Dispatch action to verify QR code along with location
      } catch (err) {
        handleError(err);
      } finally {
        // Reset result after scan is completed
        setResult("");
        // Restart the scanner
        scannerRef.current.restart();
      }
    }
  }, [dispatch, verificationInProgress]);

  useEffect(() => {
    if (verificationData) {
      setMatch(verificationData.user);
      setMsg(verificationData.message);
      setVerificationInProgress(false); // Reset verification in progress flag
  
      // Check API status and play appropriate sound
      if (verificationData.status === 1) {
        const audio = new Audio(successSound);
        audio.play();
      } else {
        const audio = new Audio(errorSound);
        audio.play();
      }
  
      // Reset scanner after 5 seconds
      setTimeout(() => {
        setResult(""); // Clear the result
        scannerRef.current.restart(); // Restart the scanner
      }, 5000);
    }
  }, [verificationData]);
  

  function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            // Using OpenStreetMap Nominatim API
            const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

            fetch(nominatimUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error('Failed to fetch place name');
                }
                return response.json();
              })
              .then(data => {
                if (data.display_name) {
                  const placeName = data.display_name;
                  resolve(placeName);
                } else {
                  reject(new Error('Failed to fetch place name'));
                }
              })
              .catch(error => {
                reject(error);
              });
          },
          error => {
            reject(error);
          }
        );
      }
    });
  }
  
  return (
    <div className="qr-scanner-container">
      <QrScanner
        ref={scannerRef} // Attach ref to the QR scanner component
        className="qr-scanner"
        onScan={handleScan}
        onError={handleError}
        delay={300} // Set delay to 300 ms to avoid continuous scanning
        facingMode={"environment"} // Use rear camera
        legacyMode={false} // Use modern scanning mode
        resolution={800} // Set resolution to 800 for better scanning
        showViewFinder={true} // Show the view finder
        constraints={{ video: { facingMode: "environment" } }} // Use rear camera
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {match && (
        <div className="match-details">
          <p dangerouslySetInnerHTML={{ __html: msg }} />
          <table className="styled-table">
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{match.name}</td>
              </tr>
              <tr>
                <td>Date of Birth:</td>
                <td>{match.dob}</td>
              </tr>
              <tr>
                <td>Blood Group:</td>
                <td>{match.bloodGroup}</td>
              </tr>
              <tr>
                <td>ID:</td>
                <td>{match.employeeID}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
