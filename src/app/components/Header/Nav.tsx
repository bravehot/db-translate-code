import Link from "next/link";
import Login from "./Login";

const Nav = () => {
  return (
    <>
      <Link
        href="playground"
        className="text-white no-underline mx-4 text-lg hover:opacity-75"
      >
        Playground
      </Link>
      <Link
        href="airport"
        className="text-white no-underline mx-4 text-lg hover:opacity-75"
      >
        Airport
      </Link>
      <Link
        href="docs"
        className="text-white no-underline mx-4 text-lg hover:opacity-75"
      >
        Docs
      </Link>
      <Login />
    </>
  );
};

export default Nav;
