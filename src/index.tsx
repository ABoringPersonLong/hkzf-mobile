// 导入 react-virtualized 的样式
import 'react-virtualized/styles.css'
// 导入图标库的样式
import './assets/fonts/iconfont.css'
// 导入标准化样式
import './assets/css/normalize.css'
// 导入基本样式
import './assets/css/base.css'

import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
