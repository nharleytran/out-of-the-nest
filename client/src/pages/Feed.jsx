import Header from "../components/Header";
import Posts from "../components/Posts";
import Search from "../components/Search";
import '../App.css';
import { useLocation } from "react-router-dom";

function Feed() {
  const obj = useLocation();
  const category_id = obj.state.category_id;

  return (
    <div className="homepage" 
    style={{
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover"
    }}>
      <Header/>
      <Search/>
      <Posts category_id={category_id}/>
    </div>
  );
}

export default Feed;