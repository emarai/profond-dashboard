import { UserOutlined, HomeOutlined, AreaChartOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

const items: MenuProps['items'] = [
  {
    key: "Home",
    icon: React.createElement(HomeOutlined),
    label: 'Home'
  },
  {
    key: "Whale Analysis",
    icon: React.createElement(AreaChartOutlined),
    label: 'Whale Analysis'
  },
  {
    key: "Wallet Explorer",
    icon: React.createElement(UserOutlined),
    label: 'Wallet Explorer'
  }
];

export default items;