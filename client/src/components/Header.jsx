import { Button, Text, Title } from '@mantine/core';
import '../App.css';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Search from "../components/Search";
import Filter from "../components/FilterContent/Filter";
function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { query, setQuery, onFilterClick } = props;
  const isFeedPage = location.pathname ==='/feed'
  const searchComponent = isFeedPage ? <Search query={query} setQuery={setQuery}/> : null;
  const filterComponent = isFeedPage ? <Filter onFilterClick={onFilterClick}/> : null;

  return (
    <div className="header">
      <Link to={`/`} style={{ textDecoration: 'none' }}>
<<<<<<< HEAD
        <Title order={3}> Out of the <Text span c="blue" inherit>Nest</Text></Title>
=======
        <Title order={3}> OUT OF THE <Text span c="blue" inherit>NEXT</Text></Title>
>>>>>>> e0f54124a4295dffe3c36c9067cf58915292d881
      </Link>
      <div style={{ display: "flex", gap: "10px" }}>
          {searchComponent}

<<<<<<< HEAD
          {filterComponent}

=======
>>>>>>> e0f54124a4295dffe3c36c9067cf58915292d881
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