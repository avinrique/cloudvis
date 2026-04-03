'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <span className="text-red-400 text-xl">!</span>
            </div>
            <p className="text-sm text-white/50 font-body">Scene failed to load</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 font-body hover:bg-white/10 transition-colors"
            >
              Retry
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
