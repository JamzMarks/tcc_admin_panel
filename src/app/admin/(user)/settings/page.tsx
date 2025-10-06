import { PageTitle } from "@/components/ui/elements/PageTitle";
import { AccountSection } from "./components/AccountSection";
import { PreferencesSection } from "./components/PreferencesSection";

const SettingsPage = () => {

  return (
    <div className=" space-y-4">
      <PageTitle>
        Account Settings
      </PageTitle>
      <PreferencesSection/>
      <AccountSection/>

    </div>
  );
}

export default SettingsPage;
