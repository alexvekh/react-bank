import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page">
      <h1>Welcome to Our Website</h1>
      <img
        src="https://example.com/your-image.jpg" // Replace with your image URL
        alt="Welcome Image"
        className="welcome-image"
      />
      <p>We are excited to have you here!</p>
      <div className="button-container">
        <button className="button-primary">Get Started</button>
        <button className="button-secondary">Learn More</button>
      </div>
    </div>
  );
};

export default WelcomePage;
