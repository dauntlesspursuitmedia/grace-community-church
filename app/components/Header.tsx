import { SiteConfigDocument } from "~/types/siteConfig";
import { LogoMark } from "./LogoMark";

export const Header = ({
  navigation,
}: {navigation: SiteConfigDocument["mainNavigation"]}) => {
  return (
    <header>
      <div>
        <LogoMark width={80} theme="light" />
        <pre>{JSON.stringify(navigation, null, 2)}</pre>
      </div>
    </header>
  );
};
