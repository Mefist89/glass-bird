import './HomePage.css';
import logo from '../assets/logo.png';
import python from '../assets/python.png';
import network from '../assets/network.png';
import sql from '../assets/sql.png';

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="header">
        <img src={logo} alt="Glass Bird Logo" className="logo" />
        <h1>Welcome to Glass Bird!</h1>
        <p className="subtitle">Your gateway to mastering technical skills</p>
      </div>
      
      <div className="cardsContainer">
        <div className="card">
          <div className="cardIcon">
            <img src={python} alt="Python" />
          </div>
          <h3>Python</h3>
          <p>Prepare for your Python exam with our comprehensive practice tests.</p>
          <button className="cardButton">Learn More</button>
        </div>
        
        <div className="card">
          <div className="cardIcon">
            <img src={network} alt="Network" />
          </div>
          <h3>Network</h3>
          <p>Master networking concepts with our targeted exam preparation materials.</p>
          <button className="cardButton">Learn More</button>
        </div>
        
        <div className="card">
          <div className="cardIcon">
            <img src={sql} alt="SQL" />
          </div>
          <h3>SQL</h3>
          <p>Ace your SQL exam with our focused practice questions and tutorials.</p>
          <button className="cardButton">Learn More</button>
        </div>
        
        <div className="card">
          <h3>Comprehensive Practice Tests</h3>
          <p>Access hundreds of practice questions tailored to your exam objectives.</p>
          <button className="cardButton">Learn More</button>
        </div>
        
        <div className="card">
          <h3>Personalized Learning</h3>
          <p>Get customized study plans based on your progress and weak areas.</p>
          <button className="cardButton">Learn More</button>
        </div>
        
        <div className="card">
          <h3>Expert Support</h3>
          <p>Connect with industry experts and get your questions answered.</p>
          <button className="cardButton">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;