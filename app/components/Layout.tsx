import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { SiteConfigDocument } from "~/types/siteConfig";
import { useLocation, useOutletContext } from "@remix-run/react";
import { cn } from "~/lib/misc";

export type LayoutProps = PropsWithChildren<{
  siteConfig?: SiteConfigDocument;
  webcastInProgress?: boolean;
}>;

export const Layout = ({
  children,
  siteConfig,
  webcastInProgress,
}: LayoutProps) => {
  const { mainNavigation, ...rest } = siteConfig || {};

  return (
    <>
      <Header webcastInProgress={webcastInProgress} navigation={mainNavigation} />
      <main className={cn("grow main-layout", useLocation().pathname !== "/" && "mt-16")}>
        {children}
      </main>
      <Footer {...rest} />

    </>
  );
};
