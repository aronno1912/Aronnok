import React from 'react';
import './SignupPage2.css';

const SignupPage2 = () => {
  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Create Account</h2>
        <form>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" required />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" required />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" name="dob" required />
          </div>

          <div className="form-group">
            <label htmlFor="religion">Religion:</label>
            <input type="text" id="religion" name="religion" required />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input type="tel" id="mobile" name="mobile" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" rows="4" required></textarea>
          </div>

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage2;
