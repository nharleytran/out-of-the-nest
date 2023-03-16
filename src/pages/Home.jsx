import Header from '../components/Header'
import Path from '../components/Path'
import '../App.css'
import video from '../components/video/bac.mp4'

function Home() {
  return (
    <div
      className="homepage"
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="main">
        <div className="overlay"></div>
        <video src={video} autoPlay loop muted />
        <div className="content">
          <h1>Welcome !</h1>
          <p>Please pick your track</p>
        </div>
      </div>
      <Header />
      <Path />
    </div>
  )
}

export default Home
