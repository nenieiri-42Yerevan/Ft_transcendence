import React, { FC } from "react";
import classNames from "classnames";
import avatar from "@SRC_DIR/assets/images/avatar.png";
import { Link } from "react-router-dom";

interface Props {
  activeTab: string;
  userName?: string;
  avatarUrl?: string;
}

const Navigation: FC<Props> = ({ activeTab, userName, avatarUrl }) => {
  
  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Friends", path: "/friends" },
    { label: "Chat", path: "/chat" },
    { label: "Rules", path: "/rules" },
    { label: "Game", path: "/new-game" },
  ];

  avatarUrl = avatarUrl ?? avatar;
  userName = userName ?? "Undefined";

  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={classNames(
                "block mt-4 lg:inline-block lg:mt-0 text-white text-2xl hover:text-gray-500 mr-4",
                {
                  "font-bold": item.label === activeTab,
                  "opacity-50": item.label !== activeTab,
                }
              )}
              aria-disabled={item.label !== activeTab}
            >
              {item.label}
            </a>
          ))}
      </div>
      <a className="block mt-4 lg:inline-block lg:mt-0 text-white text-2xl hover:text-gray-500 mr-4 ml-auto">
            <img
                src={avatarUrl}
                alt={userName}
                className="rounded-full h-8 w-8"
              />
            </a>
          <Link to="/transcendence/user/profile" className="block mt-4 lg:inline-block lg:mt-0 text-white text-2xl hover:text-gray-500 mr-4 ml-auto">{userName}</Link>
      </div>
    </nav>
  );
};

export default Navigation;
