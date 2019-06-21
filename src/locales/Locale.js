import React from "react";
import PropTypes from "prop-types";
import Locale from "./Locale";

const propTypes = {};
const defaultProps = {};
const childContextTypes = {
  locale: PropTypes.object
};

class LocaleProvider extends React.Component {
  constructor(props) {
    super(props);
    this.locale = new Locale(props.language);
  }

  componentWillReceiveProps = nextProps => {
    this.locale.setLanguage(nextProps.language);
  };

  getChildContext = () => {
    return { locale: this.locale };
  };

  render = () => {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  };
}

LocaleProvider.propTypes = propTypes;
LocaleProvider.defaultProps = defaultProps;
LocaleProvider.childContextTypes = childContextTypes;

export default LocaleProvider;
