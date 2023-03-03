import Header from "../components/Header";
import Posts from "../components/Posts";

import '../App.css';
import { useLocation } from "react-router-dom";
function Feed() {
  const obj = useLocation();
  const categery_id = obj.state.category_id;
  console.log(categery_id)
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