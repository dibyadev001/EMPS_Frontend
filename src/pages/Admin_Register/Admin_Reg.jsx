// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { register_admin, sendOTP } from "../../actions/authActions";
// import { useNavigate } from "react-router-dom";
// import {
//   Button,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";
// import "./admin_reg.css";

// function RegisterPage_Admin() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const admin = useSelector((state) => state.auth.adminregister);
//   const { otp } = useSelector((state) => state.auth);

//   const [otpModalOpen, setOtpModalOpen] = useState(false);
//   const [otpError, setOtpError] = useState("");
//   const [otpcheck, setOtpcheck] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     bloodGroup: "",
//     dob: "",
//   });

//   const bloodGroups = [
//     { value: "A+", label: "A+" },
//     { value: "A-", label: "A-" },
//     { value: "B+", label: "B+" },
//     { value: "B-", label: "B-" },
//     { value: "O+", label: "O+" },
//     { value: "O-", label: "O-" },
//     { value: "AB+", label: "AB+" },
//     { value: "AB-", label: "AB-" },
//   ];

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleRegister = async () => {
//     dispatch(sendOTP(formData.email));
//     setOtpModalOpen(true);
//   };

//   const handleOtpVerify = () => {
//     if (otpcheck == otp) {
//       const formDataToSend = {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//         dob: formData.dob,
//         bloodGroup: formData.bloodGroup,
//       };
//       setOtpModalOpen(false);
//       dispatch(register_admin(formDataToSend));
//     } else {
//       setOtpError("Invalid OTP. Please try again.");
//     }
//   };

//   useEffect(() => {
//     if (admin && admin.status === 1) {
//       navigate(`/profilepic/${admin.userId}`)
//     } else if (admin && admin.status === 0) {
//       navigate("/register/admin")
//     }
//   }, [admin, navigate]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     handleRegister();
//   };

//   return (
//     <div className="register-container">
//       <Form className="reg-form-admin" onSubmit={handleSubmit}>
//         <h3 className="form-title">Admin Register</h3>
//         <FormGroup>
//           <Label for="name">Name</Label>
//           <Input
//             type="text"
//             name="name"
//             id="name"
//             placeholder="Enter your name"
//             required
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="email">Email</Label>
//           <Input
//             type="email"
//             name="email"
//             id="email"
//             placeholder="Enter your email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="dob">Date of Birth</Label>
//           <Input
//             type="date"
//             name="dob"
//             id="dob"
//             required
//             value={formData.dob}
//             onChange={handleChange}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="bloodGroup">Blood Group</Label>
//           <Input
//             type="select"
//             name="bloodGroup"
//             id="bloodGroup"
//             required
//             value={formData.bloodGroup}
//             onChange={handleChange}
//           >
//             <option value="">Select Blood Group</option>
//             {bloodGroups.map((group, index) => (
//               <option key={index} value={group.value}>
//                 {group.label}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label for="password">Password</Label>
//           <Input
//             type="password"
//             name="password"
//             id="password"
//             placeholder="Enter your password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </FormGroup>
//         <Button type="submit" color="primary" block>
//           Register
//         </Button>
//       </Form>

//       <Modal isOpen={otpModalOpen} toggle={() => setOtpModalOpen(!otpModalOpen)}>
//         <ModalHeader toggle={() => setOtpModalOpen(!otpModalOpen)}>Enter OTP</ModalHeader>
//         <ModalBody>
//           <FormGroup>
//             <Label for="otp">OTP</Label>
//             <Input
//               type="text"
//               name="otp"
//               id="otp"
//               placeholder="Enter OTP"
//               value={otpcheck}
//               onChange={(e) => setOtpcheck(e.target.value)}
//             />
//             {otpError && <p className="error2">{otpError}</p>}
//           </FormGroup>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onClick={handleOtpVerify}>
//             Verify OTP
//           </Button>
//           <Button color="secondary" onClick={() => setOtpModalOpen(false)}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// }

// export default RegisterPage_Admin;



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register_admin, sendOTP } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./admin_reg.css";

function RegisterPage_Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.auth.adminregister);
  const { otp } = useSelector((state) => state.auth);

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpcheck, setOtpcheck] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "",
    dob: "",
  });

  const bloodGroups = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    dispatch(sendOTP(formData.email));
    setOtpModalOpen(true);
  };

  const handleOtpVerify = () => {
    if (otpcheck == otp) {
      const formDataToSend = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
      };
      setOtpModalOpen(false);
      dispatch(register_admin(formDataToSend));
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (admin && admin.status === 1) {
      navigate(`/profilepic/${admin.userId}`)
    } else if (admin && admin.status === 0) {
      navigate("/register/admin")
    }
  }, [admin, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleRegister();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Left Pane */}
        <div className="col-md-6 left-pane">
          <div className="logo-container">
            <img
              src="https://i.ibb.co/gWGwpvB/zovionix.png"
              alt="Logo"
              className="logo"
            />
          </div>
        </div>
        {/* Right Pane */}
        <div className="col-md-6 right-pane">
          <div className="login-form">
            {/* Center-aligned image */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src="https://i.ibb.co/yprdyY4/zovionix-removebg.png"
                alt=""
                style={{ width: "150px", height: "70px" }}
              />
            </div>
            <Form className="reg-form-admin" onSubmit={handleSubmit}>
              <h3 className="mt-2 text-center">Admin Register</h3>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="dob">Date of Birth</Label>
                <Input
                  type="date"
                  name="dob"
                  id="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="bloodGroup">Blood Group</Label>
                <Input
                  type="select"
                  name="bloodGroup"
                  id="bloodGroup"
                  required
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((group, index) => (
                    <option key={index} value={group.value}>
                      {group.label}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormGroup>
              <Button type="submit" color="primary" block>
                Submit & Next
              </Button>
            </Form>

            <Modal isOpen={otpModalOpen} toggle={() => setOtpModalOpen(!otpModalOpen)}>
              <ModalHeader toggle={() => setOtpModalOpen(!otpModalOpen)}>Enter OTP</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="otp">OTP</Label>
                  <Input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otpcheck}
                    onChange={(e) => setOtpcheck(e.target.value)}
                  />
                  {otpError && <p className="error2">{otpError}</p>}
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleOtpVerify}>
                  Verify OTP
                </Button>
                <Button color="secondary" onClick={() => setOtpModalOpen(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RegisterPage_Admin;
