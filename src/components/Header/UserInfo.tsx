import { Avatar, Dropdown, message } from "antd";
import { motion } from "framer-motion";

import type { MenuProps } from "antd";
import type { InteUserInfo } from "@/@types/user";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";

const UserInfo: NextPage<{
  userInfo: InteUserInfo;
}> = ({ userInfo }) => {
  const [messageAPI, contextHolder] = message.useMessage();
  const { image, name } = userInfo;

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const handleLogout: MenuProps["onClick"] = async ({ key }) => {
    if (key === "logout") {
      await signOut();
      messageAPI.success("Logout successfully");
    }
  };

  return (
    <section>
      {contextHolder}
      <Dropdown
        menu={{ items, onClick: handleLogout }}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
      >
        <motion.div whileHover={{ rotate: 360 }} whileTap={{ rotate: 0 }}>
          {image ? (
            <Avatar
              size={42}
              className="cursor-pointer !border-2 hover:!border-fuchsia-500 rounded-full"
              src={image}
            />
          ) : (
            <Avatar
              size={42}
              className="cursor-pointer"
              style={{ backgroundColor: "#8b5cf6" }}
            >
              {name}
            </Avatar>
          )}
        </motion.div>
      </Dropdown>
    </section>
  );
};

export default UserInfo;
