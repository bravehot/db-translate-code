"use client";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { GithubOutlined } from "@ant-design/icons";

import UserInfo from "./UserInfo";
import styles from "./styles/login.module.css";

import type { NextPage } from "next";

const Login: NextPage = () => {
  const { data: session } = useSession();

  const handleLogin = async () => {
    await signIn("github", { callbackUrl: `${window.location.origin}/` });
  };

  return (
    <>
      {session?.user ? (
        <UserInfo userInfo={session?.user} />
      ) : (
        <motion.button
          className={styles["login-btn"]}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          onClick={handleLogin}
        >
          <GithubOutlined className="inline-block mr-2" />
          Login with Github
        </motion.button>
      )}
    </>
  );
};

export default Login;
