import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login as authLogin, signup as authSignup, logout as authLogout, saveQuizProgress as authSaveQuiz } from "../utils/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    try {
      const userData = authLogin(email, password);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = (email, password, name) => {
    try {
      const userData = authSignup(email, password, name);
      // login happens inside signup in my new utility, but let's be explicit
      const loggedInUser = authLogin(email, password);
      setUser(loggedInUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const updateProgress = (quizResult) => {
    if (user) {
      try {
        const success = authSaveQuiz(user.email, quizResult);
        if (success) {
          // Refresh local state to reflect new activity/progress
          setUser(getCurrentUser());
        }
      } catch (error) {
        console.error("Failed to update progress:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProgress, loading }}>
      {!loading ? children : <div style={{background: '#0f0b07', color: '#c9a14a', height: '100vh', display: 'grid', placeItems: 'center'}}>Loading ITIHAAS...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
