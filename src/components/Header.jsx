import { Button, Text, Title } from "@mantine/core";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import * as postApi from "../api";

function Header(props) {
  const navigate = useNavigate();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showSignupButton, setShowSignupButton] = useState(false);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const location = useLocation();

  const { query, setQuery, onFilterClick } = props;
  const isFeedPage = location.pathname === "/feed";
  const searchComponent = isFeedPage ? (
    <Search query={query} setQuery={setQuery} />
  ) : null;
  let loginButton = null;
  let logoutButton = null;
  let signupButton = null;
  console.log(useAuth().isAuth);
  if (!useAuth().isAuth) {
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
  const revokeToken = () => {
          localStorage.removeItem("token");
          postApi.axiosInstance.defaults.headers["Authorization"] = "";
  }

  if (useAuth().isAuth) {
    logoutButton = (
      <Button
        className="login-button"
        onClick={() => {
          revokeToken();
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
