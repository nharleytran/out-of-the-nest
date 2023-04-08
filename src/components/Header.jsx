
import { Button, Text, Title } from "@mantine/core";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../components/Search";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import * as postApi from "../api";
import { clearAuth } from "../api/auth_util";
import logo from "../images/outofthenestlogo.png"
import { Avatar } from '@mantine/core';
import { getImagePathById } from "../api/image_api";


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
  let avatar = null;
  const hasToken = localStorage.getItem("token");
  if (!hasToken) {
    loginButton = (
      <Button className="login-button" onClick={() => navigate("/login")}>
        Login
      </Button>
    );
    signupButton = (
      <Button className="login-button" onClick={() => navigate("/user/create")}>
        Sign Up
      </Button>
    );
  }

  if (hasToken) {
    logoutButton = (
      <Button
        className="login-button"
        onClick={() => {
          clearAuth();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    );
    const imageURL=getImagePathById(localStorage.getItem("profile_image_id"));
    avatar = (<Avatar radius='xl' src={imageURL} href="/user/profile" component="a" alt="no image here" />);
  }


  return (
    <div className={`header ${isFeedPage ? "white" : "transparent"}`}>
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <img src={logo} width="35%" alt="es-lint want to get" />
      </Link>

      <div style={{ display: "flex", gap: "10px" }}>

        <Button onClick={() => navigate("/create")} style={{ background: "#4d4d8e", color: "white" }}>Create post</Button>
        {loginButton}
        {logoutButton}
        {signupButton}
        {avatar}

      </div>
    </div>
  )
}

export default Header
