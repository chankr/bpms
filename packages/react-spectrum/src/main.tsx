import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@react-spectrum/s2'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider locale="ja-JP" colorScheme="light">
      <App />
    </Provider>
  </StrictMode>,
)
