import { Link, NavLink, useLocation } from "@remix-run/react";

import { useCycle, motion } from "framer-motion";
import { useScrollLock, useResizeObserver, useWindowSize } from "usehooks-ts";
import { Menu, X } from "lucide-react";
import { SiteConfigDocument } from "~/types/siteConfig";
import { Logo } from "./Logo";
import { useRef } from "react";
import { cn } from "~/lib/misc";

const ulVariants = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0.07, staggerDirection: 1 },
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const liVariants = {
  open: {
    y: 0,
    display: `block`,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    display: `none`,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const SidedrawerNavigation = ({
  items,
  handleMenuClose,
  webcastInProgress,
}: {
  items: SiteConfigDocument[`mainNavigation`];
  handleMenuClose: () => void;
  webcastInProgress?: boolean;
}) => {
  useScrollLock();

  return (
    <motion.nav
      id="scrollable"
      initial={{ width: 0 }}
      animate={{ width: 380 }}
      exit={{ width: 0, transition: { delay: 0.7, duration: 0.3 } }}
      className={cn(
        ` bg-cream fixed flex flex-col bottom-0 left-0 top-0 h-[100dvh] w-full max-w-sm overflow-y-auto z-50 shadow-md shadow-green`
      )}
    >
      <motion.div
        className={`relative mx-auto mb-10 mt-10 w-52 z-40`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.25 } }}
        exit={{ opacity: 0 }}
      >
        <NavLink to="/" onClick={() => handleMenuClose()}>
          <Logo theme="dark" />
        </NavLink>
      </motion.div>

      <motion.ul
        className="border-left-2 pointer-events-auto relative z-50 flex flex-col flex-grow gap-8 w-full  max-w-sm overflow-y-auto border-gray-500 px-4"
        variants={ulVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {items?.map((navItem) => {
          const { item, itemName, externalLink, _key, nestedRoutes } = navItem;
          return (
            <motion.li
              className="space-between relative mb-2  flex-wrap"
              variants={liVariants}
              key={_key}
            >
              {externalLink ? (
                <a
                  className="w-full"
                  href={externalLink}
                  onClick={() => handleMenuClose()}
                >
                  {itemName}
                </a>
              ) : (
                <NavLink
                  key={_key}
                  prefetch="intent"
                  onClick={() => handleMenuClose()}
                  className={({ isActive }) =>
                    cn(
                      `text-black w-full inline-block hover:text-yellow uppercase transition-colors duration-150 tracking-[1.6px] text-base`,
                      isActive &&
                        " font-bold hover:text-green text-green underline underline-offset-4"
                    )
                  }
                  to={item?.slug || ""}
                >
                  {itemName && itemName !== `` ? itemName : item?.title}
                </NavLink>
              )}
              {nestedRoutes && (
                <ul className="relative ml-8 ">
                  {nestedRoutes.map((nestedItem) => (
                    <li className="divide-y py-2" key={nestedItem?._key}>
                      {nestedItem?.externalLink ? (
                        <a
                          // onClick={() => toggleOpen()}
                          href={nestedItem?.externalLink || ``}
                        >
                          test
                        </a>
                      ) : (
                        <NavLink
                          prefetch="intent"
                          // onClick={() => toggleOpen()}
                          className={({ isActive }) =>
                            isActive
                              ? `primary-navigation--active`
                              : `link-focus flex  items-center rounded-xl px-2 text-blue-500 hover:text-red-500 dark:text-red-400	dark:hover:text-red-700`
                          }
                          to={`${
                            item?.slug !== `` &&
                            nestedItem?.item?._type !== `route`
                              ? `/${item?.slug}`
                              : ``
                          }/${nestedItem?.item?.slug}`}
                        >
                          {nestedItem?.item?.title || nestedItem?.itemName}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </motion.li>
          );
        })}
        {webcastInProgress && (
          <Link
            prefetch="intent"
            className="p-4 text-white uppercase tracking-[1.6px] bg-green hover:bg-green-light transition-colors shadow-sm duration-150 ease-in-out hover:shadow-md flex items-center gap-2"
            to="livestream"
            aria-disabled={!webcastInProgress}
          >
            <span className="size-2 inline-block rounded-full animate-pulse duration-100 bg-[#ff2455]"></span>
            Stream Now
          </Link>
        )}
      </motion.ul>
    </motion.nav>
  );
};
