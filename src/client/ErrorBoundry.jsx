// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};

type State = {
  hasError: boolean,
  error: ?{},
  info: ?{ componentStack: string },
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error: {}, info: { componentStack: string }) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: '5rem' }}>
          <h3>
React error
          </h3>
          <pre style={{ padding: '1rem', background: 'black', color: 'white' }}>
            {error && error.toString()}
          </pre>
          <pre>
            {info && ('No componentStack info' || info.componentStack)}
          </pre>
        </div>
      );
    }
    return children;
  }
}
