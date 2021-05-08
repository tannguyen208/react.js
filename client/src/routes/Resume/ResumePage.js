import React, { useEffect } from "react";
import classNames from "classnames";
import { connect } from "dva";
// utils
import { selector } from "../../utils/selector";
// css
import "./ResumePage.css";

const mapStateToProps = (state) => ({
  resume: state.resume,
});

const ResumePage = connect(mapStateToProps)(({ resume, dispatch }) => {
  useEffect(() => {
    dispatch({ type: "resume/get" });
  }, []);

  console.log("♎ ~ ResumePage ~ resume", resume);

  return selector(resume.status, {
    initial: () => <div>initial</div>,
    loading: () => <div>loading</div>,
    success: () => <div className="sm:container bg-red-400">success</div>,
    failure: () => <div>failure</div>,
  });
});

export default ResumePage;
