import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

import App from './App'

const rootElement: any = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
