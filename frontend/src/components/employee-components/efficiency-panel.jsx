import React from "react";
import { Row, Col, Typography } from "antd";
import { Pie } from "react-chartjs-2";

const { Title } = Typography;

const data = {
  datasets: [
    {
      backgroundColor: ["red", "#00ff00"],
      data: [10, 20],
    },
  ],

  labels: ["Timely Task Completions", "Late Task Completions"],
};

const EfficiencyChart = () => {
  return (
    <>
      <Row style={{ justifyContent: "center", paddingTop: 20 }}>
        <Col span={5}>
          <Title style={{ color: "#878787" }} level={3}>
            Efficiency
          </Title>
        </Col>
        <Col span={16}>
          <Pie
            height={140}
            width={120}
            data={data}
            options={{
              maintainAspectRatio: false,
              legend: {
                align: "start",
                position: "left",
                labels: {
                  boxWidth: 15,
                },
              },
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default EfficiencyChart;
