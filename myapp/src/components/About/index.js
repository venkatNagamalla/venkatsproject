
import ReactPlayer from 'react-player'
import './index.css'

const About = () => <>
  <div className="about-route-container">
    <div className="about-container">
        <h1 className="about-heading">American Community Survey (ACS)</h1>
        <p className="about-text">The American Community Survey (ACS) helps local officials, community leaders, and businesses understand the changes taking place in their communities. It is the premier source for detailed population and housing information about our nation.</p>
    </div>
  <div className="react-player-container">
  <ReactPlayer height={250} width="100%" url="https://youtu.be/xux4_aeTJ3Y?si=M3mmn0-G4NB-cRAm"/>
  </div>
  </div>
</>

export default About