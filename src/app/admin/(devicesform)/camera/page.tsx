import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { CameraForm } from "./components/CameraForm";
import CamerasTable from "./components/CameraTable";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { List } from "lucide-react";
import { useTranslations } from "next-intl";


const CameraPage = () => {
    const t = useTranslations('')
    return (
        <div className="space-y-4">
            <PageTitle>
                Camera
            </PageTitle>
            <SectionWithHeader title="New Camera">
                <p>Create a camera</p>
                <CameraForm/>
            </SectionWithHeader>
            <SectionWithHeader title="Registered Cameras" Icon={List}>
                <CamerasTable/>
            </SectionWithHeader>
        </div>
    )
}

export default CameraPage;