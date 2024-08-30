import React, { useState, useEffect } from 'react';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button, Input, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DoneIcon from '@mui/icons-material/Done';
import { Grid } from '@mui/material';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.userregister);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        bloodGroup: '',
        dob: '',
    });
    const [errors, setErrors] = useState({});
    const bloodGroups = [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' }
    ];
    const [uploadedFileName, setUploadedFileName] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (user) {
            if (user.status === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'You have successfully registered!',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                });
            } else if (user.status === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: user.message || 'An error occurred while registering. Please try again later.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim() || !emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password.trim() || formData.password.trim().length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.dob) {
            newErrors.dob = "Date of Birth is required";
        }

        if (!formData.bloodGroup) {
            newErrors.bloodGroup = "Blood Group is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('dob', formData.dob);
        formDataToSend.append('bloodGroup', formData.bloodGroup);
        formDataToSend.append('avatar', formData.avatar);

        dispatch(register(formDataToSend));
    };

    const handleImageUpload = (event) => {
        const imageFile = event.target.files[0];
        setFormData({ ...formData, avatar: imageFile });
        setUploadedFileName(imageFile.name);
    };

    return (
        <div className="registration-container">
            <div className="registration-form">
                <h2 className="registration-heading">Employee Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <TextField
                            label="Name"
                            variant="outlined"
                            className={`form-control ${errors.name && 'is-invalid'}`}
                            required
                            placeholder="Enter your name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <div className="input-error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            className={`form-control ${errors.email && 'is-invalid'}`}
                            required
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="input-error">{errors.email}</div>}
                    </div>
                    <div className="form-group inline">
                        <TextField
                            label="Date of Birth"
                            variant="outlined"
                            type="date"
                            className="form-control"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }} // This line sets the shrink property to true
                        />
                        <FormControl variant="outlined" className="form-control">
                            <InputLabel id="bloodGroup-label">Blood Group</InputLabel>
                            <Select
                                labelId="bloodGroup-label"
                                id="bloodGroup"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleChange}
                                label="Blood Group"
                            >
                                <MenuItem value="">Select Blood Group</MenuItem>
                                {bloodGroups.map((group, index) => (
                                    <MenuItem key={index} value={group.value}>{group.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            className={`form-control ${errors.password && 'is-invalid'}`}
                            required
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <div className="input-error">{errors.password}</div>}
                    </div>
                    <div className="form-group">
                        <InputLabel htmlFor="avatar">Profile Image</InputLabel>
                        <div className="upload-icon">
                            <Input
                                type="file"
                                id="avatar"
                                name="avatar"
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="avatar" className="upload-btn">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                </Button>
                                {uploadedFileName && <DoneIcon style={{ color: 'green', marginLeft: '8px' }} />}
                                <span className="file-name">
                                    {uploadedFileName.length > 20 ? (
                                        <>
                                            {uploadedFileName.substring(0, 10)}
                                            ...
                                            {uploadedFileName.substring(uploadedFileName.length - 10)}
                                        </>
                                    ) : (
                                        uploadedFileName
                                    )}
                                </span>
                            </label>
                        </div>
                    </div>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
