import React, { useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Button, Spinner, Alert, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { BaseUrl } from '../../components/BaseUrl';
import './profilepic.css';
import { useNavigate, useParams } from 'react-router-dom';

const UploadAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);
  const { userid } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setAvatar(imageSrc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file && !avatar) {
      setError('Please choose a file or capture an image.');
      return;
    }
    const formData = new FormData();
    if (avatar) {
      const blob = await fetch(avatar).then((res) => res.blob());
      formData.append('avatar', blob);
    } else {
      formData.append('avatar', file);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BaseUrl}upload-avatar/${userid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAvatar(response.data.avatar);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDevices = (mediaDevices) => {
    setCameraDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
  };

  const handleDeviceChange = (deviceId) => {
    setSelectedDeviceId(deviceId);
  };

  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4">
        <div className='d-flex align-items-center'>
          <input
            type="file"
            accept="image/*"
            className="file-input"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            videoConstraints={{ deviceId: selectedDeviceId }}
            onUserMedia={() => {
              navigator.mediaDevices.enumerateDevices().then(handleDevices);
            }}
            width={300}
          />
        </div>

        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="mt-3">
          <DropdownToggle caret>
            Select Camera
          </DropdownToggle>
          <DropdownMenu>
            {cameraDevices.map((device, index) => (
              <DropdownItem key={device.deviceId} onClick={() => handleDeviceChange(device.deviceId)}>
                {device.label || `Camera ${index + 1}`}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <div className="avatar-container mt-3" onClick={handleUploadButtonClick}>
          {avatar ? (
            <img src={avatar} alt="Avatar" className="avatar-image" />
          ) : (
            <div className="upload-prompt">
              <span>Click to upload</span>
            </div>
          )}
        </div>
        <Button onClick={handleCapture} color="primary" className="mt-3">
          Capture
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading} className="mt-3">
          {loading ? <Spinner size="sm" /> : 'Submit'}
        </Button>
        {error && <Alert color="danger" className="mt-3">{error}</Alert>}
      </Card>
    </div>
  );
};

export default UploadAvatar;
