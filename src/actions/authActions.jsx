// src/actions/authActions.jsx
import axios from "axios";
import { BaseUrl } from "../components/BaseUrl";
// Login action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// Login actions
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userlogin) => ({
  type: LOGIN_SUCCESS,
  payload: userlogin,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (formData) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${BaseUrl}login`, formData);
      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

// Registration action types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

// Registration actions
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = (userregister) => ({
  type: REGISTER_SUCCESS,
  payload: userregister,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (formData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await axios.post(`${BaseUrl}signup/employee`, formData);
      dispatch(registerSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// Registration action types
export const REGISTER_ADMIN_REQUEST = "REGISTER_ADMIN_REQUEST";
export const REGISTER_ADMIN_SUCCESS = "REGISTER_ADMIN_SUCCESS";
export const REGISTER_ADMIN_FAILURE = "REGISTER_ADMIN_FAILURE";

// Registration actions
export const register_admin_Request = () => ({
  type: REGISTER_ADMIN_REQUEST,
});

export const register_admin_Success = (adminregister) => ({
  type: REGISTER_ADMIN_SUCCESS,
  payload: adminregister,
});

export const register_admin_Failure = (error) => ({
  type: REGISTER_ADMIN_FAILURE,
  payload: error,
});

export const register_admin = (formData) => {
  return async (dispatch) => {
    dispatch(register_admin_Request());
    try {
      const response = await axios.post(`${BaseUrl}signup/admin`, formData);
      dispatch(register_admin_Success(response.data));
      console.log(response.data);
    } catch (error) {
      dispatch(register_admin_Failure(error.message));
    }
  };
};

// Fetch users action types
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Fetch users actions
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const fetchUsers = (token) => {
  // Pass token as argument
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await axios.get(`${BaseUrl}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";
// src/actions/authActions.jsx
export const profileRequest = () => ({
  type: PROFILE_REQUEST,
});

export const profileSuccess = (userProfile) => ({
  type: PROFILE_SUCCESS,
  payload: userProfile,
});

export const profileFailure = (error) => ({
  type: PROFILE_FAILURE,
  payload: error,
});

export const fetchUserProfile = (userId, token) => {
  return async (dispatch) => {
    dispatch(profileRequest());
    try {
      const response = await axios.get(`${BaseUrl}user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adding the token to the request headers
        },
      });
      dispatch(profileSuccess(response.data));
    } catch (error) {
      dispatch(profileFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx
export const UPDATE_TASK_REQUEST = "UPDATE_TASK_REQUEST";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

// src/actions/authActions.jsx
export const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

export const updateTaskSuccess = (message) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: message,
});

export const updateTaskFailure = (error) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const updateTaskDetails = (userId, taskId, data, token) => {
  return async (dispatch) => {
    dispatch(updateTaskRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}update-task/${userId}/${taskId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(updateTaskSuccess(response.data.message));
    } catch (error) {
      dispatch(updateTaskFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Assign task action types
export const ASSIGN_TASK_REQUEST = "ASSIGN_TASK_REQUEST";
export const ASSIGN_TASK_SUCCESS = "ASSIGN_TASK_SUCCESS";
export const ASSIGN_TASK_FAILURE = "ASSIGN_TASK_FAILURE";

// src/actions/authActions.jsx

// Assign admin role action types
export const ASSIGN_ADMIN_REQUEST = "ASSIGN_ADMIN_REQUEST";
export const ASSIGN_ADMIN_SUCCESS = "ASSIGN_ADMIN_SUCCESS";
export const ASSIGN_ADMIN_FAILURE = "ASSIGN_ADMIN_FAILURE";

// Assign admin role actions
export const assignAdminRequest = () => ({
  type: ASSIGN_ADMIN_REQUEST,
});

export const assignAdminSuccess = (userId, isAdmin, message) => ({
  type: ASSIGN_ADMIN_SUCCESS,
  payload: { userId, isAdmin, message },
});

export const assignAdminFailure = (error) => ({
  type: ASSIGN_ADMIN_FAILURE,
  payload: error,
});

export const assignAdminRole = (userId, isAdmin, token) => {
  return async (dispatch) => {
    dispatch(assignAdminRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}assign-admin/${userId}`,
        { isAdmin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(assignAdminSuccess(userId, isAdmin, response.data.message));
    } catch (error) {
      dispatch(assignAdminFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Action types
export const UPDATE_ADMIN_STATUS = "UPDATE_ADMIN_STATUS";

// Action creators
export const updateAdminStatus = (userId, isAdmin) => ({
  type: UPDATE_ADMIN_STATUS,
  payload: { userId, isAdmin },
});

// Assign task actions
export const assignTaskRequest = () => ({
  type: ASSIGN_TASK_REQUEST,
});

export const assignTaskSuccess = (message) => ({
  type: ASSIGN_TASK_SUCCESS,
  payload: message,
});

export const assignTaskFailure = (error) => ({
  type: ASSIGN_TASK_FAILURE,
  payload: error,
});

export const assignTaskToEmployee = (userId, taskName, token) => {
  return async (dispatch) => {
    dispatch(assignTaskRequest());
    try {
      const response = await axios.put(
        `${BaseUrl}assign-task/${userId}`,
        { task_name: taskName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(assignTaskSuccess(response.data.message));
    } catch (error) {
      dispatch(assignTaskFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx
// Analytics action types
export const FETCH_ANALYTICS_REQUEST = "FETCH_ANALYTICS_REQUEST";
export const FETCH_ANALYTICS_SUCCESS = "FETCH_ANALYTICS_SUCCESS";
export const FETCH_ANALYTICS_FAILURE = "FETCH_ANALYTICS_FAILURE";

// src/actions/authActions.jsx

// Analytics actions
export const fetchAnalyticsRequest = () => ({
  type: FETCH_ANALYTICS_REQUEST,
});

export const fetchAnalyticsSuccess = (analyticsData) => ({
  type: FETCH_ANALYTICS_SUCCESS,
  payload: analyticsData,
});

export const fetchAnalyticsFailure = (error) => ({
  type: FETCH_ANALYTICS_FAILURE,
  payload: error,
});

export const fetchAnalytics = (token) => {
  return async (dispatch) => {
    dispatch(fetchAnalyticsRequest());
    try {
      const response = await axios.get(`${BaseUrl}analytics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAnalyticsSuccess(response.data));
    } catch (error) {
      dispatch(fetchAnalyticsFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Delete user action types
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

// Delete user actions
export const deleteUserRequest = () => ({
  type: DELETE_USER_REQUEST,
});

export const deleteUserSuccess = (message) => ({
  type: DELETE_USER_SUCCESS,
  payload: message,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const deleteUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const response = await axios.delete(`${BaseUrl}user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(deleteUserSuccess(response.data.message));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const VERIFY_FAILURE = "VERIFY_FAILURE";
// src/actions/authActions.jsx

export const verifyRequest = () => ({
  type: VERIFY_REQUEST,
});

export const verifySuccess = (data) => ({
  type: VERIFY_SUCCESS,
  payload: data,
});

export const verifyFailure = (error) => ({
  type: VERIFY_FAILURE,
  payload: error,
});
// src/actions/authActions.jsx

export const verifyQRCode = (employeeID, location) => {
  return async (dispatch) => {
    dispatch(verifyRequest());
    try {
      const response = await axios.post(`${BaseUrl}api/verify`, {
        employeeID,
        location,
      });
      dispatch(verifySuccess(response.data));
      // Additional logic if needed
    } catch (error) {
      dispatch(verifyFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

export const FETCH_SUGGESTIONS_REQUEST = "FETCH_SUGGESTIONS_REQUEST";
export const FETCH_SUGGESTIONS_SUCCESS = "FETCH_SUGGESTIONS_SUCCESS";
export const FETCH_SUGGESTIONS_FAILURE = "FETCH_SUGGESTIONS_FAILURE";
export const fetchSuggestionsRequest = () => ({
  type: FETCH_SUGGESTIONS_REQUEST,
});

export const fetchSuggestionsSuccess = (suggestions) => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  payload: suggestions,
});

export const fetchSuggestionsFailure = (error) => ({
  type: FETCH_SUGGESTIONS_FAILURE,
  payload: error,
});

export const fetchSuggestions = (searchTerm, token) => {
  return async (dispatch) => {
    dispatch(fetchSuggestionsRequest());
    try {
      const response = await axios.get(
        `${BaseUrl}api/suggestions?searchTerm=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(fetchSuggestionsSuccess(response.data.suggestions));
    } catch (error) {
      dispatch(fetchSuggestionsFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

export const FETCH_ATTENDANCE_REPORT_REQUEST =
  "FETCH_ATTENDANCE_REPORT_REQUEST";
export const FETCH_ATTENDANCE_REPORT_SUCCESS =
  "FETCH_ATTENDANCE_REPORT_SUCCESS";
export const FETCH_ATTENDANCE_REPORT_FAILURE =
  "FETCH_ATTENDANCE_REPORT_FAILURE";

export const fetchAttendanceReportRequest = () => ({
  type: FETCH_ATTENDANCE_REPORT_REQUEST,
});

export const fetchAttendanceReportSuccess = (report) => ({
  type: FETCH_ATTENDANCE_REPORT_SUCCESS,
  payload: report,
});

export const fetchAttendanceReportFailure = (error) => ({
  type: FETCH_ATTENDANCE_REPORT_FAILURE,
  payload: error,
});

export const fetchAttendanceReport = (employeeID, token) => {
  return async (dispatch) => {
    dispatch(fetchAttendanceReportRequest());
    try {
      const response = await axios.get(
        `${BaseUrl}api/attendanceReport/${employeeID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(fetchAttendanceReportSuccess(response.data));
    } catch (error) {
      dispatch(fetchAttendanceReportFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

export const FETCH_AVATAR_REQUEST = "FETCH_AVATAR_REQUEST";
export const FETCH_AVATAR_SUCCESS = "FETCH_AVATAR_SUCCESS";
export const FETCH_AVATAR_FAILURE = "FETCH_AVATAR_FAILURE";

export const fetchAvatarRequest = () => ({
  type: FETCH_AVATAR_REQUEST,
});

export const fetchAvatarSuccess = (avatar) => ({
  type: FETCH_AVATAR_SUCCESS,
  payload: avatar,
});

export const fetchAvatarFailure = (error) => ({
  type: FETCH_AVATAR_FAILURE,
  payload: error,
});

export const fetchAvatar = (employeeID, token) => {
  return async (dispatch) => {
    dispatch(fetchAvatarRequest());
    try {
      const response = await axios.get(`${BaseUrl}avatar/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAvatarSuccess(response.data.avatar));
      console.log("avatar hi avatart", response.data.avatar);
    } catch (error) {
      dispatch(fetchAvatarFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Fetch admin status action types
export const FETCH_ADMIN_STATUS_REQUEST = "FETCH_ADMIN_STATUS_REQUEST";
export const FETCH_ADMIN_STATUS_SUCCESS = "FETCH_ADMIN_STATUS_SUCCESS";
export const FETCH_ADMIN_STATUS_FAILURE = "FETCH_ADMIN_STATUS_FAILURE";

// Fetch admin status actions
export const fetchAdminStatusRequest = () => ({
  type: FETCH_ADMIN_STATUS_REQUEST,
});

export const fetchAdminStatusSuccess = (isAdmin) => ({
  type: FETCH_ADMIN_STATUS_SUCCESS,
  payload: isAdmin,
});

export const fetchAdminStatusFailure = (error) => ({
  type: FETCH_ADMIN_STATUS_FAILURE,
  payload: error,
});

export const fetchAdminStatus = (token) => {
  return async (dispatch) => {
    dispatch(fetchAdminStatusRequest());
    try {
      const response = await axios.get(`${BaseUrl}check-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(fetchAdminStatusSuccess(response.data.isAdmin));
    } catch (error) {
      dispatch(fetchAdminStatusFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

export const SEND_OTP_REQUEST = "SEND_OTP_REQUEST";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILURE = "SEND_OTP_FAILURE";

export const sendOTPRequest = () => ({
  type: SEND_OTP_REQUEST,
});

export const sendOTPSuccess = (otp, message) => ({
  type: SEND_OTP_SUCCESS,
  payload: { otp, message },
});

export const sendOTPFailure = (error) => ({
  type: SEND_OTP_FAILURE,
  payload: error,
});

export const sendOTP = (email) => {
  return async (dispatch) => {
    dispatch(sendOTPRequest());
    try {
      const response = await axios.post(`${BaseUrl}api/send-otp`, { email });
      dispatch(sendOTPSuccess(response.data.otp, response.data.message));
    } catch (error) {
      dispatch(sendOTPFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Fetch designations action types
export const FETCH_DESIGNATIONS_REQUEST = "FETCH_DESIGNATIONS_REQUEST";
export const FETCH_DESIGNATIONS_SUCCESS = "FETCH_DESIGNATIONS_SUCCESS";
export const FETCH_DESIGNATIONS_FAILURE = "FETCH_DESIGNATIONS_FAILURE";

// Create designation action types
export const CREATE_DESIGNATION_REQUEST = "CREATE_DESIGNATION_REQUEST";
export const CREATE_DESIGNATION_SUCCESS = "CREATE_DESIGNATION_SUCCESS";
export const CREATE_DESIGNATION_FAILURE = "CREATE_DESIGNATION_FAILURE";

// src/actions/authActions.jsx

export const fetchDesignationsRequest = () => ({
  type: FETCH_DESIGNATIONS_REQUEST,
});

export const fetchDesignationsSuccess = (designations) => ({
  type: FETCH_DESIGNATIONS_SUCCESS,
  payload: designations,
});

export const fetchDesignationsFailure = (error) => ({
  type: FETCH_DESIGNATIONS_FAILURE,
  payload: error,
});

// Modify fetchDesignations to accept token as a parameter
export const fetchDesignations = (token) => {
  return async (dispatch) => {
    dispatch(fetchDesignationsRequest());
    try {
      const response = await axios.get(`${BaseUrl}api/designations`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with token
        },
      });
      dispatch(fetchDesignationsSuccess(response.data.designations));
    } catch (error) {
      dispatch(fetchDesignationsFailure(error.message));
    }
  };
};

// Create designation actions
export const createDesignationRequest = () => ({
  type: CREATE_DESIGNATION_REQUEST,
});

export const createDesignationSuccess = (designation) => ({
  type: CREATE_DESIGNATION_SUCCESS,
  payload: designation,
});

export const createDesignationFailure = (error) => ({
  type: CREATE_DESIGNATION_FAILURE,
  payload: error,
});

export const createDesignation = (name, token) => {
  return async (dispatch) => {
    dispatch(createDesignationRequest());
    try {
      const response = await axios.post(
        `${BaseUrl}api/designations`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(createDesignationSuccess(response.data.designation));
    } catch (error) {
      dispatch(createDesignationFailure(error.message));
    }
  };
};

// src/actions/authActions.jsx

// Action Types
export const ASSIGN_DESIGNATION_SUCCESS = "ASSIGN_DESIGNATION_SUCCESS";
export const ASSIGN_DESIGNATION_FAILURE = "ASSIGN_DESIGNATION_FAILURE";

// Action Creators
export const assignDesignationToUser =
  (userId, designationId, token) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const body = JSON.stringify({ designationId });

      const res = await axios.put(
        `${BaseUrl}api/users/${userId}/assign-designation`,
        body,
        config
      );

      dispatch({
        type: ASSIGN_DESIGNATION_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ASSIGN_DESIGNATION_FAILURE,
        payload: error.response.data.error,
      });
    }
  };

  // src/actions/authActions.jsx

// Check out action types
export const CHECK_OUT_REQUEST = "CHECK_OUT_REQUEST";
export const CHECK_OUT_SUCCESS = "CHECK_OUT_SUCCESS";
export const CHECK_OUT_FAILURE = "CHECK_OUT_FAILURE";

// src/actions/authActions.jsx

export const checkOutRequest = () => ({
  type: CHECK_OUT_REQUEST,
});

export const checkOutSuccess = (message) => ({
  type: CHECK_OUT_SUCCESS,
  payload: message,
});

export const checkOutFailure = (error) => ({
  type: CHECK_OUT_FAILURE,
  payload: error,
});

export const recordCheckOut = (employeeID,action, location) => {
  return async (dispatch) => {
    dispatch(checkOutRequest());
    try {
      const response = await axios.post(`${BaseUrl}api/manual-attendance`, {
        employeeID,
        action,
        location,
      });
      dispatch(checkOutSuccess(response.data.message));
    } catch (error) {
      dispatch(checkOutFailure(error.message));
    }
  };
};


export const UPLOAD_AVATAR_REQUEST = "UPLOAD_AVATAR_REQUEST";
export const UPLOAD_AVATAR_SUCCESS = "UPLOAD_AVATAR_SUCCESS";
export const UPLOAD_AVATAR_FAILURE = "UPLOAD_AVATAR_FAILURE";


export const uploadAvatarRequest = () => ({
  type: UPLOAD_AVATAR_REQUEST,
});

export const uploadAvatarSuccess = (avatar) => ({
  type: UPLOAD_AVATAR_SUCCESS,
  payload: avatar,
});

export const uploadAvatarFailure = (error) => ({
  type: UPLOAD_AVATAR_FAILURE,
  payload: error,
});

export const uploadAvatar = () => {
  return async (dispatch) => {
    dispatch(uploadAvatarRequest());
    try {
      const formData = new FormData();
      formData.append("avatar", avatarData);

      const response = await axios.post(`${BaseUrl}upload-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(uploadAvatarSuccess(response.data.avatar));
    } catch (error) {
      dispatch(uploadAvatarFailure(error.message));
    }
  };
};





