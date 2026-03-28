"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { NavMain } from "./nav-main";
import { getPacks, type Pack } from "@/data/get-packs";
import { getCurrentUser } from "@/data/get-user";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  PackageSearch,
  Files,
  Tags,
  Settings,
  Users
} from "lucide-react";

// 👇 This block must be here, outside the component
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Documents & Files",
      url: "/dashboard/docs",
      icon: <Files />,
    },
    {
      name: "Tags & Links",
      url: "/dashboard/tags",
      icon: <Tags />,
    },
    {
      name: "Members",
      url: "/dashboard/members",
      icon: <Users />,
    },
    {
      name: "Settings",
      url: "/dashboard/settings",
      icon: <Settings />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; email: string; name: string; avatar: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packsResult, currentUser] = await Promise.all([
          getPacks(),
          getCurrentUser(),
        ]);

        if (packsResult.success && packsResult.data) {
          setPacks(packsResult.data);
        }

        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navMainItems = [
    {
      title: "Packs",
      url: "#",
      icon: <PackageSearch />,
      items: loading
        ? [{ title: "Loading...", url: "#" }]
        : packs.length === 0
          ? [{ title: "No packs found", url: "#" }]
          : packs.map((pack) => ({
            title: pack.name,
            url: `/dashboard/packs/${pack.id}`,
            description: pack.description,
          })),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? { name: "Guest", email: "", avatar: "" }} />      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}