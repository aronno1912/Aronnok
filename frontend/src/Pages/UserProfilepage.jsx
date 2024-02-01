import React from 'react';
import UserProfile from '../Components/UserProfile/UserProfile';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const UserProfilePage = () => {
    const { userId } = useParams();
    return (
        <div>
            {/* Your code goes here */}
            <Navbar userId={userId} />
            <UserProfile userId={userId} />
            <Footer />
        </div>
    );
};

export default UserProfilePage;
