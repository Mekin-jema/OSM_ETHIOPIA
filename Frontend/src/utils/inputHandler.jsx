// Render the address input boxes
import AutoCompleteInput from "../Components/Input";
export const renderAddressBox = (
  originAddress,
  destinationAddress,
  setDesitinationAddress,
  setOriginAddress,
  handleManualOriginAddressInputChange,
  handleManualDestinationAddressInputChange
) => (
  <>
    <div className="address-controls">
      <div className="address-control">
        <span className="origin-circle"></span>
        <AutoCompleteInput
          setAddress={setOriginAddress}
          onManualInputChange={handleManualOriginAddressInputChange}
          placeName={originAddress.placeName}
          placeholder="Origin address"
        />
      </div>
      <div className="address-control">
        <span className="destination-circle"></span>
        <AutoCompleteInput
          setAddress={setDesitinationAddress}
          onManualInputChange={handleManualDestinationAddressInputChange}
          placeName={destinationAddress.placeName}
          placeholder="Destination address"
        />
      </div>
    </div>
  </>
);
