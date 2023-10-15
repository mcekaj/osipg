import SingleMapLocator from "@/components/Organisms/MapLocator/SingleMapLocator";
import useGetLocations from "@/hooks/useGetLocations/useGetLocations";
import LocationIcon from "@/styles/assets/locationIcon.svg";
import ContactIcon from "@/styles/assets/contactIcon.svg";
import Mailicon from "@/styles/assets/mail.svg";

const Page = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const { location } = await useGetLocations({
    slug: params.slug,
  });
  if (!location) return null;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex my-10 gap-10">
        <div className="flex flex-col gap-3 w-1/3">
          <h1 className="text-2xl">
            {location.name} {location.address}
            {location.postalNumber}
          </h1>
          <div className="flex gap-3">
            {location.accessibilityFeatures &&
              location.accessibilityFeatures.map((feature) => (
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/${feature?.relativeUrl}`}
                  height={50}
                  width={50}
                  alt={feature.name}
                />
              ))}
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5">
              <LocationIcon />
              <p>{location.address}</p>
            </div>
            <div className="flex items-center gap-5">
              <ContactIcon />
              <p>{location.phone}</p>
            </div>
            <div className="flex items-center gap-5">
              <Mailicon />
              <p>{location.email}</p>
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <SingleMapLocator
            style={{
              height: 500,
              width: "100%",
              borderRadius: 10,
            }}
            options={{
              icon: {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${location.category.relativeUrl}`,
              },
            }}
            position={{
              lat: location.latitude,
              lng: location.longitude,
            }}
          />
        </div>
      </div>
      <div className="my-10">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/${location.thumbnailUrl}`}
          className="h-96 mx-auto"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: location.description }} />
    </div>
  );
};
export default Page;
