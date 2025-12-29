import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import KakaoLogin from './pages/KakaoLogin'
import Signup from './pages/Signup'
import SignupCheck from './pages/SignupCheck'
import { AuthCallback } from './pages/AuthCallback'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/tempMain' element={<Main />} />
        <Route path='/' element={<AuthCallback />} />
        <Route path='/login' element={<KakaoLogin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signup/check' element={<SignupCheck />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
