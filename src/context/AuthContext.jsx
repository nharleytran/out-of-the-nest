import { createContext, useContext, useState, useEffect } from "react";
import * as postApi from "../api";
import { Navigate } from "react-router-dom";
import { notifications, Notifications } from "@mantine/notifications";
import { Notification } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Affix, Button, Text, Transition, rem } from "@mantine/core";

const AuthContext = createContext(false);
// const useAuth = () => {
//   const [isAuth, setIsAuth] = useState(false);
//   useEffect(() => {
//     console.log("useAuth", isAuth);
//     postApi.isAuthorized().then((res) => {
//       setIsAuth(res.status === 200);
//     });
//   });
//   return isAuth;
// };

function AuthProvider({ children }) {
  // const auth = useAuth();
  const [isAuth, setIsAuth] = useState(false);
  console.log("isAuth", isAuth);
  console.log("RequireAuth1", useContext(AuthContext));
  useEffect(() => {
    let ignore = false;
    console.log("call useeffect isAuth", isAuth);
    postApi.isAuthorized().then((res) => {
      if (!ignore)
        setIsAuth(res.status === 200);
    });
    return () => {
      ignore = true;
    }
  },[]);
  return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  useEffect(() => {
    console.log("RequireAuth", useAuth);
    const target_page = useAuth ? "/" : "/login";
    navigate(target_page);
    // setTimeout(() => navigate(target_page), 2000);
  });

  // if (!useAuth)
  //   return (
  //     <Affix position={{ top: 10, right: 50 }}>
  //       <Notification
  //         title="Login required"
  //         loading
  //         style={{ width: 350, height: 100 }}
  //       >
  //         Redirecting to login page...
  //       </Notification>
  //     </Affix>
  //   );

  return children;
}

export { AuthProvider, RequireAuth };
