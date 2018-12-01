import { connect } from "dva";
/*
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
  return { todos: state.todos }
};

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ type: "ACTIONS_NAME"}, dispatch) }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
*/
export const mapStateToProps = (mapStateToProps, options) => {
  const mapDispatchToProps = () => ({});

  return connect(
    mapStateToProps,
    mapDispatchToProps
  );
};

export const mapDispatchToProps = (mapDispatchToProps, options) => {
  const mapStateToProps = () => ({});

  return connect(
    mapStateToProps,
    mapDispatchToProps
  );
};
