import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";

import type { NextPage } from "next";
import GithubBtn from "./GithubBtn";

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
      <GithubBtn />
    </>
  );
};

export default Nav;
