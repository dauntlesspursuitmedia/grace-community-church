import { PropsWithChildren } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import type { SiteConfigDocument } from "~/types/siteConfig";
import { useOutletContext } from "@remix-run/react";

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
      <main className="grow main-layout">
        {children}
        {/* <pre>{JSON.stringify(siteConfig, null, 2)}</pre> */}
      </main>
      <Footer {...rest} />

    </>
  );
};
