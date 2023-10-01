import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Profiles from '../components/Profiles';

const Profile = () => {
  return (
    <div>
    <Navbar className="fixed-navbar" />
      <Profiles />
      <Footer/>
    </div>
  );
};

export default Profile