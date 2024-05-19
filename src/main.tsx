import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './App.tsx'
import Layout from './components/Layout'

import { store } from './store/store'

import './styles/global.css'
import './styles/markdown.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <HashRouter>
        <Layout>
          <App />
        </Layout>
      </HashRouter>
    </React.StrictMode>
  </Provider>
)
