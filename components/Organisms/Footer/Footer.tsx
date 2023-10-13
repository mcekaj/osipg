import ContactIcon from "@/styles/assets/contactIcon.svg";
import FacebookIcon from "@/styles/assets/facebook.svg";
import GoogleIcon from "@/styles/assets/google.svg";
import InstaIcon from "@/styles/assets/insta.svg";
import LocationIcon from "@/styles/assets/locationIcon.svg";
import MailIcon from "@/styles/assets/mail.svg";
import TwitterIcon from "@/styles/assets/twitter.svg";
import Logo from "@/styles/assets/LogoWithoutBackground.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-blue-50 py-8 mt-10">
      <div className="container flex flex-col items-center gap-10 max-w-6xl mx-auto">
        <div className="flex justify-between w-full">
          <div className="flex flex-col items-center justify-between">
            <Logo />
            <p>© Copyright 2023</p>
          </div>
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
        <p className="text-center">
          Udruženje paraplegičara Podgorica je nevladina, humanitarna organizacija koja se bavi
          zaštitom prava lica sa invaliditetom. Udruženje je osnovano 20.02.2002. godine.
        </p>
        <div className="flex gap-12">
          <Link href="#">Korisni Linkovi</Link>
          <Link href="#">Važni telefoni</Link>
          <Link href="#">Taksi za OSI</Link>
          <Link href="#">Galerija</Link>
          <Link href="#">Arhiva</Link>
        </div>
        <div className="flex gap-10">
          <FacebookIcon />
          <GoogleIcon />
          <TwitterIcon />
          <InstaIcon />
        </div>
      </div>
    </div>
  );
};
export default Footer;
