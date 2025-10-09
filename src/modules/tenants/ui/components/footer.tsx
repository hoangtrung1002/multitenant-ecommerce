import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const Footer = () => {
  return (
    <footer className="font-medium bg-white border-t">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full gap-2 px-4 py-6 lg:px-12">
        <p>Powered by</p>
        <Link href="/">
          <span className={(cn("text-2xl font-semibold"), poppins.className)}>
            funroad
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
