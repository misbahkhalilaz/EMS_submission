import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

const { Title } = Typography;

const EfficiencyChart = (props) => {
  //   const [completed, setCompleted] = useState(0);
  //   const [active, setActive] = useState(0);
  //   const [delayed, setDelayed] = useState(0);
  //   //   const [project, setProject] = useState(props.projects);

  //   useEffect(() => {
  //     props.projects.forEach((proj) => {
  //       proj.tasks
  //         .filter((task) => task.member_id === props.id)
  //         .forEach((task) =>
  //           task.status === "Completed"
  //             ? setCompleted(completed + 1)
  //             : task.status === "Active"
  //             ? setActive(active + 1)
  //             : setDelayed(delayed + 1)
  //         );
  //     });
  //   }, [props.projects]);

  const data = {
    datasets: [
      {
        backgroundColor: ["#1890ff", "#00ff00", "red"],
        data: [props.completed, props.active, props.delayed],
      },
    ],

    labels: ["Completed Tasks", "Active Tasks", "Delayed Tasks"],
  };
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

const mapStateToProps = (state, ownProps) => {
  let completed = 0,
    delayed = 0,
    active = 0;
  state.projects.forEach((proj) => {
    proj.tasks
      .filter((task) => task.member_id === state.bio._id)
      .forEach((task) =>
        task.status === "Completed"
          ? completed++
          : task.status === "Active"
          ? active++
          : delayed++
      );
  });
  return {
    completed,
    active,
    delayed,
  };
};

export default connect(mapStateToProps)(EfficiencyChart);
