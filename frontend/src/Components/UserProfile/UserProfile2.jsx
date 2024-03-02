



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile2 = ({ userId }) => {
  const defaultUserPhoto =
    '/userP2.jpg'; // Replace with actual user photo URL or use a placeholder image
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
        <div style={styles.usernameText}>{userInfo.username}</div>
      </div>
      <h2 style={styles.heading}></h2>
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
  
    </div>
  );
};


const styles =
 {
  userProfile: {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(10, 10, 10, 0.5)',
    top: '30px',
    marginTop: '130px',
    display: 'grid',
    gridTemplateColumns: '1fr auto 2fr', // Changed grid template columns
    gap: '40px', // Added gap between columns
    alignItems: 'center', // Center align items vertically
  },
  
  verticalLine: {
    width: '2px',
    height: '100%',
    background: '#ddd',
    position: 'absolute',
    left: '42%', 
    bottom: '15',
    transform: 'translateX(-50%)',
    
  },
  
  userPhotoContainer: {
    textAlign: 'center',
  },
  
  userPhoto: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '4px',
    border: '4px solid #fff',
  },
  usernameText: {
    textAlign: 'center', // Adjusted textAlign
    color: '#333',
     // Adjust the margin based on your design
    fontSize: '24px', // Adjust the font size based on your design
    marginBottom: '280px', // Adjust the margin bottom based on your design
    
  },
  
  userInfo: {
    display: 'grid',
    gridTemplateRows: '1fr auto', // Changed grid template rows
    rowGap: '15px',
  },
  
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  
  label: {
    width: '150px',
    fontWeight: 'bold',
    color: '#555',
    fontSize: '16px',
  },
  
  span: {
    padding: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    backgroundColor: '#ffffff',
  },
  
  input: {
    padding: '10px',
    borderRadius: '6px',
    fontSize: '16px',
    width: '100%',
  },
  
  buttons: {
    marginTop: '30px',
    textAlign: 'center',
  },
  
  editButton: {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginRight: '15px',
  },
  
  saveButton: {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },

 
  
};

  export default UserProfile2;
  