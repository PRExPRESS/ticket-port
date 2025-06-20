"use client";

import {
  Bars3Icon,
  MoonIcon,
  PowerIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Navbar from "../navbar/Navbar";
import MobileNavbar from "../MobileNavbar";
import { useAuth } from "@/context/AuthContext";

const Topbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const username = "John Doe";
  const letter = username.charAt(0);
  const { isAuthenticated, logout } = useAuth();
  //const isAuthenticated = true;
  

  return (
    <div className="w-full  dark:bg-background  border-b dark:border-gray-200/10 flex flex-row items-center justify-between  p-4 shadow">
      <Link href={"/"} className="flex flex-row items-center md:w-2/12">
        <div className="">
          <Image
            src={"/imgs/logo/logo.png"}
            width={30}
            height={30}
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span className="text-2xl font-fira font-bold text-primary dark:text-primary-foreground">
          Ticket Port
        </span>
      </Link>
      <Navbar />
      <div className="hidden md:flex flex-row items-center justify-evenly w-4/12 text-foreground gap-4">
        <Link
          href={"/organizer/events/create-event"}
          className="bg-button-accent  hover:bg-hoverEffects-gold text-primary-foreground text-[16px] font-bold px-4 py-2 rounded-md"
        >
          Create Event
        </Link>
        <span onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <SunIcon className="w-6  h-6  text-white cursor-pointer hover:text-accent" />
          ) : (
            <MoonIcon className="w-6  h-6  text-text-light cursor-pointer hover:text-accent" />
          )}
        </span>
        <Link
          href={`/explore-events`}
          className="text-[16px] font-bold  hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto"
        >
          Explore Events
        </Link>
        <Link
          href={`/my-tickets`}
          className="text-[16px] font-bold  hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto"
        >
          My Tickets
        </Link>
        {isAuthenticated ? (
          <span
            className="text-[16px] font-bold  hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto"
            onClick={logout}
          >
            Logout
          </span>
        ) : (
          <Link
            href={`/auth/login`}
            className="text-[16px] font-bold  hover:text-hoverEffects-gold dark:hover:text-hoverEffects-gold font-roboto"
          >
            Login
          </Link>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col justify-center items-center w-full h-full bg-white">
          <MobileNavbar
            username={username}
            logout={logout}
            close={(): void => setIsOpen(false)}
          />
        </div>
      )}
      <div className="md:hidden block">
        <Bars3Icon className="w-6 h-6" onClick={() => setIsOpen(!isOpen)} />
      </div>
    </div>
  );
};

export default Topbar;
