import { SiteConfigDocument } from "~/types/siteConfig";
import { LogoMark } from "./LogoMark";
import { Link, NavLink, useLocation } from "@remix-run/react";
import { cn } from "~/lib/misc";
import { useCycle, useMotionValueEvent, useScroll } from "framer-motion";

/**
 * Header component that renders the site header.
 * @param navigation - The main site navigation links
 */
export const Header = ({
  navigation,
	webcastInProgress,
}: {
  navigation: SiteConfigDocument["mainNavigation"];
	webcastInProgress?: boolean;
}) => {
  const { pathname } = useLocation();
	const [x, cycleX]= useCycle(0,100)
 const { scrollY} = useScroll()

 useMotionValueEvent(scrollY, "change", (latest) => {

	if(latest > 300) {
		cycleX(1)
	} else {
		cycleX(0)
	}
 })

  return (
    <header
      className={cn(
        "py-6 px-8 z-20 transition-colors duration-200 ease-in-out",
        pathname !== "/" && "bg-green-dark relative",
        pathname === "/" &&
          `fixed ${
            x === 0
              ? "backdrop-blur-lg bg-transparent border-b-[1px] border-white"
              : "bg-green-dark border-transparent shadow-black/50 shadow"
          }  w-full `
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
              className={({ isActive }) =>
                cn(
                  `text-white hover:text-yellow uppercase transition-colors duration-150 tracking-[1.6px] text-base`,
                  isActive &&
                    " font-bold hover:text-white border-b-2 border-green"
                )
              }
            >
              {link?.itemName ?? link?.item?.title}
            </NavLink>
          ))}
        </nav>
        <Link
          prefetch="intent"
          className="p-4 border-white border-[1px] text-white uppercase tracking-[1.6px] hover:bg-green hover:border-green transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md flex items-center gap-2"
          to="livestream"
        >
					{webcastInProgress && <span className="size-2 inline-block rounded-full animate-pulse duration-100 bg-[#ff2455]"></span>}
          Livestream
        </Link>
      </div>
    </header>
  );
};
