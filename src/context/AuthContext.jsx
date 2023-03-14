import { createContext, useContext, useState, useEffect } from "react";
import * as postApi from "../api";
import { Navigate } from "react-router-dom";
import { notifications, Notifications } from "@mantine/notifications";
import { Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Affix, Button, Text, Transition, rem } from '@mantine/core';


const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    postApi.isAuthorized().then((res) => {
      setIsAuth(res.status === 200);
    });
  }, []);
  return isAuth;
};

function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  const isAuth = useAuthContext();
  const navigate = useNavigate();
  if (!isAuth) {
    setTimeout(() => navigate("/login"), 2000);
    return <Affix position={{ top: 10, right: 50}}>
      <Notification title="Login required" loading style={{ width: 350, height: 100 }}>
        Redirecting to login page...
      </Notification>
    </Affix> ;
    }

  return children;
}

export { AuthProvider, useAuthContext, RequireAuth };
