import { Button, Text } from '@mantine/core';
import '../App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Search from "../components/Search";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery } = props;

  const isFeedPage = location.pathname ==='/feed'
  const searchComponent = isFeedPage ? <Search query={query} setQuery={setQuery}/> : null;

  return (
    <div className="header">
    <Text size="lg" weight={700} sx={{ fontSize: '29px' }} className="header-text">
      Out of the Nest
    </Text>
    <div style={{ display: "flex", gap: "10px" }}>
        {searchComponent}

        <Button onClick={() => navigate("/create")}>Create post</Button>
        <Button className="login-button">
        Login
        </Button>
        <Button className="login-button">
        Sign Up
        </Button>
    </div>
    </div>
  );
}

export default Header;