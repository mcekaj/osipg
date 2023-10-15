import Link from "next/link";
import { SwiperCardProps } from "./SwiperCard.types";
import { twMerge } from "tailwind-merge";

const SwiperCard = ({ linkHref, linkTitle, title, bgImage, className }: SwiperCardProps) => {
  return (
    <div
      className={twMerge(`flex items-end justify-start rounded-md h-64 w-full p-5 ${className}`)}
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
