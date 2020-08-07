import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Typography } from "antd";

const { Title } = Typography;

const data = {
  datasets: [
    {
      label: "Total Projects",
      backgroundColor: "rgb(0, 52, 255,0.8)",
      borderColor: "rgb(0, 52, 255,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgb(0, 52, 255,0.6)",
      hoverBorderColor: "rgb(0, 52, 255,1)",
      data: [30, 0],
    },
    {
      label: "Projects Leaded",
      backgroundColor: "rgb(255, 151, 0,0.8)",
      borderColor: "rgb(255, 151, 0,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgb(255, 151, 0,0.6)",
      hoverBorderColor: "rgb(255, 151, 0,1)",
      data: [10, 0],
    },
  ],
};

const ProjectChart = () => {
  return (
    <>
      <Title style={{ color: "#878787" }} level={3}>
        Projects
      </Title>
      <HorizontalBar
        height={80}
        width={360}
        data={data}
        options={{
          legend: {
            align: "start",
            position: "left",
            labels: {
              boxWidth: 15,
            },
          },
        }}
      />
    </>
  );
};

export default ProjectChart;
