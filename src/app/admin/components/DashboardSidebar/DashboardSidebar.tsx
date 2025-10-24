"use client";
import { DarshBoardFunctions } from "./DashboardFunctions";
import {
  Boxes,
  Cctv,
  ExternalLink,
  FolderCog,
  House,
  Map,
  ScrollText,
  Siren,
  SquareChevronRight,
  Users,
  Video,
} from "lucide-react";

import { ThemeButtons } from "./ThemeButtons";
import { useTranslations } from "next-intl";
import { LinkItem } from "@/components/ui/link/LinkItem";
import { useUI } from "@/context/ui-context";

export const DashboardSidebar = () => {
  const { isSidebarOpen } = useUI();
  const t = useTranslations("SideBar");

  return (
    <div
      className={`
        fixed top-[80px] left-0 z-[50] h-[calc(100dvh-80px)] w-screen sm:w-[240px] p-4
        space-y-6 overflow-y-auto transition-all duration-300 ease-in-out
        bg-white dark:bg-background-dark lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto
        ${
          isSidebarOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "-translate-x-full opacity-0 pointer-events-none"
        }
          dark:border-0
      `}
    >
      <nav className="flex flex-col justify-between h-full">
        <div className="grid gap-4">
          <DarshBoardFunctions title={"Dashboard"}>
            <LinkItem linkTo="/admin">
              <House />
              {t("Dashboard")}
            </LinkItem>
          </DarshBoardFunctions>

          <DarshBoardFunctions title={t("Integration")}>
            <LinkItem linkTo={"#"}>
              <FolderCog />
              <div className="flex gap-1 items-center">
                <p>{t("Documentation")}</p>
                <ExternalLink className="w-3" />
              </div>
            </LinkItem>
            <LinkItem linkTo="/admin/apis">
              <SquareChevronRight />
              {t("API")}
            </LinkItem>
          </DarshBoardFunctions>
          <DarshBoardFunctions title={"Devices"}>
            <LinkItem linkTo="/admin/camera">
              <Cctv />
              {t("Camera")}
            </LinkItem>
            <LinkItem linkTo="/admin/trafficlight">
              <Siren />
              {t("Trafficl")}
            </LinkItem>
          </DarshBoardFunctions>
          <DarshBoardFunctions title={"Services"}>
            <LinkItem linkTo="/admin/packs">
              <Boxes />
              {t("Packs")}
            </LinkItem>
            <LinkItem linkTo="/admin/graph">
              <Map />
              {t("Graph")}
            </LinkItem>
          </DarshBoardFunctions>

          <DarshBoardFunctions title={t("Admin")}>
            <LinkItem linkTo="/admin/users">
              <Users />
              {t("Users")}
            </LinkItem>
            <LinkItem linkTo="/admin/auditlogs">
              <ScrollText />
              {t("AuditLogs")}
            </LinkItem>
          </DarshBoardFunctions>
        </div>

        <ThemeButtons />
      </nav>
    </div>
  );
};
