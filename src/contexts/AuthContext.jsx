import React, { createContext, useEffect, useState } from 'react'
import { getCurrentUser } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleGetCurrentUser = async () => {
    try {
      const response = await getCurrentUser();

      if (response?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(response?.data.data);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser])

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
};
