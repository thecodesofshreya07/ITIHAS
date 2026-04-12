// Simulated backend using localStorage
const getHistoryUsers = () => {
  const users = localStorage.getItem("itihas_users");
  return users ? JSON.parse(users) : {};
};

const saveHistoryUsers = (users) => {
  localStorage.setItem("itihas_users", JSON.stringify(users));
};

export const signup = (email, password, name) => {
  const users = getHistoryUsers();
  if (users[email]) {
    throw new Error("User already exists");
  }
  users[email] = {
    email,
    password,
    name,
    progress: {
      quizzes: [], // { title, score, total, date }
      topicsRead: []
    }
  };
  saveHistoryUsers(users);
  return users[email];
};

export const login = (email, password) => {
  const users = getHistoryUsers();
  const user = users[email];
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password");
  }
  
  // Create a session
  localStorage.setItem("itihas_session", JSON.stringify({ email: user.email }));
  return user;
};

export const logout = () => {
  localStorage.removeItem("itihas_session");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("itihas_session");
};

export const getCurrentUser = () => {
  const session = localStorage.getItem("itihas_session");
  if (!session) return null;
  
  const { email } = JSON.parse(session);
  const users = getHistoryUsers();
  return users[email] || null;
};

export const saveQuizProgress = (email, quizResult) => {
  const users = getHistoryUsers();
  if (users[email]) {
    users[email].progress.quizzes.push({
      ...quizResult,
      date: new Date().toISOString()
    });
    saveHistoryUsers(users);
    return true;
  }
  return false;
};
