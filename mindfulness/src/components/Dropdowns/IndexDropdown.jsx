import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

const IndexDropdown = () => {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef(null);
  const popoverDropdownRef = useRef(null);
  const popperInstanceRef = useRef(null);

  const openDropdownPopover = () => {
    popperInstanceRef.current = createPopper(
      btnDropdownRef.current,
      popoverDropdownRef.current,
      {
        placement: "bottom-start",

        // ✅ ✅ ✅ 1. STRATEGY FIX FOR SCROLLING
        strategy: "fixed",

        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ],
      }
    );
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
    if (popperInstanceRef.current) {
      popperInstanceRef.current.destroy();
      popperInstanceRef.current = null;
    }
  };

  // ✅ 2. Keeps dropdown aligned while scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (dropdownPopoverShow && popperInstanceRef.current) {
        popperInstanceRef.current.update();
      }
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [dropdownPopoverShow]);

  return (
    // ✅ ✅ ✅ 3. WRAP EVERYTHING IN RELATIVE DIV
    <div className="relative z-50">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-lg px-4 py-3 flex items-center space-x-4 z-50">
        <button
          ref={btnDropdownRef}
          onClick={(e) => {
            e.preventDefault();
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
          className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        >
          ☰
        </button>
        <h1 className="text-xl font-semibold">Mindfulness</h1>
      </div>

      {/* ✅ ✅ ✅ 4. ABSOLUTE POSITION TO ENSURE VISIBILITY ON MOBILE */}
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "absolute left-4 top-14 bg-white text-base z-50 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {/* Dropdown Items */}
        <span className="text-sm pt-2 pb-0 px-4 font-bold block text-blueGray-400">
          Menu
        </span>
        <Link to="/to-do-list" className="text-sm py-2 px-4 block">
          To Do List
        </Link>
        <Link to="/meditation" className="text-sm py-2 px-4 block">
          Meditate
        </Link>
        <Link to="/recipe-search" className="text-sm py-2 px-4 block">
          AI Meal Search
        </Link>
        <Link to="/ai-chatbox" className="text-sm py-2 px-4 block">
          AI Chatbot
        </Link>
        <div className="h-0 mx-4 my-2 border border-solid border-blueGray-100" />
        <span className="text-sm pt-2 pb-0 px-4 font-bold block text-blueGray-400">
          Auth Layout
        </span>
        <Link to="/login" className="text-sm py-2 px-4 block">
          Login
        </Link>
        <Link to="/register" className="text-sm py-2 px-4 block">
          Register
        </Link>
      </div>
    </div>
  );
};

export default IndexDropdown;
