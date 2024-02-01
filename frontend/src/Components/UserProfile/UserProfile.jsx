



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const defaultUserPhoto =
    '/us.png'; // Replace with actual user photo URL or use a placeholder image
    console.log("userId in profile ", userId);

  const [userInfo, setUserInfo] = useState({
    username: '',
    firstname: '',
    lastname: '',
    religion: '',
    dob: '',
    mobile: '',
    email: '',
    present_addr: '',
  });

  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user information from the backend when the component mounts
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${userId}`); // Replace with actual backend URL
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditToggle = () => {
    setEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Send edited user information to the backend
      await axios.put(`http://localhost:8000/api/user/${userId}`, userInfo); // Replace with actual backend URL
      setEditing(false);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const renderField = (label, key, isEditable = true) => (
    <div style={styles.field} key={key}>
      <label style={styles.label}>{label}</label>
      {isEditing && isEditable ? (
        <input
          type="text"
          name={key}
          value={userInfo[key]}
          onChange={handleChange}
          style={styles.input}
        />
      ) : (
        <span style={styles.span}>{userInfo[key]}</span>
      )}
    </div>
  );

  return (
    <div style={styles.userProfile}>
      <div style={styles.userPhotoContainer}>
        <img src={defaultUserPhoto} alt="User" style={styles.userPhoto} />
      </div>
      <h2 style={styles.heading}>User Profile</h2>
      <div style={styles.userInfo}>
        {renderField('Username:', 'username', false)}
        {renderField('First Name:', 'firstname')}
        {renderField('Last Name:', 'lastname')}
        {renderField('Religion:', 'religion')}
        {renderField('Date of Birth:', 'dob')}
        {renderField('Mobile:', 'mobile')}
        {renderField('Email:', 'email')}
        {renderField('Address:', 'present_addr')}
      </div>
      <div style={styles.buttons}>
        {isEditing ? (
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        ) : (
          <button onClick={handleEditToggle} style={styles.editButton}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
    userProfile: {
      maxWidth: '800px', // Increased the max width
      margin: '40px auto',
      padding: '40px', // Increased padding
      backgroundColor: '#b2d3c2',
      borderRadius: '12px', // Increased border radius
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)', // Increased box shadow
      top: '20px',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      borderBottom: '2px solid #ddd',
      paddingBottom: '20px', // Increased padding
      marginBottom: '30px', // Increased margin bottom
      fontSize: '24px', // Increased font size
      fontWeight: 'bold', // Added font weight
    },
    userInfo: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      rowGap: '15px', // Increased row gap
      columnGap: '30px', // Increased column gap
    },
    field: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px', // Increased margin bottom
    },
    label: {
      width: '150px', // Increased width
      fontWeight: 'bold',
      color: '#555',
      fontSize: '16px', // Increased font size
    },
    span: {
      padding: '10px', // Increased padding
    //   border: '2px solid #ddd', // Increased border size
      borderRadius: '6px', // Increased border radius
      fontSize: '16px',
      backgroundColor: '#ffffff',
    },
    input: {
      padding: '10px', // Increased padding
    //   border: '2px solid #ddd', // Increased border size
      borderRadius: '6px', // Increased border radius
      fontSize: '16px',
      width: '100%',
    },
    buttons: {
      marginTop: '30px', // Increased margin top
      textAlign: 'center',
    },
    editButton: {
      padding: '12px 24px', // Increased padding
      fontSize: '18px', // Increased font size
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginRight: '15px', // Increased margin right
    },
    saveButton: {
      padding: '12px 24px', // Increased padding
      fontSize: '18px', // Increased font size
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    userPhotoContainer: {
      textAlign: 'center',
    },
    userPhoto: {
      width: '200px', // Increased width
      height: '200px', // Increased height
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '30px', // Increased margin bottom
      border: '4px solid #fff', // Added border
    },
  };
  
  export default UserProfile;
  