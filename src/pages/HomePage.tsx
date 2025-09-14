import './HomePage.css';
import logo from '../assets/logo.png';
import python from '../assets/python.png';
import network from '../assets/network.png';
import sql from '../assets/sql.png';

const HomePage = () => {
  return (
    <div className="home-page">
      <img src={logo} alt="Logo" />
      <h1>Welcome to Glass Bird!</h1>
      <div className="cards-container">
        <div className="card">
          <img src={python} alt="Python" />
          <h3>Python</h3>
          <p>Prepare for your Python exam with our comprehensive practice tests.</p>
          <button>Learn More</button>
        </div>
        <div className="card">
          <img src={network} alt="Network" />
          <h3>Network</h3>
          <p>Master networking concepts with our targeted exam preparation materials.</p>
          <button>Learn More</button>
        </div>
        <div className="card">
          <img src={sql} alt="SQL" />
          <h3>SQL</h3>
          <p>Ace your SQL exam with our focused practice questions and tutorials.</p>
          <button>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;