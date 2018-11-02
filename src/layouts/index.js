import React from "react";
import { Route } from "react-router-dom";
import Locale from "../locales";
import routes from "src/configs/routes";

/**
 * @version 1.0.0
 * @author [Tấn nguyễn](https://github.com/tannguyen208)
 * @class Layout  This is a description of the Layout App. 💋
 */
class Layout extends React.Component {
  render = () => {
    return (
      <div>
        🇺🇲 🇻🇳
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </div>
    );
  };
}

export default Layout;
