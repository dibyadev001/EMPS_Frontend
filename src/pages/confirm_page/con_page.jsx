import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateTaskDetails,
} from "../../actions/authActions";
import ConfirmPage from ".";

const UserProfile = () => {
  
  return (
    <div>
      <ConfirmPage/>
    </div>
  );
};

export default UserProfile;
