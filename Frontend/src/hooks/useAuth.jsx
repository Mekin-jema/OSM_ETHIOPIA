import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";

// this is a custom hook to check if the user is logged in or not
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const client = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    });
    client
      .init({ onLoad: "login-required", checkLoginIframe: true })
      .then((authenticated) => {
        setIsLoggedIn(authenticated);
      })
      .catch((error) => {
        console.error("Keycloak initialization error:", error);
        setIsLoggedIn(false);
      });
  }, []);
  return isLoggedIn;
};

export default useAuth;
