import { Button, Text } from '@mantine/core';
import '../App.css';

function Header() {
  return (
    <div className="header">
    <Text size="lg" weight={700} sx={{ fontSize: '29px' }} className="header-text">
      HopOut Forum
    </Text>
    <Button className="login-button">
      Login
    </Button>
    </div>
  );
}

export default Header;