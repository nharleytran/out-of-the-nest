import { Button, Text, Title } from "@mantine/core";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function Header(props) {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const location = useLocation();
  // const useAuthButton = (useAuth) => { 
  //   if (!useAuth.isAuth) {
  //     return (true, true, false);
  //   } else {
  //     return (false, false, true);
  //   }
  //   // if (!useAuth().isAuth) {
  //   //   setShowLoginButton(true);
  //   //   setShowSignupButton(true);
  //   //   setShowLogoutButton(false);
  //   // } else {
  //   //   setShowLoginButton(false);
  //   //   setShowSignupButton(false);
  //   //   setShowLogoutButton(true);
  //   // }
  // };
  // const {a1,a2,a3} = useAuthButton(useAuth);
  // setShowLoginButton(a1);
  // setShowSignupButton(a2);
  // setShowLogoutButton(a3);
  // useEffect(() => {
  // }, []);

  const { query, setQuery, onFilterClick } = props;
  const isFeedPage = location.pathname === "/feed";
  const searchComponent = isFeedPage ? (
    <Search query={query} setQuery={setQuery} />
  ) : null;
  let loginButton = null;
  let logoutButton = null;
  let signupButton = null;
  console.log(useAuth().isAuth);
  if (!useAuth().isAuth ) {
    loginButton = (
      <Button className="login-button" onClick={() => navigate("/login")}>
        Login
      </Button>
    );
  }
  if (!useAuth().isAuth) {
    signupButton = (
      <Button className="login-button" onClick={() => navigate("/user/create")}>
        Sign Up
      </Button>
    );
  }
  if (useAuth().isAuth) {
    logoutButton = (
      <Button
        className="login-button"
        onClick={() => {
          localStorage.removeItem("token");
          console.log("logout", localStorage.getItem("token"));
          navigate("/login");
        }}
      >
        Logout
      </Button>
    );
  }

  return (
    <div className="header">
      <Link to={`/`} style={{ textDecoration: "none" }}>
        <Title order={3}>
          {" "}
          Out of the{" "}
          <Text span c="blue" inherit>
            Nest
          </Text>
        </Title>
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
        {searchComponent}

        <Button onClick={() => navigate("/create")}>Create post</Button>
        {loginButton}
        {logoutButton}
        {signupButton}
      </div>
    </div>
  );
}

export default Header;
