// src/reducer/authReducer.jsx
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  ASSIGN_ADMIN_REQUEST,
  ASSIGN_ADMIN_FAILURE,
  ASSIGN_TASK_REQUEST,
  ASSIGN_TASK_SUCCESS,
  ASSIGN_TASK_FAILURE,
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_ANALYTICS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  FETCH_SUGGESTIONS_REQUEST,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_FAILURE,
  FETCH_ATTENDANCE_REPORT_REQUEST,
  FETCH_ATTENDANCE_REPORT_SUCCESS,
  FETCH_ATTENDANCE_REPORT_FAILURE,
  UPDATE_ADMIN_STATUS,
  FETCH_AVATAR_REQUEST,
  FETCH_AVATAR_SUCCESS,
  FETCH_AVATAR_FAILURE,
  REGISTER_ADMIN_REQUEST,
  REGISTER_ADMIN_SUCCESS,
  REGISTER_ADMIN_FAILURE,
  FETCH_ADMIN_STATUS_REQUEST,
  FETCH_ADMIN_STATUS_SUCCESS,
  FETCH_ADMIN_STATUS_FAILURE,
  SEND_OTP_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
  FETCH_DESIGNATIONS_REQUEST,
  FETCH_DESIGNATIONS_SUCCESS,
  FETCH_DESIGNATIONS_FAILURE,
  CREATE_DESIGNATION_REQUEST,
  CREATE_DESIGNATION_SUCCESS,
  CREATE_DESIGNATION_FAILURE,
  ASSIGN_DESIGNATION_SUCCESS,
  ASSIGN_DESIGNATION_FAILURE,
  // Other imports
  CHECK_OUT_REQUEST,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_FAILURE,

  // Other action types
  UPLOAD_AVATAR_REQUEST,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
} from "../actions/authActions";

const initialState = {
  loading: false,
  user: null,
  userlogin: null, // Initially no user is logged in
  users: [],
  error: null,
  userProfile: [],
  analyticsData: [],
  deleteUserMessage: null,
  verificationData: null,
  suggestions: [],
  attendanceReport: null,
  avatar: null,
  adminregister: null,
  isAdmin: null, // New state property to store admin status
  // existing state properties
  designations: [], // Add designations state
  newDesignation: null, // Add newDesignation state

  assignedDesignation: null,
  checkOutMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login reducers
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userlogin: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      localStorage.setItem("login_status", "false");
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      localStorage.removeItem("isAdmin");
      return {
        ...state,
        userlogin: null,
      };

    // Registration reducers
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userregister: action.payload,
      };

    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Admin Registration reducers
    case REGISTER_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        adminregister: action.payload,
      };

    case REGISTER_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //fetch user reducers
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Profile reducers
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskUpdateMessage: action.payload,
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Assign admin role reducers
    case ASSIGN_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ADMIN_STATUS:
      const { userId, isAdmin } = action.payload;
      const updatedUsers = state.users.map((user) => {
        if (user._id === userId) {
          return { ...user, isAdmin };
        }
        return user;
      });

      return {
        ...state,
        users: updatedUsers,
      };

    case ASSIGN_ADMIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Assign task reducers
    case ASSIGN_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ASSIGN_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        taskAssignMessage: action.payload,
      };
    case ASSIGN_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ANALYTICS_SUCCESS:
      console.log("Analytics Data:", action.payload); // Log analytics data

      return {
        ...state,
        loading: false,
        analyticsData: action.payload,
      };
    case FETCH_ANALYTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteUserMessage: action.payload,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        verificationData: action.payload, // Add verification data to state
      };
    case VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_SUGGESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestions: action.payload,
      };
    case FETCH_SUGGESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // other cases
    case FETCH_ATTENDANCE_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ATTENDANCE_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        attendanceReport: action.payload,
      };
    case FETCH_ATTENDANCE_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        avatar: action.payload, // Store the fetched avatar
      };
    case FETCH_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //isADMIN CHecker
    case FETCH_ADMIN_STATUS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ADMIN_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isAdmin: action.payload, // Update admin status in state
      };
    case FETCH_ADMIN_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SEND_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        otp: action.payload.otp, // Store the received OTP in state
        otpMessage: action.payload.message, // Store the message from the API
      };
    case SEND_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_DESIGNATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DESIGNATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        designations: action.payload,
      };
    case FETCH_DESIGNATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_DESIGNATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_DESIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        newDesignation: action.payload,
      };
    case CREATE_DESIGNATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ASSIGN_DESIGNATION_SUCCESS:
      return {
        ...state,
        error: null,
        successMessage: action.payload.message,
      };
    case ASSIGN_DESIGNATION_FAILURE:
      return {
        ...state,
        successMessage: null,
        error: action.payload,
      };

    case CHECK_OUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CHECK_OUT_SUCCESS:
      return {
        ...state,
        loading: false,
        checkOutMessage: action.payload,
      };
    case CHECK_OUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPLOAD_AVATAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        loading: false,
        avatar: action.payload,
      };
    case UPLOAD_AVATAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
