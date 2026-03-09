import { User } from "@/types/user";
import { MenuItem } from "@/types/menu";
import {
  Shield,
  CarTaxiFront,
  PrinterCheck,
  LayoutDashboard,
  BadgeDollarSign,
  FolderTree,
  Users,
  CheckCircle2,
  HandHelping,
} from "lucide-react";
import { useAuthContext } from "@/context/AuthClientProvider";
import { rolePermissions } from "@/config/roles";

const useAppData = () => {
  const { user, avatar } = useAuthContext();

  // Gather all allowed routes from user roles
  const allowedRoutes =
    user?.roles?.flatMap((role) => {
      return rolePermissions[role.id]?.permissions || [];
    }) || [];

  const data: {
    user: User;
    navMain: MenuItem[];
  } = {
    user: {
      id: user?.id || "",
      phoneNumber: user?.phoneNumber || "",
      roles: user?.roles || [],
    },
    navMain: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User",
        href: "/users",
        icon: Users,
      },
      {
        title: "Roles",
        href: "/roles",
        icon: Shield,
      },
      {
        title: "Handover",
        href: "/handover",
        icon: HandHelping,
      },
      {
        title: "Approver",
        href: "/approver",
        icon: CheckCircle2,
      },
      {
        title: "Driver",
        href: "/driver",
        icon: CarTaxiFront,
      },
      {
        title: "Penalty",
        href: "/penalty",
        icon: BadgeDollarSign,
      },
      {
        title: "Penalty Type",
        href: "/penaltytype",
        icon: FolderTree,
      },
    ],
  };

  // Filter navMain based on permissions
  data.navMain = data.navMain.filter((item) => {
    if (!item.children) {
      const key = item.href.replace("/", "") || "dashboard";
      return allowedRoutes.includes(key);
    }

    item.children = item.children.filter((child) =>
      allowedRoutes.includes(child.href.replace("/", ""))
    );

    return (
      item.children.length > 0 ||
      allowedRoutes.includes(item.href.replace("/", ""))
    );
  });

  return data;
};

export default useAppData;
