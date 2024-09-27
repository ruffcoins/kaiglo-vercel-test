import { HomepageLayoutProps } from "@/interfaces/layouts/homepageLayout.interface";
import Header from "@/components/layouts/Homepage/Header";
import Footer from "@/components/layouts/Homepage/Footer";

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
  return (
    <main className="w-screen overflow-hidden">
      <Header />

      <div className="relative mt-[8.3rem] lg:mt-40">{children}</div>

      <Footer allowCTA={false} />
    </main>
  );
};

export default HomepageLayout;
