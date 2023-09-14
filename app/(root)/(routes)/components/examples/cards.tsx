import { ColorInspect } from "@/components/color-inspect";
import { DemoCookieSettings } from "./cards/cookie-settings";
import { DemoCreateAccount } from "./cards/create-account";
import { DemoDatePicker } from "./cards/date-picker";
import { DemoGithub } from "./cards/github-card";
import { DemoNotifications } from "./cards/notifications";
import { DemoPaymentMethod } from "./cards/payment-method";
import { DemoReportAnIssue } from "./cards/report-an-issue";
import { DemoShareDocument } from "./cards/share-documents";
import { DemoTeamMembers } from "./cards/team-members";

export const Cards = () => {
  return (
    <ColorInspect as="div">
      <div className="items-start justify-center gap-6 rounded-lg p-8 md:grid lg:grid-cols-2 xl:grid-cols-3">
        <ColorInspect>
          <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
            <DemoContainer>
              <DemoCreateAccount />
            </DemoContainer>
            <DemoContainer>
              <DemoPaymentMethod />
            </DemoContainer>
          </div>
        </ColorInspect>
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
    </ColorInspect>
  );
};

function DemoContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center [&>div]:w-full">
      {children}
    </div>
  );
}
