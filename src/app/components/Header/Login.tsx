"use client";
import { useEffect, useState } from "react";
import { ConfigProvider, Modal } from "antd";
import { motion } from "framer-motion";
import { GithubOutlined, WalletOutlined } from "@ant-design/icons";
import Tilt from "react-parallax-tilt";

import theme from "@/app/utils/theme";

import styles from "./styles/login.module.css";
import getConfig from "next/config";

const Login = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("publicRuntimeConfig: ", getConfig());
  }, []);

  const handleModalOpen = () => {
    setModalOpen((prev: boolean) => {
      return !prev;
    });
  };
  return (
    <ConfigProvider theme={theme}>
      <motion.button
        className={styles["login-btn"]}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1 }}
        onClick={handleModalOpen}
      >
        Login
      </motion.button>

      <Modal
        title="Please select login methods"
        open={isModalOpen}
        onCancel={handleModalOpen}
        footer={null}
      >
        <section className="grid grid-cols-2 gap-x-10 p-4">
          <Tilt
            className={styles["login-method"]}
            scale={1.1}
            transitionSpeed={2500}
            perspective={500}
          >
            <GithubOutlined style={{ fontSize: 96 }} className="mb-5" />
            <span className={styles["login-method-text"]}>WEB2</span>
          </Tilt>

          <Tilt
            className={styles["login-method"]}
            scale={1.1}
            transitionSpeed={2500}
            perspective={500}
          >
            <WalletOutlined style={{ fontSize: 96 }} className="mb-5" />
            <span className={styles["login-method-text"]}>WEB3</span>
          </Tilt>
        </section>
      </Modal>
    </ConfigProvider>
  );
};

export default Login;
