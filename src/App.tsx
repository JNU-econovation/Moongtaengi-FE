import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './pages/Main'
import KakaoLogin from './pages/KakaoLogin'
import Signup from './pages/Signup'
import SignupCheck from './pages/SignupCheck'
import { AuthCallback } from './pages/AuthCallback'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Process from './pages/Process'
import ProcessSetting from './pages/ProcessSetting'
import { NavLayout } from './components/NavLayout'
import { Assignment } from './pages/Assignment'
import { AssignmentEdit } from './pages/AssignmentEdit'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Error } from './pages/Error'
import Collection from './pages/Collection'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path='/' element={<Main />} />

            <Route element={<ProtectedRoute />}>
              <Route path='/studies/:studyId' element={<Process />} />
              <Route path='/studies/:studyId/setting' element={<ProcessSetting />} />
              <Route path='/studies/:studyId/processes/:processId/assignments/:assignmentId' element={<Assignment />} />
              <Route path='/studies/:studyId/processes/:processId/assignments/:assignmentId/edit' element={<AssignmentEdit />} />
              <Route path='/collections' element={<Collection />} />
            </Route>
          </Route>

          <Route path='/login' element={<KakaoLogin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/check' element={<SignupCheck />} />
          <Route path='/auth/callback' element={<AuthCallback />} />

          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
