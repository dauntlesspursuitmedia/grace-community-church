import { Link, NavLink, useOutletContext } from "@remix-run/react";
import { ChevronDown } from "lucide-react";
import { SiteConfigDocument } from "~/types/siteConfig";
import { motion } from "framer-motion";
import { DropdownState } from "~/root";
import { cn } from "~/lib/misc";
export const DropdownMenu = ({
  items,
  id,
  parent = "",
	dropdownState,
	activeId,
	closeDropdown,
	changeDropdownState
}: {
  items?: SiteConfigDocument["mainNavigation"];
  id: string;
  parent?: string;
	dropdownState: DropdownState;
	activeId?: string;
	closeDropdown: () => void;
  changeDropdownState: (id: string) => void;
}) => {

  return (
    <>
      <button
        className={cn(
          dropdownState && dropdownState === "open" && activeId === id
            ? "rotate-180"
            : "rotate-0",
          "transition-transform text-white fill-white"
        )}
        onClick={() => changeDropdownState(id)}
        aria-pressed="false"
        aria-label="Toggle Dropdown Menu"
      >
        <ChevronDown />
      </button>
      {dropdownState === "open" && id === activeId ? (
        <motion.ul
          initial={{ opacity: 0 }}
					exit={{opacity:0, transition: {delay: .1}}}
          animate={{ opacity: 1 }}
          className="text-white shadow-md absolute right-0 top-8 bg-green-dark/60 bg-opacity-70 backdrop-blur-md w-max px-4 divide-y-2 py-2 "
        >
          {items?.map((navItem) => {
            const { externalLink, itemName, item } = navItem;
            return (
              <li className="py-2" key={navItem._key}>
                {externalLink ? (
                  <Link
                    target={"_blank"}
                    className="hover:text-yellow"
                    onClick={closeDropdown}
                    to={externalLink}
                    rel="noreferrer"
                  >
                    {itemName}
                  </Link>
                ) : (
                  <NavLink
                    onClick={closeDropdown}
                    className={({ isActive }) =>
                      cn(`hover:text-yellow`,isActive && "text-black font-bold" )
                    }
                    to={`${
                      parent !== "" && item?._type !== "route"
                        ? `/${parent}`
                        : ""
                    }/${navItem.item?.slug}`}
                  >
                    {itemName && itemName !== "" ? itemName : item?.title}
                  </NavLink>
                )}
              </li>
            );
          })}
        </motion.ul>
      ) : null}
    </>
  );
};
