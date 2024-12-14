import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux";
import {store} from "./Components/Redux/store.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
    </Provider>
  </StrictMode>,
)
