import React from "react";
import { Link } from "dva/router";
import { connect } from "dva";
import { Button } from "antd";
import styles from "./IndexPage.css";

const IndexPage = connect(({ count }) => ({
  count,
}))(function (props) {
  const onAdd = React.useCallback(() => {
    props.dispatch({ type: "count/add" });
  }, []);

  const onMinus = React.useCallback(() => {
    props.dispatch({ type: "count/minus" });
  }, []);

  return (
    <div className={styles.normal}>
      <div>
        <Link to="/resume" children="Resume" />
      </div>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <h2>{props.count}</h2>
      <Button onClick={onAdd}>+</Button>
      <Button onClick={onMinus}>-</Button>
    </div>
  );
});

IndexPage.propTypes = {};

export default IndexPage;
