import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './router'
import { Provider } from 'react-redux'
import store from './store'

const container = document.getElementById('app') as HTMLInputElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
    <div id="modal"></div>
  </Provider>
)
