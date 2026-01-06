import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import KakaoLogin from './pages/KakaoLogin'
import Signup from './pages/Signup'
import SignupCheck from './pages/SignupCheck'
import { AuthCallback } from './pages/AuthCallback'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Process from './pages/Process'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/auth/callback' element={<AuthCallback />} />
          <Route path='/login' element={<KakaoLogin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/check' element={<SignupCheck />} />
          <Route path='/process/:studyId' element={<Process />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
