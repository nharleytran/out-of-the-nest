import Header from "../components/Header";
import { Button } from '@mantine/core';
import '../App.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  return (
    <div className="homepage" 
    style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Button onClick={() => navigate("/create")}>Create post</Button>
    </div>
  );
}

export default Home;