import { UserOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

const items: MenuProps['items'] = [
  {
    key: "Wallet Explorer",
    icon: React.createElement(UserOutlined),
    label: 'Wallet Explorer'
  },
  {
    key: "About",
    icon: React.createElement(UserOutlined),
    label: 'About'
  }
];

export default items;