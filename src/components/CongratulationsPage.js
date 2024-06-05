import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

const CongratulationsPage = () => {
  // State to manage hover effects
  const [isHovered, setIsHovered] = useState({
    conditions: false,
    learnMore: false,
  });

  // Inline styles for links
  const linkStyle = (hovered) => ({
    color: 'red',
    textDecoration: hovered ? 'underline' : 'none',
    cursor: 'pointer',
  });

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1><FontAwesomeIcon icon={faTrophy} /> Congrats!</h1>
      <h6>Your $40 Costco Shop Card will be mailed to you.</h6>
      <p>Shop at Costco for electronics, computers, furniture, outdoor living appliances, jewelry, and more!</p>
      <p>Not a member? Not a problem - you can still use your Costco Shop Card to spend at your local warehouse.</p>
      <a
        href="#"
        style={linkStyle(isHovered.conditions)}
        onMouseEnter={() => setIsHovered({ ...isHovered, conditions: true })}
        onMouseLeave={() => setIsHovered({ ...isHovered, conditions: false })}
      >
        Conditions apply
      </a>

      <div style={{ marginTop: '30px' }}>
        <h2>Under $25?</h2>
        <p>Get no-fee everyday banking with CIBC Smart™ Start and earn $100.</p>
        <a
          href="#"
          style={linkStyle(isHovered.learnMore)}
          onMouseEnter={() => setIsHovered({ ...isHovered, learnMore: true })}
          onMouseLeave={() => setIsHovered({ ...isHovered, learnMore: false })}
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default CongratulationsPage;
