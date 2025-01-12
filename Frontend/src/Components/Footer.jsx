import React from "react";
import { Footer, FooterDivider } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsGithub,
  BsTelegram,
  BsTwitter,
} from "react-icons/bs";
const FooterCom = () => {
  return (
    <Footer
      container
      className=" border-t border-gray-600  dark:border-white text-white dark:bg-transparent"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex md:grid-cols-1">
          <div className=" mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white 
       "
            >
              <span className="text-gray-400">Osm Ethipia</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https/www.1000jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer" // for security
                >
                  100 Js projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer" // for security
                >
                  OSM Ethiopia
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https/www.1000jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer" // for security
                >
                  Github repository
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  // rel="noopener noreferrer" // for security
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                // href="https/www.1000jsprojects.com"
                // target="_blank"
                // rel="noopener noreferrer" // for security
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  // rel="noopener noreferrer" // for security
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="dark:border-white" />
        <div className=" w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="OSM Ethiopia"
            className=" dark:text-white"
            year={new Date().getFullYear()}
          />
          <div className=" flex gap-6 sm:mt-0 mt-4  sm:items-center sm:justify-between">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className=" dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className=" dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
              className=" dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsTelegram}
              className=" dark:text-white"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              className=" dark:text-white"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
