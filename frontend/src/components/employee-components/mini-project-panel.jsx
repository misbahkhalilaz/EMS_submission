import React from "react";
import "antd/dist/antd.css";
import { Descriptions, Typography } from "antd";

const { Title, Paragraph } = Typography;

const MiniProjectDetails = () => {
  return (
    <>
      <div className="miniproject-panel-body scrollbar scrollbar-info">
        <Descriptions
          title={
            <Title style={{ color: "#878787", margin: 0 }} level={3}>
              Active Projects
            </Title>
          }
          size="middle"
          colon={false}
        >
          <Descriptions.Item
            style={{ borderRadius: 20, padding: 0, background: "white" }}
            label={<Title level={3}>ABC</Title>}
          >
            <Paragraph strong style={{ paddingLeft: 5 }}>
              Status <br /> Deadline
            </Paragraph>
          </Descriptions.Item>
          <Descriptions.Item
            style={{ borderRadius: 20, padding: 0, background: "white" }}
            label={<Title level={3}>DEF</Title>}
          >
            <Paragraph strong style={{ paddingLeft: 5 }}>
              Status <br /> Deadline
            </Paragraph>
          </Descriptions.Item>
          <Descriptions.Item
            style={{ borderRadius: 20, padding: 0, background: "white" }}
            label={<Title level={3}>GHI</Title>}
          >
            <Paragraph strong style={{ paddingLeft: 5 }}>
              Status <br /> Deadline
            </Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
};

export default MiniProjectDetails;
