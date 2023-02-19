import { Button, Text } from '@mantine/core';
import '../App.css';

function Header() {
  return (
    <div className="header">
    <Text size="lg" weight={700} sx={{ fontSize: '29px' }} className="header-text">
      HOP-OUT
    </Text>
    <div>
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