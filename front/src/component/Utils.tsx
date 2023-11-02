/**
 * Set user data in local storage.
 * @param user An object containing user data.
 */
export const setUserDataInLocalStorage = (user: any) => {
  localStorage.setItem("bankUserIsLogged", String(user.isLogged));
  localStorage.setItem("bankUserIsConfirmed", String(user.isConfirmed));
  localStorage.setItem("bankUserToken", user.token || "");
  localStorage.setItem("bankUserEmail", user.email || "");
};

/**
 * Get user data from local storage.
 * @returns An object with user data retrieved from local storage.
 */
export const getUserDataFromLocalStorage = () => {
  return {
    isLogged: localStorage.getItem("bankUserIsLogged") === "true" || false,
    isConfirmed:
      localStorage.getItem("bankUserIsConfirmed") === "true" || false,
    token: localStorage.getItem("bankUserToken") || null,
    email: localStorage.getItem("bankUserEmail") || null,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export default {
  setUserDataInLocalStorage,
  getUserDataFromLocalStorage,
  validateEmail,
  // Add more utility functions here if needed
};
