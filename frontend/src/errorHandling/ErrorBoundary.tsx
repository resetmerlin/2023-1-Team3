import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ServerError } from '../components/Error/Error';

interface State {
  hasError: boolean;
}
interface Props {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  fallback: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info);
  }

  public render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      return <ServerError error={fallback} />;
    }

    return children;
  }
}

export default ErrorBoundary;
