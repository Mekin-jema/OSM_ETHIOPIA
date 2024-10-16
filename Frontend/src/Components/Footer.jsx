import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
const FooterCom = () => {
  return (
    <Footer container className=" border border-t-8 border-teal-500 text-white">
      <div className="">
        <div className="">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white 
       "
          >
            <span className=" px- py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Mekin's{" "}
            </span>
            Blog
          </Link>
          
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
