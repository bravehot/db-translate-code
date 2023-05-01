import Link from "next/link";
import classnames from "classnames";

import Login from "./Login";
import type { NextPage } from "next";
import { usePathname } from "next/navigation";

const Nav: NextPage = () => {
  const pathName = usePathname();

  return (
    <>
      <Link
        href="playground"
        className={classnames(
          "text-white no-underline mx-4 text-lg hover:opacity-75",
          { "text-fuchsia-500 font-medium": pathName == "/playground" }
        )}
      >
        Playground
      </Link>
      <Link
        href="docs"
        className={classnames(
          "text-white no-underline mx-4 text-lg hover:opacity-75",
          { "text-fuchsia-500 font-medium": pathName == "/docs" }
        )}
      >
        Docs
      </Link>
      <Login />
    </>
  );
};

export default Nav;
