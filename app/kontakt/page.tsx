import AppButton from "@/components/Atoms/AppButton/AppButton";
import AppInput from "@/components/Atoms/AppInput/AppInput";
import LocationInfo from "@/components/Atoms/LocationInfo/LocationInfo";
import SingleMapLocator from "@/components/Organisms/MapLocator/SingleMapLocator";

const Contact = () => {
  return (
    <div>
      <h1 className="my-10 text-center text-5xl">Kontaktirajte nas</h1>
      <div className="max-w-3xl mx-auto my-10">
        <LocationInfo />
      </div>
      <div className="bg-lightBlue">
        <div className="flex items-center gap-20">
          <SingleMapLocator
            style={{
              height: 500,
              width: "50%",
            }}
            position={{
              lat: 42.44158353919331,
              lng: 19.254500037648,
            }}
            options={{}}
          />
          <form className="max-w-4xl flex flex-col gap-6">
            <div className="flex gap-6">
              <AppInput name="name" placeholder="Ime" />
              <AppInput name="lastName" placeholder="Prezime" />
            </div>
            <AppInput name="email" placeholder="Email adresa" />
            <AppInput name="message" placeholder="Poruka" />
            <AppButton>Pošalji</AppButton>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;
