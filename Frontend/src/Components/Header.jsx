import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../Redux/themeSlice";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const path = useLocation().pathname;

  return (
    <Navbar className="border-b-2 border-gray-400 dark:border-gray-100 bg-white dark:bg-transparent">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-[25px] font-semibold dark:text-white"
      >
        <span>OSM ETHIOPIA</span>
      </Link>
      <form></form>
      <Button
        className="w-12 h-10 lg:hidden bg-transparent hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white"
        color="gray"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline bg-transparent hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white"
          color="white"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button
            gradientDuoTone=""
            outline
            color="white"
            className="bg-transparent hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-700 text-gray-700 dark:text-white"
          >
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link
            className={`dark:text-white  text-[20px]
            }`}
            to="/"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link
            className="text-gray-700 dark:text-gray-400 text-[20px]"
            to="/about"
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/dashboard"} as={"div"}>
          <Link
            className="text-gray-700 dark:text-gray-400 text-[20px]"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/project"} as={"div"}>
          <Link
            className="text-gray-700 dark:text-gray-400 text-[20px]"
            to="/project"
          >
            Project
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/contact"} as={"div"}>
          <Link
            className="text-gray-700 dark:text-gray-400 text-[20px]"
            to="/contact"
          >
            Contact
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
