import React from 'react';

/**
 * Error Boundary component for catching React errors
 * Prevents entire app from crashing when child component errors
 * 
 * @component
 * Usage:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Optionally call onReset prop
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
          >
            <h2 className="text-lg font-semibold text-red-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-red-700 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="text-xs text-red-600 mb-4 max-w-full overflow-auto">
                <summary className="cursor-pointer font-semibold">
                  Error Details
                </summary>
                <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                  {this.state.error?.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.displayName = 'ErrorBoundary';
