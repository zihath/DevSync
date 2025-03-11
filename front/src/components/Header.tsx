import LogoContainer from "./LogoContainer";
import { HeaderRoutes } from "../lib/helper";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import ContainerComponent from "./ContainerComponent";
import { UserButton } from "@clerk/clerk-react";
import { ThemeToggle } from "@/components/ThemeToggle";
export default function App() {
  return (
    <header className="w-full border-b-[1px] border-gray-600 bg-black text-white">
      <ContainerComponent>
        <div className="flex items-center gap-6 relative">
          <LogoContainer />
          <ul className="flex gap-6">
            {HeaderRoutes.map((route) => (
              <li key={route.href}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "text-base text-white",
                      isActive && "text-white font-semibold"
                    )
                  }
                  to={route.href}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center ml-auto mr-4 border border-gray-300 rounded-md">
            <UserButton />
            <ThemeToggle />
          </div>
        </div>
      </ContainerComponent>
    </header>
  );
}
