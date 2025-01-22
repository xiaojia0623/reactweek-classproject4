import { useState } from 'react'
import './assets/all.scss'


import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'

function App() {
  //登入狀態，目前預設為false，若登入後就會是true狀態
  const [isLogin, setIsLogin] = useState(false);
  
  return (
    <>
      {/* 透過三元運算值看看是否登入，若為登入，則可跳轉至後台產品頁面;若未登入即顯示登入頁面 */}
      {isLogin ? <ProductPage setIsLogin={setIsLogin} /> : <LoginPage setIsLogin={setIsLogin}/>}

    </>
  )
}

export default App

