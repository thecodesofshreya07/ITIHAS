import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, login as authLogin, signup as authSignup, logout as authLogout, saveQuizProgress as authSaveQuiz } from "../utils/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Failed to load user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authLogin(email, password);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (email, password, name) => {
    try {
      const userData = await authSignup(email, password, name);
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const updateProgress = async (quizResult) => {
    if (user) {
      try {
        const success = await authSaveQuiz(quizResult);
        if (success) {
          // Refresh local state to reflect new activity/progress
          await fetchUser();
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
