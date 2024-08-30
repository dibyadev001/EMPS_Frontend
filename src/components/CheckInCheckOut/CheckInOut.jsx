import { useState, useEffect, useRef } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { BaseUrl } from "../BaseUrl";
import styles from './CheckInOut.module.css'; // Import the CSS module

const CheckInOut = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [timer, setTimer] = useState("00:00:00");
  const [timerStore, setTimerStore] = useState("00:00:00");
  const [location, setLocation] = useState("");

  const timerRef = useRef(null);
  const elapsedTimeRef = useRef(0);

  useEffect(() => {
    const fetchCheckStatus = async () => {
      try {
        const response = await fetch(`${BaseUrl}checkstatus/${userId}`);
        const data = await response.json();
        setIsCheckedIn(data.isCheckedIn);
        if (data.isCheckedIn) {
          fetchElapsedTime();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCheckStatus();
  }, [userId]);

  const fetchElapsedTime = async () => {
    try {
      const response = await fetch(`${BaseUrl}elapsedtime/${userId}`);
      const data = await response.json();
      setTimer(data.elapsedTime);
      const [hours, minutes, seconds] = data.elapsedTime.split(":").map(Number);
      elapsedTimeRef.current = (hours * 3600 + minutes * 60 + seconds) * 1000;
      startTimer();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const startTimer = () => {
    const startTime = Date.now() - elapsedTimeRef.current;

    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const hours = Math.floor(elapsedTime / 3600000)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((elapsedTime % 3600000) / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((elapsedTime % 60000) / 1000)
        .toString()
        .padStart(2, "0");
      setTimerStore(`${hours}:${minutes}:${seconds}`);
      setTimer(`${hours}:${minutes}:${seconds}`);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setTimer("00:00:00");
    elapsedTimeRef.current = 0;
  };

  const fetchLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const nominatimResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
              const nominatimData = await nominatimResponse.json();
              resolve({
                latitude,
                longitude,
                address: nominatimData.display_name,
              });
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const handleAttendance = async () => {
    try {
      const { latitude, longitude, address } = await fetchLocation();
      const locationString = `${latitude}, ${longitude} (${address})`;
      setLocation(locationString);

      if (!isCheckedIn) {
        const response = await fetch(`${BaseUrl}checkin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            check_in_location: locationString,
          }),
        });
        const data = await response.json();
        setMessage(data.message);
        if (data.status === 1) {
          setIsCheckedIn(true);
          startTimer();
        }
      } else {
        const response = await fetch(`${BaseUrl}checkout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            check_out_location: locationString,
            workHours: timerStore,
          }),
        });
        const data = await response.json();
        setMessage(data.message);
        if (data.status === 1) {
          setIsCheckedIn(false);
          stopTimer();
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Operation failed. Please try again.");
    }
  };

  return (
    <div className={`${styles.card} ${isCheckedIn ? styles.cardCheckedIn : styles.cardCheckedOut}`}>
      <Card.Body className={styles.cardBody}>
        <Button
          className={isCheckedIn ? `${styles.btnDanger} btn-sm me-2` : `${styles.btnPrimary} btn-sm me-2`}
          onClick={handleAttendance}
        >
          {isCheckedIn ? "Check Out" : "Check In"}
        </Button>
        {isCheckedIn && (
          <Button pill className={isCheckedIn ? `${styles.btnDanger} btn-sm me-2` : `${styles.btnPrimary} btn-sm me-2`}>
            {timer}
          </Button>
        )}
        {message && <div className={`${styles.mt3} ${styles.textDanger}`}>{message}</div>}
      </Card.Body>
    </div>
  );
};

export default CheckInOut;
