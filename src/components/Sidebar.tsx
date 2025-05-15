import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface NavItem {
  label: string;
  icon: string;
  url: string;
}

const navItems: NavItem[] = [
  {
    label: "Datos Personales",
    icon: "material-symbols:database-outline",
    url: "datos-personales",
  },
  { label: "Instructores", icon: "ph:chalkboard-teacher", url: "instructor" },
  {
    label: "Ofertas de Formación",
    icon: "material-symbols:menu-book-outline-rounded",
    url: "oferta-formacion",
  },
  {
    label: "Ingreso al FabLab",
    icon: "material-symbols:login-rounded",
    url: "ingreso-fablab",
  },
  {
    label: "Asistencia Instructores",
    icon: "material-symbols:list-alt-outline-rounded",
    url: "",
  },
  { label: "Certificados", icon: "lineicons:certificate-badge-1", url: "" },
  { label: "Reportes", icon: "material-symbols:docs-outline-rounded", url: "" },
  { label: "Datos", icon: "material-symbols:database-outline", url: "" },
];

export default function Sidebar() {
  const { auth, info } = useAuth();
  const { pathname } = useLocation();

  const currentItemPath = pathname.split("/")[2];
  const currentNavItem =
    currentItemPath?.length > 0
      ? navItems.find((item) => item.url === currentItemPath)
      : undefined;

  const [collapsed, setCollapsed] = useState(true);

  async function handleLogout() {
    await auth.signOut();
  }

  return (
    <>
      {!collapsed && (
        <div
          className="absolute top-0 left-0 h-screen w-screen bg-neutral-950 opacity-30"
          onClick={() => setCollapsed(true)}
        ></div>
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-10 w-full space-y-10 overflow-hidden bg-red-600 p-3 text-white transition-[height] lg:min-h-screen lg:transition-[width]",
          collapsed && "h-16 lg:w-16",
          !collapsed && "h-screen lg:w-64",
        )}
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon icon="mdi:menu" className="size-6" />
          </Button>

          <Popover>
            <PopoverTrigger
              className={cn(
                "cursor-pointer transition-opacity",
                collapsed && "lg:opacity-0",
              )}
            >
              <Icon icon="mingcute:user-4-fill" className="size-6" />
            </PopoverTrigger>
            <PopoverContent className="flex w-fit flex-col items-center">
              <p className="text-center font-bold">
                {info?.nombre
                  .split(" ")
                  .filter((_, i) => i === 0 || i === 2)
                  .join(" ")}
              </p>
              {info?.roles.map((rol) => {
                const roleMapping = new Map<typeof rol, string>();
                roleMapping.set("ROLE_ADMINISTRADOR", "Administrador");
                roleMapping.set("ROLE_INSTRUCTOR", "Instructor");
                roleMapping.set("ROLE_PARTICIPANTE", "Participante");

                return (
                  <p className="text-center text-sm">{roleMapping.get(rol)}</p>
                );
              })}

              <Separator className="my-4" />
              <Button variant="secondary" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </PopoverContent>
          </Popover>
        </div>
        <nav className="flex h-full flex-col items-start gap-4 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link to={item.url} key={index}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start has-[>svg]:p-0",
                  currentNavItem === item && "bg-neutral-100 text-neutral-900",
                  collapsed && "w-9",
                )}
                onClick={() => {
                  setCollapsed(true);
                }}
              >
                <Icon icon={item.icon} className="ml-[6px] size-6" />
                <span
                  className={cn(
                    "mr-[6px] overflow-hidden transition-opacity",
                    collapsed && "opacity-0",
                  )}
                >
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
