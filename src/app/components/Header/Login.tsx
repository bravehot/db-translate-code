"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Modal, message } from "antd";
import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { GithubOutlined, WalletOutlined } from "@ant-design/icons";
import Tilt from "react-parallax-tilt";

import UserInfo from "./UserInfo";
import styles from "./styles/login.module.css";

import { githubLogin, getUserInfo } from "@/app/utils/request";

import { LoginTypeEnum } from "@/app/@types/enum";
import type { NextPage } from "next";
import type { InteUserInfo } from "@/app/@types";

const Login: NextPage<{ clientId: string }> = ({ clientId }) => {
  const gitHubCode = useSearchParams().get("code");
  const [messageAPI, contextHolder] = message.useMessage();

  const githubMutation = useMutation({
    mutationFn: () => githubLogin<InteUserInfo>(gitHubCode!),
    onSuccess: ({ data }) => {
      messageAPI.success("Login successfully");
      localStorage.setItem("_db_token", data.accessToken);
      setUserInfo(data);
    },
  });

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<InteUserInfo>();

  useEffect(() => {
    if (gitHubCode && !localStorage.getItem("_db_token")) {
      githubMutation.mutate();
    }
  }, [gitHubCode]);

  useEffect(() => {
    const getInfoByToken = async () => {
      const { data } = await getUserInfo<InteUserInfo>();
      setUserInfo(data);
    };
    if (localStorage.getItem("_db_token")) {
      getInfoByToken();
    }
  }, []);

  const handleModalOpen = () => {
    setModalOpen((prev: boolean) => {
      return !prev;
    });
  };

  const handleLogin = (type: LoginTypeEnum) => {
    if (type === LoginTypeEnum.WEB2) {
      if (clientId) {
        const url = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${clientId}`;
        window.open(url);
      } else {
        messageAPI.error("client Id is empty");
      }
    }

    if (type === LoginTypeEnum.WEB3) {
      console.log("web3");
    }
  };

  return (
    <>
      {contextHolder}

      {userInfo?.name ? (
        <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
      ) : (
        <motion.button
          className={styles["login-btn"]}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          onClick={handleModalOpen}
        >
          Login
        </motion.button>
      )}

      <Modal
        title="Please select login methods"
        open={isModalOpen}
        onCancel={handleModalOpen}
        footer={null}
      >
        <section className="grid grid-cols-2 gap-x-10 p-4">
          <Tilt scale={1.1} transitionSpeed={2500} perspective={500}>
            <section
              className={styles["login-method"]}
              onClick={() => handleLogin(LoginTypeEnum.WEB2)}
            >
              <GithubOutlined style={{ fontSize: 96 }} className="mb-5" />
              <span className={styles["login-method-text"]}>WEB2</span>
            </section>
          </Tilt>

          <Tilt scale={1.1} transitionSpeed={2500} perspective={500}>
            <section
              className={styles["login-method"]}
              onClick={() => handleLogin(LoginTypeEnum.WEB3)}
            >
              <WalletOutlined style={{ fontSize: 96 }} className="mb-5" />
              <span className={styles["login-method-text"]}>WEB3</span>
            </section>
          </Tilt>
        </section>
      </Modal>
    </>
  );
};

export default Login;
