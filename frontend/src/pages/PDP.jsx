import React from "react";
import withRouter from "../utils/withRouter";
class PDP extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.params.id}</h1>
      </div>
    );
  }
}

export default withRouter(PDP);
