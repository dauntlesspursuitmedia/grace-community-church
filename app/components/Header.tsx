import { SiteConfigDocument } from "~/types/siteConfig";
import { LogoMark } from "./LogoMark";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { cn } from "~/lib/misc";

/**
 * Header component that renders the site header.
 * @param navigation - The main site navigation links
 */
export const Header = ({
  navigation,
}: {
  navigation: SiteConfigDocument["mainNavigation"];
}) => {
  const { pathname } = useLocation();

  return (
    <header
      className={cn(
        "py-6 px-8 z-10",
        pathname === "/" ? "fixed backdrop-blur-lg bg-transparent border-b-[1px] border-white w-full" : "bg-green-dark relative"
      )}
    >
      <div className="container mx-auto flex  justify-between items-center">
        <Link to="/" prefetch="intent">
          <LogoMark width={80} theme="light" />
        </Link>
				<nav className="flex gap-6 ml-auto pr-12 ">
					{navigation?.map((link) => (
        <NavLink
          key={link._key}
          to={link?.item?.slug ?? ""}
          prefetch="intent"
          className={({isActive}) => cn(`text-white hover:text-yellow uppercase transition-colors duration-150 tracking-[1.6px] text-base`, isActive && " font-bold hover:text-white border-b-2 border-green")}
        >
          {link?.itemName ?? link?.item?.title}
        </NavLink>
      ))}

				</nav>
				<Link prefetch="intent" className="p-4 border-white border-[1px] text-white uppercase tracking-[1.6px] hover:bg-green hover:border-green transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md" to="livestream">Livestream</Link>

      </div>
    </header>
  );
};
