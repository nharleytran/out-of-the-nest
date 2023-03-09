import { Button, Text, Title } from '@mantine/core';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <Title order={3}> OUT OF THE <Text span c="blue" inherit>NEXT</Text></Title>
      </Link>
      <div style={{ display: "flex", gap: "12px" }}>
          <Button onClick={() => navigate("/create")}>Create Post</Button>
          <Button color="teal">
          Sign Up
          </Button>
          <Button color="gray">
          Login
          </Button>
      </div>
    </div>
  );
}

export default Header;