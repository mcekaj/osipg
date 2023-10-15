import UploadImageMultiple from "@/components/Atoms/UploadImage/UpladImageMultiple";
import UploadImage from "@/components/Atoms/UploadImage/UploadImage";

const UploadRoute = () => {
    return (
        <div>
            <UploadImage endpoint="locations" imageKey="temlate" />
            <br/>
            <h2>Multiple upload</h2>
            {/* <UploadImageMultiple /> */}
        </div>
    )
}
export default UploadRoute;