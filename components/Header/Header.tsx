import Link from "next/link";
import React from "react";

interface HeaderProps {}
const levImg =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmlpforums.com%2Fuploads%2Fpost_images%2Fsig-4234347.maOrNM2.png&f=1&nofb=1";

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center space-x-5">
        <Link className="flex-1" href={"/"}>
          <img
            className="w-32 object-contain cursor-pointer"
            src={levImg}
            alt="lev"
          />
        </Link>
        <div className="hidden md:inline-flex items-center space-x-5 font-medium">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex font-bold items-center space-x-5 text-green-600">
        <h3>Sign in</h3>
        <h3 className="border px-4 py-1 rounded-full border-green-600">
          Get Started
        </h3>
      </div>
    </header>
  );
};

export default Header;
