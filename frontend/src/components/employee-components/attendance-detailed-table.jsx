import React from "react";
import { Table } from "antd";

const AttendanceTable = () => {
  const attendaceColumns = [
    {
      title: "Day",
      dataIndex: "Day",
    },
    {
      title: "Attendance Status",
      dataIndex: "Status",
    },
    {
      title: "Entry Time",
      dataIndex: "EntryTime",
    },
    {
      title: "Exit Time",
      dataIndex: "ExitTime",
    },
    {
      title: "Penalty Amount",
      dataIndex: "PenaltyAmount",
    },
  ];
  const attendanceData = [
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
    {
      Day: "1",
      Status: "Marked",
      EntryTime: "12:15",
      ExitTime: "18:15",
      PenaltyAmount: "0",
    },
  ];

  return (
    <Table
      columns={attendaceColumns}
      dataSource={attendanceData}
      size="middle"
      pagination={false}
      scroll={{ y: 220 }}
    />
  );
};

export default AttendanceTable;
