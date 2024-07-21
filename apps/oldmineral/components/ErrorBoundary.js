import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Error path
      return (
        <div className="w-full bg-white p-4">
          <h2>Something went wrong.</h2>
        </div>
      );
    }

    // Normally, just render children
    return this.props.children;
  }
}
