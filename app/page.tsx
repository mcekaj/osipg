import MapLocator from "@/components/Organisms/MapLocator/MapLocator";
const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}locations`).then((res) => res.json());
  return res;
};
export default async function Home() {
  const data = await getData();
  if (!data) {
    return null;
  }
  return (
    <div>
      <MapLocator locations={data} />
    </div>
  );
}
