import Header from "../components/Header";
import Posts from "../components/Posts";

import '../App.css';

function Feed() {
  return (
    <div className="homepage" 
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Posts/>
    </div>
  );
}

export default Feed;