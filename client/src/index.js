import React, { Fragment, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import ReactLoading from 'react-loading'
import './index.css'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  ThemeContext,
  ThemeProvider,
} from './Context/ThemeContext/ThemeContext'
import { AuthContextProvider } from './Context/AuthContext/AuthContext'

const Preloader = () => {
  const [{ theme }] = useContext(ThemeContext)
  const loadingColor = theme === 'dark' ? '#65fcdb' : '#db084e'
  const [isLoading, setIsLoading] = useState(undefined)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 2000)
  }, [])
  return (
    <Fragment>
      {!isLoading ? (
        <div id="preloader">
          <h2>Loading</h2>
          <ReactLoading
            className="preloaderIcon"
            type={'bubbles'}
            color={loadingColor}
            height={50}
            width={50}
          />
        </div>
      ) : (
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      )}
    </Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <Preloader />
  </ThemeProvider>,
)
