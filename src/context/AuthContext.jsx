import { createContext, useContext, useState, useEffect } from "react";
import * as postApi from "../api";
import { Navigate } from "react-router-dom";
import { notifications, Notifications } from "@mantine/notifications";
import { Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Affix, Button, Text, Transition, rem } from "@mantine/core";

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      postApi.getAuth().then((res) => {
        setIsAuth(res.status === 200);
      });
    } else {
      setIsAuth(true);
    }
    if (!isAuth) {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  });
  if (!isAuth) {
    return <Notification loading> Login required! </Notification>;
  }

  return <div>{children}</div>;
}

export { AuthProvider, RequireAuth };
