import React from "react";
import { Menu, Dropdown, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";

import "./month-table-css.css";

const MonthSalaryTable = () => {
  //   let now = new Date().getUTCFullYear() + 1;
  //   let years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //   years = years.map((yr) => (now -= 1));

  const monthColumn = [
    {
      title: "",
      dataIndex: "Month",
    },
    {
      title: "",
      dataIndex: "Salary",
    },
  ];

  const monthData = [
    {
      Month: "January",
      Salary: "0000",
    },
    {
      Month: "February",
      Salary: "0000",
    },
    {
      Month: "March",
      Salary: "0000",
    },
    {
      Month: "April",
      Salary: "0000",
    },
    {
      Month: "May",
      Salary: "0000",
    },
    {
      Month: "June",
      Salary: "0000",
    },
    {
      Month: "July",
      Salary: "0000",
    },
    {
      Month: "August",
      Salary: "0000",
    },
    {
      Month: "September",
      Salary: "0000",
    },
    {
      Month: "October",
      Salary: "0000",
    },
    {
      Month: "November",
      Salary: "0000",
    },
    {
      Month: "December",
      Salary: "0000",
    },
  ];

  //   const menu = (
  //     <span>{new Date().getUTCFullYear()}</span>
  //     // <Menu>
  //     //   {years.map((year) => (
  //     //     <Menu.Item key={year}>{year}</Menu.Item>
  //     //   ))}
  //     // </Menu>
  //   );

  return (
    <>
      {/* <Dropdown className="dropdown-archon" overlay={menu} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          {years[0]} <DownOutlined className="dropdown-icon" />
        </a>
      </Dropdown> */}
      <span>{new Date().getUTCFullYear()}</span>

      <Table
        showHeader={false}
        columns={monthColumn}
        dataSource={monthData}
        size="small"
        pagination={false}
      />
    </>
  );
};

export default MonthSalaryTable;
