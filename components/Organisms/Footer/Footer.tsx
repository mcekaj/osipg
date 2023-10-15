import FacebookIcon from "@/styles/assets/facebook.svg";
import GoogleIcon from "@/styles/assets/google.svg";
import InstaIcon from "@/styles/assets/insta.svg";
import TwitterIcon from "@/styles/assets/twitter.svg";
import Logo from "@/styles/assets/LogoWithoutBackground.svg";
import Link from "next/link";
import LocationInfo from "@/components/Atoms/LocationInfo/LocationInfo";

const Footer = () => {
  return (
    <div className="bg-blue-50 py-8 mt-10">
      <div className="container flex flex-col items-center gap-10 max-w-6xl mx-auto">
        <div className="flex  w-full justify-between">
          <div className="flex flex-col items-center justify-between">
            <Logo />
            <p>© Copyright 2023</p>
          </div>
          <LocationInfo />
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
