import { Component } from 'react';
import { createId } from '../lib/id.js';
import { logger, initLogger } from '../logger/logger.js';
import ServerErrorPage from './ServerErrorPage.jsx';

/**
 * Error Boundary for React render/lifecycle errors.
 *
 * Shows a user-friendly 500 page and logs technical details into localStorage.
 */
export default class ErrorBoundary extends Component {
  /**
   * @param {object} props
   * @param {string} [props.moduleName]
   * @param {string | number | undefined} [props.resetKey] When it changes, the boundary clears the last error.
   * @param {import('react').ReactNode} props.children
   */
  constructor(props) {
    super(props);
    this.state = { fatalError: null };
  }

  /**
   * React lifecycle: clear the stored fatal error when the reset key changes.
   *
   * @param {object} prevProps
   * @param {string | number | undefined} prevProps.resetKey
   */
  componentDidUpdate(prevProps) {
    // If we navigate away from a broken route, allow the UI to recover.
    if (this.props.resetKey !== prevProps.resetKey && this.state.fatalError) {
      this.setState({ fatalError: null });
    }
  }

  /**
   * @param {unknown} error
   * @param {object} info
   * @param {string} info.componentStack
   */
  componentDidCatch(error, info) {
    // Ensure logger config exists before logging.
    initLogger();

    const errorId = createId();
    const correlationId = createId();
    const log = logger(this.props.moduleName || 'react/ErrorBoundary');

    const technical = {
      errorName: error instanceof Error ? error.name : 'UnknownError',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      componentStack: info.componentStack,
    };

    log.critical('Unhandled exception in React component tree', {
      errorId,
      correlationId,
      context: technical,
    });

    this.setState({
      fatalError: {
        errorId,
        correlationId,
        module: this.props.moduleName || 'react/ErrorBoundary',
        technical,
      },
    });
  }

  /**
   * @returns {import('react').ReactNode}
   */
  render() {
    const { fatalError } = this.state;
    if (fatalError) {
      return <ServerErrorPage fatalError={fatalError} />;
    }
    return this.props.children;
  }
}
