import Header from "../components/Header";
import Path from "../components/Path";
// import { Button } from '@mantine/core';
import '../App.css';
import { useNavigate } from 'react-router-dom';


function Home() {
  // const navigate = useNavigate();
  return (
    <div className="homepage" 
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Path/>
      {/* <Button onClick={() => navigate("/create")}>Create post</Button> */}
    </div>
  );
}

export default Home;