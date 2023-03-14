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
  useEffect(() => {
    console.log("call useffect isAuth", isAuth);
    postApi.isAuthorized().then((res) => {
      setIsAuth(res.status === 200);
      console.log("isAuth inside useeffect", isAuth);
      // if (!ignore)
      // setStatus(res.status);
    });
    return () => {};
  });
  // setIsAuth(status===200);
  return <AuthContext.Provider value={isAuth}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }) {
  const navigate = useNavigate();
  const useAuth = useContext(AuthContext);
  useEffect(() => {
    console.log("is auth in requireAuth useeffect", useAuth);
    if (!useAuth) {
      console.log("redirect to login");
      setTimeout(() => navigate("/login"), 2000);
    }
    const target_page = useAuth ? "/" : "/login";
    navigate(target_page);
    // setTimeout(() => navigate(target_page), 2000);
  },[useAuth]);

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

  // return children;
  return <div>{children}</div>;
}

export { AuthProvider, RequireAuth };
