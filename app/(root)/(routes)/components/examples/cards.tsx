import { DemoCookieSettings } from "./cookie-settings";
import { DemoCreateAccount } from "./create-account";
import { DemoDatePicker } from "./date-picker";
import { DemoGithub } from "./github-card";
import { DemoNotifications } from "./notifications";
import { DemoPaymentMethod } from "./payment-method";
import { DemoReportAnIssue } from "./report-an-issue";
import { DemoShareDocument } from "./share-documents";
import { DemoTeamMembers } from "./team-members";

export const Cards = () => {
  return (
    <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3 z-10">
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1 z-20">
        <DemoContainer>
          <DemoCreateAccount />
        </DemoContainer>
        <DemoContainer>
          <DemoPaymentMethod />
        </DemoContainer>
      </div>

      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <DemoContainer>
          <DemoTeamMembers />
        </DemoContainer>
        <DemoContainer>
          <DemoShareDocument />
        </DemoContainer>
        <DemoContainer>
          <DemoDatePicker />
        </DemoContainer>
        <DemoContainer>
          <DemoNotifications />
        </DemoContainer>
      </div>

      <div className="col-span-2 grid items-start gap-6 lg:col-span-2 lg:grid-cols-2 xl:col-span-1 xl:grid-cols-1">
        <DemoContainer>
          <DemoReportAnIssue />
        </DemoContainer>
        <DemoContainer>
          <DemoGithub />
        </DemoContainer>
        <DemoContainer>
          <DemoCookieSettings />
        </DemoContainer>
      </div>
    </div>
  );
};

function DemoContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center [&>div]:w-full">
      {children}
    </div>
  );
}
