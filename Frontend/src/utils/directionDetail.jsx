// Render the detailed information about the route

export const renderDirectionDetail = (
  route,
  OriginStep,
  setMapCenter,
  DIRECTION_ARROWS,
  DestinationStep
) => {
  // if (_isEmpty(route)) return null;
  const steps = route?.legs[0]?.steps || [];
  return (
    <>
      <div className="summary-info">
        <div className="distance">
          <p>Distance</p>
          <p>{((route?.distance || 0) / 1000)?.toFixed(2)} km</p>
        </div>
        <div className="duration">
          <p>Duration</p>
          <p>{((route?.duration || 0) / 60)?.toFixed(2)} min</p>
        </div>
      </div>
      {steps?.length && (
        <div className="step-list">
          <div className="item">
            <div className="step-name">
              <img width={24} alt="Step icon" src={OriginStep} />
              <span>{steps[0]?.name}</span>
            </div>
            <span>{steps[0]?.distance} m</span>
          </div>
          {steps?.map((step, idx) => {
            if (idx === 0 || idx === steps.length - 1) return null;
            return (
              <div
                className="item"
                onClick={() => setMapCenter(step.maneuver.location)}
                key={idx}
              >
                <div className="step-name">
                  <img
                    width={24}
                    alt="Step icon"
                    src={DIRECTION_ARROWS[step.maneuver.modifier]}
                  />
                  <span>{step.name}</span>
                </div>
                <span>{step.distance} m</span>
              </div>
            );
          })}
          <div className="item">
            <div className="step-name">
              <img width={24} alt="Step icon" src={DestinationStep} />
              <span>{steps[steps?.length - 1]?.name}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
