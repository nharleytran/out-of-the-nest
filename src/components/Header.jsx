import { Button, Text, Title } from "@mantine/core";
import "../App.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Search from "../components/Search";
function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery, onFilterClick } = props;
  const isFeedPage = location.pathname === "/feed";
  const searchComponent = isFeedPage ? (
    <Search query={query} setQuery={setQuery} />
  ) : null;

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
        <Button className="login-button" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button
          className="login-button"
          onClick={() => navigate("/user/create")}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Header;