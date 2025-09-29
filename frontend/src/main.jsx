import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Toaster } from 'react-hot-toast'
import store from './store/store.js'
import { Provider } from 'react-redux'
import AuthProvider from './components/AuthProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>,
)
