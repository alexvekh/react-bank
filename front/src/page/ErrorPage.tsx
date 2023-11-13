import React from "react";
import { Link } from "react-router-dom";
import StatusBar from "../component/status-bar/index";
import Page from "../component/page/index";
import ArrowBackTitle from "../component/arrow-back-title";

const Error: React.FC = () => {
  return (
    <Page>
      <StatusBar color="black" />
      <ArrowBackTitle title="Error" />

      <div className="notice">
        <br />
        Something went wrong or this page isn't exist. <br /> <br />
        <Link className="notice__link" to="/">
          Start Again
        </Link>
      </div>
    </Page>
  );
};

export default Error;
