import React from "react";
import Error from "../components/Error";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Error error={this.props.fallback} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
