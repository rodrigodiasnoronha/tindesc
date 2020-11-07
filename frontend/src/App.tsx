import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppProvider from './hooks'
import Routes from './routes'

const App: React.FC = () => (
  <AppProvider>
    <CssBaseline />
    <Routes />
  </AppProvider>
)

export default App
