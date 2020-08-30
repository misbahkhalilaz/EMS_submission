import React from "react";
import { Badge, Typography } from "antd";
import "./broadcast.css";
import BroadcastMsg from "./broadcast-msg";
import { connect } from "react-redux";

const { Title } = Typography;

const BroadcastPanel = (props) => {
  return (
    <>
      <div className="broadcast-panel-header">
        <Badge count={props.broadcasts.length}>
          <Title level={3}>Broadcast</Title>
        </Badge>
      </div>

      <div className="broadcast-panel-body">{props.broadcasts}</div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  broadcasts: state.broadcasts.map((msg) => (
    <BroadcastMsg
      key={msg._id}
      type={msg.type}
      msg={msg.msg}
      eventDate={new Date(msg.eventDate * 1000).toLocaleDateString("en-US")}
      date={new Date(msg.date * 1000).toLocaleDateString("en-US")}
    />
  )),
});

export default connect(mapStateToProps)(BroadcastPanel);
