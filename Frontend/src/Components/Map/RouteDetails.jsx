import React from "react";
import OriginStep from "../../assets/images/origin_step.svg";
import DestinationStep from "../../assets/images/destination_step.svg";

const RouteDetails = ({ route }) => {
  const steps = route?.legs[0]?.steps || [];
  return (
    <div className="route-details">
      <div className="summary">
        <p>Distance: {((route?.distance || 0) / 1000).toFixed(2)} km</p>
        <p>Duration: {((route?.duration || 0) / 60).toFixed(2)} min</p>
      </div>
      <div className="steps">
        {steps.map((step, idx) => (
          <div key={idx} className="step">
            <img src={idx === 0 ? OriginStep : DestinationStep} alt="Step" />
            <span>{step.name}</span>
            <span>{step.distance} m</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteDetails;
