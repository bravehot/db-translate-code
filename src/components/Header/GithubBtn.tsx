"use client";
import { GithubOutlined } from "@ant-design/icons";
const GithubBtn = () => {
  const handleClick = () => {
    window.open("https://github.com/bravehot/tutu-code");
  };
  return (
    <GithubOutlined
      className="cursor-pointer text-xl hover:rotate-[360deg] transition-all"
      onClick={handleClick}
    />
  );
};

export default GithubBtn;
