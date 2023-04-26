import { Avatar, Dropdown, message } from "antd";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import type { MenuProps } from "antd";
import type { InteUserInfo } from "@/app/@types/user";
import type { NextPage } from "next";

const UserInfo: NextPage<{
  userInfo: InteUserInfo;
  setUserInfo: (info: InteUserInfo | undefined) => void;
}> = ({ userInfo, setUserInfo }) => {
  const router = useRouter();
  const [messageAPI, contextHolder] = message.useMessage();
  const { avatar, name } = userInfo;

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const handleLogout: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      messageAPI.success("Logout successfully");
      localStorage.removeItem("_db_token");
      localStorage.removeItem("_apiKey");
      setUserInfo(undefined);
      router.push("/");
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
          {avatar ? (
            <Avatar
              size={42}
              className="cursor-pointer border-2 border-fuchsia-500 rounded-full"
              src={avatar}
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
