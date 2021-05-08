import dva from "dva";
import createLoading from "dva-loading";
import createHistory from "history/createBrowserHistory";
import { message } from "antd";
import "./index.css";

// 1. Initialize
const app = dva({
  history: createHistory(),
  onError(error) {
    message.error(error.message);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/count").default);
app.model(require("./models/resume").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
