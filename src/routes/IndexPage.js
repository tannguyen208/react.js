import React from "react";
import styles from "./IndexPage.css";
import { mapStateToProps, mapDispatchToProps } from "../utils/decorators";

const propTypes = {};
const defaultProps = {};
const mstp = state => {
  console.log(state);
  return {};
};
const mdtp = (dispatch, ownProps) => {
  console.log(dispatch, ownProps);
  return {};
};

/**
 * @namespace IndexPage
 * @description IndexPage connect redux middleware saga using dvajs
 * @returns React Component
 */
@mapStateToProps(s => mstp(s))
@mapDispatchToProps((d, op) => mdtp((d, op)))
class IndexPage extends React.Component {
  render = () => {
    console.log(this.props);

    return (
      <div className={styles.normal}>
        <h1 className={styles.title}>Yay! Tanna initial application</h1>
        <div className={styles.welcome} />
        <ul className={styles.list}>
          <li>
            To get started, edit <code>src/index.js</code> and save to reload.
          </li>
          <li>
            <a target="_brank" href="http://bit.ly/react-with-dvajs">
              Documents
            </a>
          </li>
        </ul>
      </div>
    );
  };
}

IndexPage.propTypes = propTypes;
IndexPage.defaultProps = defaultProps;

export default IndexPage;
