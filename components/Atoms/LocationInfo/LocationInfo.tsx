import ContactIcon from "@/styles/assets/contactIcon.svg";
import LocationIcon from "@/styles/assets/locationIcon.svg";
import MailIcon from "@/styles/assets/mail.svg";

const LocationInfo = () => {
  return (
    <div className="flex items-center justify-between gap-10">
      <div className="flex flex-col items-center justify-between">
        <LocationIcon />
        <p>Bulevar Svetog Petra Cetinjskog 9, Podgorica, Montenegro</p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <ContactIcon />
        <p>+38267449999</p>
        <p>+38267258643</p>
      </div>
      <div className="flex flex-col items-center justify-between">
        <MailIcon />
        <p>paraplegicaripg@gmail.com</p>
      </div>
    </div>
  );
};
export default LocationInfo;
