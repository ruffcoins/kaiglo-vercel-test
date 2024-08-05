import Logo from "@/components/shared/Logo";
import Playstore from "@/public/images/playstore.svg";
import Appstore from "@/public/images/appstore.svg";
import Facebook from "@/public/images/facebook.svg";
import Instagram from "@/public/images/instagram.svg";
import X from "@/public/images/x.svg";
import Youtube from "@/public/images/youtube.svg";
import Telegram from "@/public/images/telegram.svg";
import PaymentMethods from "@/public/images/payment-methods.svg";
import { PageLinks, SocialMediaLinks } from "@/constants/links";
import {
  footerMenuColumn1,
  footerMenuColumn2,
  footerMenuColumn3,
} from "@/constants/menu";
import Image from "next/image";
import Link from "next/link";
import BottomNav, { BottomNavProps } from "@/components/shared/BottomNav";

const Footer = ({ allowCTA }: BottomNavProps) => {
  return (
    <>
      <footer className="lg:mb-0 mb-[4.5rem]">
        <div className="px-5 py-8 mx-auto bg-white lg:px-8 xl:px-14">
          <div className="flex flex-col justify-between space-y-8 lg:flex-row lg:space-y-0">
            {/* Column 1 */}
            <div className="space-y-5">
              <Logo className="w-32" />
              <ul className="flex flex-col space-y-4">
                {footerMenuColumn1.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm lg:font-medium text-kaiglo_grey-base"
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <h3 className="font-bold">Customer Service</h3>
              <ul className="flex flex-col space-y-4">
                {footerMenuColumn2.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm lg:font-medium text-kaiglo_grey-base"
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-bold">Make Money with us</h3>
                <ul className="flex flex-col space-y-4">
                  {footerMenuColumn3.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm lg:font-medium text-kaiglo_grey-base"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile apps */}
              <div className="space-y-4">
                <h3 className="font-bold">Get our mobile App</h3>
                <div className="flex space-x-4">
                  <Link href={PageLinks.playstore}>
                    <Image
                      src={Playstore}
                      alt="download on playstore"
                      className="w-36 lg:w-full"
                    />
                  </Link>
                  <Link href={PageLinks.appstore}>
                    <Image
                      src={Appstore}
                      alt="download on appstore"
                      className="w-36 lg:w-full"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="font-bold">Follow Us</h3>
                <div className="flex items-center space-x-5">
                  <Link href={SocialMediaLinks.facebook} target="_blank">
                    <Image src={Facebook} alt="facebook icon" />
                  </Link>
                  <Link href={SocialMediaLinks.x} target="_blank">
                    <Image src={X} alt="x icon" />
                  </Link>
                  <Link href={SocialMediaLinks.instagram} target="_blank">
                    <Image src={Instagram} alt="instagram icon" />
                  </Link>
                  <Link href={SocialMediaLinks.youtube} target="_blank">
                    <Image src={Youtube} alt="youtube icon" />
                  </Link>
                  <Link href={SocialMediaLinks.telegram} target="_blank">
                    <Image src={Telegram} alt="telegram icon" />
                  </Link>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold">Payment Methods</h3>
                <Image src={PaymentMethods} alt="payment methods" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-5 py-3 text-xs bg-kaiglo_grey-50 lg:font-medium lg:text-sm md:h-16">
          <p className="font-normal text-center text-kaiglo_grey-base lg:font-medium">
            Copyright © {new Date().getFullYear()} KAIGLO STORES LIMITED. All
            Rights Reserved. User Agreement
            <span className="font-medium text-kaiglo_info-base">
              <Link href={PageLinks.privacyPolicy}>, Privacy and Cookies</Link>
            </span>
          </p>
        </div>
      </footer>

      <BottomNav allowCTA={allowCTA} />
    </>
  );
};

export default Footer;
