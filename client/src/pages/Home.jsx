import Header from "../components/Header";
import Path from "../components/Path";

import '../App.css';

function Home() {
  return (
    <div className="homepage" 
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Path/>
    </div>
  );
}

export default Home;