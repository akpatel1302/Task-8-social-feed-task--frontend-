import React, { useState } from 'react';
import { useUpdateUserProfileMutation } from '../api/SignupApi';
import Cookies from 'js-cookie';
import Modal from './Modal'

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstname: user.data.firstname,
    lastname: user.data.lastname,
    username: user.data.username,
    email: user.data.email,
  });

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const handleInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile({
        body: formData,
        accessToken: Cookies.get('accessToken'),
      }).unwrap();
      onClose();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h3>Edit Profile</h3>
      <form onSubmit={handleSaveProfile}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
};

export default EditProfileModal;