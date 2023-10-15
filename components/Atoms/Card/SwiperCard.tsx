import Link from "next/link";
import { SwiperCardProps } from "./SwiperCard.types";

const SwiperCard = ({ linkHref, linkTitle, title, bgImage }: SwiperCardProps) => {
  return (
    <div
      className="flex items-end justify-start rounded-md h-64 w-full p-5"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-3 text-white">
        <h1 className="text-2xl">{title}</h1>
        <Link href={linkHref}>{linkTitle}</Link>
      </div>
    </div>
  );
};
export default SwiperCard;
