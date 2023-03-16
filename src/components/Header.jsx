import {
  Button,
  // Text,
  // Title
} from '@mantine/core'
import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../images/outofthenestlogo.png'

function Header(props) {
  const navigate = useNavigate()

  return (
    <div className="header">
      <Link to={`/`} style={{ textDecoration: 'none' }}>
        <img src={logo} width="40%" alt="es-lint want to get" />
      </Link>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button onClick={() => navigate('/create')}>Create post</Button>
        <Button className="login-button">Login</Button>
        <Button className="login-button">Sign Up</Button>
      </div>
    </div>
  )
}

export default Header
