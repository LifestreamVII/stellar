import {useState} from 'react'
import css from "~/styles/setup.css";

export function links() {
  return [
    { rel: "stylesheet", href: css },
  ]
}


const setup = () => {
  const [selectedCard, setSelectedCard] = useState(2);
  
  const toggleSelected = (index) => {
    setSelectedCard(selectedCard === index ? null : index);
  };

  return (
    <div>
    <div className="container mt-l u__align--center">
      <h1 className="stellar-title">What do you plan on using Stellar for ?</h1>
      <p className="stellar-description">This information will be used to offer you a more personalized experience and interface out of the box.</p>
    </div>
    <div className="card-scroll-container container-fluid u__align--center">
        {/* Repeat for each grid item */}
        <div 
        key={1}
        className={`card ${selectedCard === 1 ? 'selected' : ''}`}
        onClick={() => toggleSelected(1)}
        >
          <div className="stellar-icon-bg">
            <img src="https://placehold.co/200x200" alt="Music note icon with a vibrant gradient background" className="stellar-icon" />
          </div>
          <h2 className="stellar-subtitle">CREATE</h2>
          <p className="stellar-text">This is the right option for artists who want to register on the platform and upload their content.</p>
        </div>
        <div
          key={2}
          className={`card ${selectedCard === 2 ? 'selected' : ''}`}
          onClick={() => toggleSelected(2)}
        >
          <div className="stellar-icon-bg">
            <img src="https://placehold.co/200x200" alt="Music note icon with a vibrant gradient background" className="stellar-icon" />
          </div>
          <h2 className="stellar-subtitle">LISTENING</h2>
          <p className="stellar-text">If you don't plan on creating content on the platform and you only seek to support artists and listen to their music, this choice is best for you.</p>
        </div>
        <div
            key={3}
            className={`card ${selectedCard === 3 ? 'selected' : ''}`}
            onClick={() => toggleSelected(3)}
        >
          <div className="stellar-icon-bg">
            <img src="https://placehold.co/200x200" alt="Music note icon with a vibrant gradient background" className="stellar-icon" />
          </div>
          <h2 className="stellar-subtitle">GUEST MODE</h2>
          <p className="stellar-text">If you're new here and just wanna have a glimpse of all the features Stellar has to offer, choose this option.</p>
        </div>
    </div>
    <div className="stellar-more-info u__align--center">
      <a href="#" className="stellar-link">Click here to learn more →</a>
    </div>
    {/* <div className="stellar-navigation">
      <i className="fas fa-chevron-left stellar-nav-icon"></i>
      <div className="stellar-nav-dot active"></div>
      <div className="stellar-nav-dot"></div>
      <div className="stellar-nav-dot"></div>
      <div className="stellar-nav-dot"></div>
      <i className="fas fa-chevron-right stellar-nav-icon"></i>
    </div> */}
  </div>
  )
}

export default setup