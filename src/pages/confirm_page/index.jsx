import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateTaskDetails } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import CheckInOut from '../../components/CheckInCheckOut/CheckInOut';
import './userprofile.css'; // Import the custom CSS file

const UserProfile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const userid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (userid) {
      dispatch(fetchUserProfile(userid, token)).catch((error) =>
        console.error('Error fetching user profile:', error)
      );
    }
  }, [userid, dispatch, token]);

  const userProfile = useSelector((state) => state.auth.userProfile);

  const handleTaskButtonClick = (taskId, taskStatus) => {
    setLoading(true);
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const data = {
      task_status: taskStatus === 'Pending' ? 'in-progress' : 'completed',
      [taskStatus === 'Pending' ? 'check_in_time' : 'check_out_time']: currentTime,
    };
    dispatch(updateTaskDetails(userid, taskId, data, token))
      .then(() => {
        setLoading(false);
        // Update task status locally
        const updatedUserProfile = { ...userProfile };
        const updatedTasks = updatedUserProfile.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, task_status: data.task_status };
          }
          return task;
        });
        updatedUserProfile.tasks = updatedTasks;
        dispatch({ type: 'PROFILE_SUCCESS', payload: updatedUserProfile });
      })
      .catch(() => setLoading(false));
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const allTasksCompleted =
    userProfile.tasks &&
    userProfile.tasks.every((task) => task.task_status === 'completed');

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card profile-card">
            <div className="profile-card-header">
              <img
                src={`data:image/jpeg;base64,${userProfile.avatar}`}
                className="card-img-top rounded-circle profile-avatar"
                alt="Profile"
              />
            </div>
            <div className="card-body text-center">
              <h5 className="card-titles">{userProfile.name}</h5>
              <p className="card-text text-muted">{userProfile.designation}</p>
              <CheckInOut userId={userid} />
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Tasks</h5>
            </div>
            <div className="card-body">
              {userProfile.tasks && userProfile.tasks.length > 0 ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Task Name</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userProfile.tasks.map((task) => (
                      <tr key={task._id}>
                        <td>{task.task_name}</td>
                        <td>{task.task_status}</td>
                        <td>
                          {task.task_status !== 'completed' ? (
                            <button
                              className="btn btn-primary"
                              disabled={loading}
                              onClick={() =>
                                handleTaskButtonClick(task._id, task.task_status)
                              }
                            >
                              {loading
                                ? 'Processing...'
                                : task.task_status === 'Pending'
                                ? 'Check In'
                                : 'Check Out'}
                            </button>
                          ) : (
                            <span className="badge bg-success">Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>No tasks found</div>
              )}
              {allTasksCompleted && (
                <div className="alert alert-success mt-3" role="alert">
                  All tasks completed!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
