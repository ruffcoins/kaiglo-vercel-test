import Image from "next/image";
import KaigloLogo from "@/public/images/logo.svg";
import Link from "next/link";

const Logo = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className="min-w-[148px]">
      <Image src={KaigloLogo} alt="kaiglo logo" className={className} />
    </Link>
  );
};
export default Logo;
