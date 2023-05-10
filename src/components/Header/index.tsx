import Link from "next/link";

import Nav from "./Nav";
import Image from "next/image";

import logo from "../../../public/Tu.png";

const Header = () => {
  return (
    <header className="w-full h-16 basis-16 flex justify-end items-center text-white mb-1">
      <p className="mr-auto">
        <Link href="/" className="text-white no-underline">
          <Image src={logo} alt="logo" height={48} />
        </Link>
      </p>
      <Nav />
    </header>
  );
};

export default Header;
