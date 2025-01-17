import React from "react";
import AutoCompleteInput from "../Input/AutoCompleteInput";

const AddressBox = ({
  originAddress,
  setOriginAddress,
  destinationAddress,
  setDestinationAddress,
}) => {
  return (
    <div className="address-controls">
      <AutoCompleteInput
        setAddress={setOriginAddress}
        placeName={originAddress.placeName}
        placeholder="Origin Address"
      />
      <AutoCompleteInput
        setAddress={setDestinationAddress}
        placeName={destinationAddress.placeName}
        placeholder="Destination Address"
      />
    </div>
  );
};

export default AddressBox;
