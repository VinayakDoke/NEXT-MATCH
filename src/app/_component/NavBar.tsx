"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from 'next/link'
import NavLink from "./NavLink";
import { Session } from "next-auth";
import { signOut } from "@/auth";
import UserSession from "./UserSession";
import { useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
type Props = {
  user: Session['user'] | null
}

export default function NavBar({ user }: Props) {
  const router = useRouter();
  const handleSignOut = async () => {

    await signOut(); // Perform sign-out action
    router.push("/auth/login"); // Redirect user to login page after sign-out
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar
      className="bg-gradient-to-r from-purple-400 to-purple-700 "
      isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand  >
          <span className="text-white">
            <AcmeLogo /></span>
          <p className="font-bold text-white">ACME</p>
        </NavbarBrand>
        <NavLink url={'/members'} lable="Matches" />
        <NavLink url={'/lists'} lable="Lists" />
        <NavLink url={'/message'} lable="Message" />

      </NavbarContent>

      <NavbarContent justify="end">


        {/* <NavbarItem> */}
        {
          user ? <UserMenu user={user} /> : <>  <NavbarItem className="hidden lg:flex text-white">
            <Link href="/auth/login">Login</Link>
          </NavbarItem>
            <NavbarItem>
              <Button as={Link} variant="bordered" href="/auth/register" className="text-white">
                Sign Up
              </Button>
            </NavbarItem></>
        }

        {/* </NavbarItem> */}
        {/* <NavbarItem>
          <Button as={Link} variant="bordered" href="/auth/logout" className="text-white">
            Sign Out
          </Button>
        </NavbarItem> */}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className={`w-full ${index === 2
                ? "text-warning"
                : index === menuItems.length - 1
                  ? "text-danger"
                  : "text-foreground"
                } text-lg`}
              href="#"

            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

