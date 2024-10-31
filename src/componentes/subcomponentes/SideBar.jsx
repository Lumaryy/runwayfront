import { useState } from "react";
import { Icons } from "./Icons";

import { Link } from "react-router-dom";

import {
  ChartBarIcon,
  CogIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export const SideBar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const menuItems = [
    {
      title: "Dashboard",
      icon: ChartBarIcon,
      submenu: [{ title: "Home", path: "/home" }],
    },
    {
      title: "Solicitudes de pedidos",
      icon: DocumentIcon,
      submenu: [
        { title: "Solicitar Domicilio", path: "/solicitarpedidos" },
        { title: "Gestion de Pedidos", path: "/gestionpedidos" },
      ],
    },
    {
      title: "Novedades e incidencias",
      icon: ExclamationCircleIcon,
      submenu: [
        { title: "Reportar Novedad", path: "/reportarnovedad" },
        { title: "Reportar Incidencias", path: "/reportarincidencia" },
        { title: "Novedades", path: "/novedadesincidencias" },
      ],
    },

    {
      title: "Usuarios",
      icon: UserIcon,
      submenu: [
        { title: "Domiciliarios", path: "/messages/inbox" },
        { title: "Particulares", path: "/messages/sent" },
      ],
    },
    {
      title: "Panel de control",
      icon: CogIcon,
      submenu: [
        { title: "Usuarios", path: "/usuarios" },
        { title: "Domiciliarios", path: "/Domiciliarios" },
      ],
    },
  ];

  const toggleSubmenu = (index) => {
    setOpenMenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="w-64 min-h-screen bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Runway Domicilios
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-3">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              <button
                onClick={() => toggleSubmenu(index)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 
                ${
                  openMenus[index]
                    ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } transition-all duration-200 group`}
              >
                <div className="flex items-center space-x-3">
                  <Icons icon={item.icon} />
                  <span
                    className={`font-medium ${
                      openMenus[index] ? "text-blue-600 dark:text-blue-400" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
                <div
                  className={`transform transition-transform duration-200 
                ${openMenus[index] ? "rotate-180" : ""}`}
                >
                  {/*  <ChevronDown
                    className={`w-4 h-4 ${
                      openMenus[index]
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400"
                    }`}
                  /> */}
                </div>
              </button>

              {/* Submenu */}
              <div
                className={`transform transition-all duration-200 ease-in-out overflow-hidden
              ${
                openMenus[index]
                  ? "max-h-48 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
              >
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className="block pl-12 pr-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 
                    rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                    hover:text-blue-600 dark:hover:text-blue-400 
                    transition-colors duration-200"
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};
