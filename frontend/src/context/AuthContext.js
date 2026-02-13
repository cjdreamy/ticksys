import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Mock users and organizers storage
let mockUsers = JSON.parse(localStorage.getItem('mockUsers')) || {};
let mockOrganizers = JSON.parse(localStorage.getItem('mockOrganizers')) || {};

const saveToLocalStorage = () => {
  localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
  localStorage.setItem('mockOrganizers', JSON.stringify(mockOrganizers));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [organizer, setOrganizer] = useState(null);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || null);
  const [organizerToken, setOrganizerToken] = useState(localStorage.getItem('organizerToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const registerUser = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      if (mockUsers[email]) {
        return { success: false, message: 'Email already registered' };
      }

      if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      const userId = 'user_' + Date.now();
      const userData = {
        id: userId,
        firstName,
        lastName,
        email,
        password
      };

      mockUsers[email] = userData;
      saveToLocalStorage();

      const token = 'user_token_' + Date.now();
      setUser(userData);
      setUserToken(token);
      localStorage.setItem('userToken', token);
      localStorage.setItem('currentUserEmail', email);

      return { success: true, data: { user: userData, token } };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const loginUser = async (email, password) => {
    try {
      const user = mockUsers[email];
      if (!user || user.password !== password) {
        return { success: false, message: 'Invalid credentials' };
      }

      const token = 'user_token_' + Date.now();
      setUser(user);
      setUserToken(token);
      localStorage.setItem('userToken', token);
      localStorage.setItem('currentUserEmail', email);

      return { success: true, data: { user, token } };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const registerOrganizer = async (name, email, password, confirmPassword, company) => {
    try {
      if (mockOrganizers[email]) {
        return { success: false, message: 'Email already registered' };
      }

      if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      const organizerId = 'org_' + Date.now();
      const organizerData = {
        id: organizerId,
        name,
        email,
        password,
        company
      };

      mockOrganizers[email] = organizerData;
      saveToLocalStorage();

      const token = 'org_token_' + Date.now();
      setOrganizer(organizerData);
      setOrganizerToken(token);
      localStorage.setItem('organizerToken', token);
      localStorage.setItem('currentOrganizerEmail', email);

      return { success: true, data: { organizer: organizerData, token } };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const loginOrganizer = async (email, password) => {
    try {
      const organizer = mockOrganizers[email];
      if (!organizer || organizer.password !== password) {
        return { success: false, message: 'Invalid credentials' };
      }

      const token = 'org_token_' + Date.now();
      setOrganizer(organizer);
      setOrganizerToken(token);
      localStorage.setItem('organizerToken', token);
      localStorage.setItem('currentOrganizerEmail', email);

      return { success: true, data: { organizer, token } };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setOrganizer(null);
    setUserToken(null);
    setOrganizerToken(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('organizerToken');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('currentOrganizerEmail');
  };

  return (
    <AuthContext.Provider value={{
      user,
      organizer,
      userToken,
      organizerToken,
      loading,
      registerUser,
      loginUser,
      registerOrganizer,
      loginOrganizer,
      logout,
      isUserLoggedIn: !!userToken,
      isOrganizerLoggedIn: !!organizerToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
