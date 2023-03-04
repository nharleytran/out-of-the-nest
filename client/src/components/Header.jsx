import { Button, Text } from '@mantine/core';
import '../App.css';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
    <Text size="lg" weight={700} sx={{ fontSize: '29px' }} className="header-text">
      Out of the Nest
    </Text>
    <div style={{ display: "flex", gap: "10px" }}>
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