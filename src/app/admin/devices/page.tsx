import {
  SectionWithHeader,
  SimpleSection,
} from "@/components/ui/sections/SimpleSection";
import { DeviceForm } from "./components/DeviceForm";
import { PageTitle } from "@/components/ui/elements/PageTitle";

const DevicesPage = () => {
  return (
    // <div className="space-y-4">
    //       <PageTitle>{t('title')}</PageTitle>
    //       <SectionWithHeader title={t('header')}>
    //         <div>
    //           <p className="text-gray-600">{t('description')}</p>
    //         </div>
    //       </SectionWithHeader>

    //       <SectionWithHeader title={t('UsersList.userList')}>
    //         <div className="space-y-4">

    //           <UsersTable/>
    //         </div>
    //       </SectionWithHeader>
    //     </div>
    <div className="space-y-4">
      <PageTitle>Devices</PageTitle>
      <SectionWithHeader title="Manage Devices">
        <div>{/* <p className="text-gray-600">{t('description')}</p> */}</div>
        <div className="space-y-4">
          <div>
            <p className="text-gray-600 mb-6">Select a device to register.</p>
          </div>
          <ul className="flex justify-evenly w-full text-md">
            <li>
              <button className="cursor-pointer">Camera</button>
            </li>
            <li>
              <button className="cursor-pointer">Traffic Light</button>
            </li>
          </ul>
          <DeviceForm></DeviceForm>
        </div>
      </SectionWithHeader>
    </div>
  );
};

export default DevicesPage;
