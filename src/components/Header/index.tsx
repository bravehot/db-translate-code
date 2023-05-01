import Link from "next/link";

import Nav from "./Nav";

const Header = () => {
  return (
    <header className="w-full h-16 basis-16 flex justify-end items-center text-white">
      <p className="mr-auto">
        <Link href="/" className="text-white no-underline">
          Title
        </Link>
      </p>
      <Nav />
    </header>
  );
};

export default Header;
