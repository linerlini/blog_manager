import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'style/index.css'
import { requestAutoLogign } from 'api/user'
import { ResponseCode } from 'utils/constants'
import { setUser } from 'store/slices/user_slice'
import App from './App'
import store from './store'

async function autoLogin() {
  const result = await requestAutoLogign()
  if (result.code === ResponseCode.SUCCESS) {
    const { data } = result
    store.dispatch(setUser(data))
  }
}
autoLogin().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
})
