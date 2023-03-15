import { Button, Text, Title } from '@mantine/core';
import '../App.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import logo from "../images/outofthenestlogo.png"


function Header(props) {
  const navigate = useNavigate();

  return (
    <div className="header">
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <img src={logo} height="50vh"/>
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => navigate("/create")}>Create post</Button>
      </div>
    </div>
  );
}

export default Header;
