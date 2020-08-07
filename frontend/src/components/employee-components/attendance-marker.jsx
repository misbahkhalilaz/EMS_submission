import React from "react";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";

export default function Marker({
  btnText,
  btnStatus,
  setText,
  setStatus,
  setTimer,
}) {
  return (
    <Button disabled={btnStatus} shape="round" type="primary" onClick={success}>
      {"Mark " + btnText}
    </Button>
  );

  function success() {
    Modal.success({
      width: 300,
      maskClosable: true,
      content: btnText + " marked",
      okText: "Got it",
      onOk: setState,
      onCancel: setState,
    });
  }

  function setState() {
    if (btnText === "Attendance") {
      setText("Exit");
      setTimer(true);
    } else {
      setStatus(true);
      setTimer(false);
    }
  }
}
