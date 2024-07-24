import { NewspaperIcon } from "@/components/icons";
import LocaleSwitcher from "@/components/locale-switcher";
import MobileNavigationMenu from "@/components/navigation/mobile-navigation-menu";
import NavigationMenu from "@/components/navigation/navigation-menu";
import Link from "next/link";
import SummarizeModal from "../summarize-modal";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 shadow dark:bg-[#2a2b2e] dark:text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <NewspaperIcon className="w-6 h-6" />
          <span className="text-xl font-bold">Lazy News</span>
        </Link>
        <div className="flex items-center gap-4">
          <NavigationMenu />
          <SummarizeModal />
          <LocaleSwitcher />
          <MobileNavigationMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
