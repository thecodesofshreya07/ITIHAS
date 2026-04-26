const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth`;

export const signup = async (email, password, name) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  
  localStorage.setItem("itihas_token", data.token);
  return data.user;
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!data.success) throw new Error(data.error);
  
  localStorage.setItem("itihas_token", data.token);
  return data.user;
};

export const logout = () => {
  localStorage.removeItem("itihas_token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("itihas_token");
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem("itihas_token");
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    if (!data.success) {
      logout();
      return null;
    }
    return data.user;
  } catch (error) {
    return null;
  }
};

export const saveQuizProgress = async (quizResult) => {
  const token = localStorage.getItem("itihas_token");
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/progress`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // Note: quizResult will have era, score, etc. 
      // We pass the fields directly.
      body: JSON.stringify(quizResult) 
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    return false;
  }
};
