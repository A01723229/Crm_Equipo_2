"use client";

import { useUser } from '../context/UserContext';
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Icons */
import { IoMenuOutline, IoHome, IoPeopleSharp } from "react-icons/io5";
import { BiSolidFileBlank, BiSolidDollarCircle } from "react-icons/bi";

export default function Navigation() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isUser = user?.isLogin;

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-gray-200 h-16 flex items-center justify-between px-6 shadow-md z-40">
        <div className="p-12 text-lg text-gray-800 font-semibold"> {isUser ? `${user.company}` : '@ Your Company'} </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <Link href="/login" className="flex items-center w-full z-50">
              <div className="flex flex-col items-end">
                <div className="text-sm text-gray-800 font-medium">{isUser ? `${user.sellerName}` : 'Log in'}</div>
                <div className="text-xs text-gray-800">{isUser ? `${user.role}` : ''}</div>
              </div>
            </Link>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div> {/* Placeholder for user avatar */}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen bg-gray-200 flex flex-col items-center shadow-lg z-50 transition-all duration-300 ${
          isExpanded ? "w-48" : "w-16"
        }`}
      >
        {/* Menu Toggle Button */}
        <div className="p-5 bg-gray-800 w-full h-16 flex items-center">
          <button className="flex items-center" onClick={() => setIsExpanded(!isExpanded)}>
            <IoMenuOutline className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-2 flex flex-col space-y-6 w-full">
          {/* Home */}
          <Link href="/" className="p-2 flex items-center w-full z-60">
          <button
            className={`rounded-lg transition flex items-center w-12 h-12 ${
              pathname === "/" ? "bg-white shadow-md" : "text-gray-600"
            } ${isExpanded ? "w-full pl-4 justify-start gap-x-3" : "justify-center"}`}
          >
              <IoHome className="w-6 h-6 text-gray-800" />
              {isExpanded && <span className="text-gray-800 text-sm font-medium">Home</span>}
            </button>
          </Link>

          {/* Contacts */}
          <Link href="/contacts" className="p-2 flex items-center w-full z-60">
          <button
            className={`rounded-lg transition flex items-center w-12 h-12 ${
              pathname === "/contacts" ? "bg-white shadow-md" : "text-gray-600"
            } ${isExpanded ? "w-full pl-4 justify-start gap-x-3" : "justify-center"}`}
          >
              <IoPeopleSharp className="w-6 h-6 text-gray-800" />
              {isExpanded && <span className="text-gray-800 text-sm font-medium">Contacts</span>}
            </button>
          </Link>

          {/* Tasks */}
          <Link href="/tasks" className="p-2 flex items-center w-full z-60">
          <button
            className={`rounded-lg transition flex items-center w-12 h-12 ${
              pathname === "/tasks" ? "bg-white shadow-md" : "text-gray-600"
            } ${isExpanded ? "w-full pl-4 justify-start gap-x-3" : "justify-center"}`}
          >
              <BiSolidFileBlank className="w-6 h-6 text-gray-800" />
              {isExpanded && <span className="text-gray-800 text-sm font-medium">Tasks</span>}
            </button>
          </Link>

          {/* Deals */}
          <Link href="/deals" className="p-2 flex items-center w-full z-60">
          <button
            className={`rounded-lg transition flex items-center w-12 h-12 ${
              pathname === "/deals" ? "bg-white shadow-md" : "text-gray-600"
            } ${isExpanded ? "w-full pl-4 justify-start gap-x-3" : "justify-center"}`}
          >
              <BiSolidDollarCircle className="w-6 h-6 text-gray-800" />
              {isExpanded && <span className="text-gray-800 text-sm font-medium">Deals</span>}
            </button>
          </Link>
        </nav>
      </div>
    </>
  );
}
