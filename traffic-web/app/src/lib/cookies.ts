// Function to get cookie value by name
export const getCookie = (name: string): string | undefined => {
  if (typeof window === "undefined") {
    return undefined;
  }
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue ? cookieValue : undefined;
  }
  return undefined;
};

// Set cookie with 1 hour expiration
export const setCookieWithExpiration = (
  name: string,
  value: string,
  hours: number
) => {
  const date = new Date();
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; path=/; ${expires}`;
};

// Function to remove cookie
export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};
