import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled app error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ margin: 0, fontSize: '1.1rem' }}>Something went wrong</h1>
          <p style={{ marginTop: '0.6rem' }}>
            Please reload the page. If the issue persists, check the latest CV JSON data.
          </p>
        </main>
      )
    }

    return this.props.children
  }
}
