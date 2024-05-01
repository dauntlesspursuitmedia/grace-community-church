import { SiteConfigDocument } from "~/types/siteConfig";
import { LogoMark } from "./LogoMark";
import { Link, NavLink, useLocation, useOutletContext } from "@remix-run/react";

import { cn } from "~/lib/misc";
import {
  AnimatePresence,
  useCycle,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useWindowSize } from "usehooks-ts";
import { SidedrawerNavigation } from "./Sidedrawer";
import { Menu } from "lucide-react";
import { DropdownMenu } from "./menus/DropdownMenu";
import { DropdownState } from "~/root";
import { useState } from "react";
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
  const [x, cycleX] = useCycle(0, 100);
  const { scrollY } = useScroll();
  const { width = 0 } = useWindowSize();

  const [isOpen, toggleOpen] = useCycle(false, true);

	  const [dropdownState, setDropdownState] = useState<DropdownState>(`closed`);

    const [activeId, setActiveId] = useState<string>(``);

    const changeDropdownState = (id: string) => {
      activeId === id &&
        setDropdownState((currState: DropdownState) =>
          currState === `open` ? `closed` : `open`
        );
      setActiveId(id);
    };
    const closeDropdown = () => setDropdownState(`closed`);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      cycleX(1);
    } else {
      cycleX(0);
    }
  });


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
      <div className="container mx-auto flex @container gap-4 justify-between items-center">
        <Link to="/" className="w-12" prefetch="intent">
          <LogoMark className="w-12 @4xl:w-20" width={80} theme="light" />
        </Link>
        {width > 800 ? (
          <>
            <nav className=" w-full">
              <ul className="flex gap-6 ml-auto justify-end w-full">
                {navigation?.map((link) => (
                  <li key={link._key} className="relative flex items-center gap-px">
                    <NavLink
                      key={link._key}
                      to={link?.item?.slug ?? ""}
                      prefetch="intent"
                      onClick={() => closeDropdown()}
                      className={({ isActive }) =>
                        cn(
                          `text-white hover:text-yellow text-sm uppercase transition-colors duration-150 tracking-[1.6px] `,
                          isActive &&
                            " font-bold hover:text-white border-b-2 border-green"
                        )
                      }
                    >
                      {link?.itemName ?? link?.item?.title}
                    </NavLink>
                    {link.nestedRoutes && link?.nestedRoutes?.length > 0 && (
                      <DropdownMenu
												parent={link?.item?.slug}
												activeId={activeId}
												changeDropdownState={changeDropdownState}
												dropdownState={dropdownState}
												closeDropdown={closeDropdown}
                        id={link?._key}
                        items={link.nestedRoutes || []}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <Link
              prefetch="intent"
              className="p-4 border-white border-[1px] text-white uppercase tracking-[1.6px] hover:bg-green hover:border-green transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md flex items-center gap-2 text-sm @4xl:text-base "
              to="livestream"
            >
              {webcastInProgress && (
                <span className="size-2 inline-block rounded-full animate-pulse duration-100 bg-[#ff2455]"></span>
              )}
              Livestream
            </Link>{" "}
          </>
        ) : (
          <button
            className={`flex p-2 gap-2 text-white justify-center transition-colors items-center ring-white focus:text-yellow ring-2 focus:ring-yellow ring-offset-1 ring-offset-green-dark rounded-sm outline-none border-0`}
            onClick={() => {
              toggleOpen();
            }}
          >
            <span>
              <Menu />
            </span>
            Menu
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={() => toggleOpen()}
              className={`fixed left-0 bottom-0 top-0 z-0 h-[100dvh] w-full bg-black/25`}
            />

            <SidedrawerNavigation
              items={navigation}
              handleMenuClose={toggleOpen}
              webcastInProgress={webcastInProgress}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
