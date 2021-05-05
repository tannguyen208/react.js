import React from "react";
import { connect } from "dva";
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
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <h2>{props.count}</h2>
      <button onClick={onAdd}>+</button>
      <button onClick={onMinus}>-</button>
    </div>
  );
});

IndexPage.propTypes = {};

export default IndexPage;
