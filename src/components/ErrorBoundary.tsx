import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Aquí podrías enviar a un servicio de logging como Sentry
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-content">
            <div className="error-boundary-icon">⚠️</div>
            
            <h1 className="error-boundary-title">
              Oops! Something went wrong
            </h1>
            
            <p className="error-boundary-message">
              Your hero encountered an unexpected bug. Don't worry, your data is safe!
            </p>
            
            {this.state.error && (
              <details className="error-boundary-details">
                <summary>Error details</summary>
                <code>{this.state.error.toString()}</code>
              </details>
            )}

            <div className="error-boundary-actions">
              <button
                type="button"
                onClick={this.resetError}
                className="error-boundary-btn primary"
              >
                Try Again
              </button>
              
              <button
                type="button"
                onClick={() => { window.location.href = '/'; }}
                className="error-boundary-btn secondary"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;