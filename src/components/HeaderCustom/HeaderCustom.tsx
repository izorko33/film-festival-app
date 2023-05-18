import React from "react";
import { Outlet, Link } from "react-router-dom";
import { HomeFilled } from "@ant-design/icons";
import { Menu } from "antd";

interface MenuItem {
  label: React.ReactNode;
  key: string;
  icon: React.ReactNode;
}

const items: MenuItem[] = [
  {
    label: <Link to="/">New Survey</Link>,
    key: "home",
    icon: <HomeFilled />,
  },
];

const HeaderCustom: React.FC = () => {
  return (
    <>
      <Menu mode="horizontal" items={items} selectable={false} />
      <Outlet />
    </>
  );
};

export default HeaderCustom;
