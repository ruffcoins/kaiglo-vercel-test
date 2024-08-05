import { AccountLayoutProps } from "@/interfaces/layouts/accountLayout.interface";
import DesktopHeader from "@/components/shared/headers/DesktopHeader";

const AccountLayout: React.FC<AccountLayoutProps> = ({ children }) => {
  return (
    <main className="w-screen">
      <DesktopHeader />

      {children}
    </main>
  );
};
export default AccountLayout;
