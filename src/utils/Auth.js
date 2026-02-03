export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

export const login = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const logout = () => {
  localStorage.removeItem("user");
};
