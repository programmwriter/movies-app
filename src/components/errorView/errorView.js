import React from "react";
import PropTypes from "prop-types";
import { Result } from "antd";
import errMsgs from "./errMsg";

const ErrorView = ({ totalResults, err }) => {
  let errType = "";

  if (!totalResults) {
    errType = "totalResults";
  } else if (err) {
    errType = "err";
  }

  return (
    <Result
      status={errMsgs[errType].status}
      title={errMsgs[errType].status}
      subTitle={errMsgs[errType].msg}
    />
  );
};

ErrorView.propTypes = {
  totalResults: PropTypes.number.isRequired,
  err: PropTypes.bool.isRequired,
};

export default ErrorView;
