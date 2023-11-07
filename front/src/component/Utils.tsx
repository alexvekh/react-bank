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

class AmountSplitter {
  static splitAmount(amount: number) {
    const dollars = Math.floor(amount);
    const cents = (amount - dollars) * 100;
    return { dollars, cents };
  }
}

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();

  if (date.toDateString() === now.toDateString()) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${months[date.getMonth()]} ${date.getDate()}`;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${formattedDate} ${hours}:${minutes}`;
  }
}

export default {
  setUserDataInLocalStorage,
  getUserDataFromLocalStorage,
  validateEmail,
  AmountSplitter,
  formatTimestamp,
  // Add more utility functions here if needed
};
