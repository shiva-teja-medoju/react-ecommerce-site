import React from "react";
import logo from "../../../assets/logos/AURA-logo.png";
import './LoadingSpinner.css'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-container">
    <img src={logo} alt="Loading..." className="spinner-image" />
    <p className="text">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;