import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/index'
import Lab from './pages/lab'
import Singin from './pages/signin'
import NotFound from './pages/notFound'
import Diagnosis from './pages/diagnosis'
import Result from './pages/result'
import ScrollTop from './scrollTop'
import NonCompatible from './nonCompatible'
import GetMe from './getMe'
import Logout from './logout'
import Footer from './components/footer'
import PrivateRoute from './components/privateRoute'

// @ts-ignore
const MODE = import.meta.env.MODE
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`/lab`}
          element={
            <PrivateRoute>
              <Lab />
            </PrivateRoute>
          }
        />
        <Route path={`/`} element={<Index />} />
        <Route path={`/signin`} element={<Singin />} />
        <Route
          path={`/diagnosis`}
          element={
            <PrivateRoute>
              <Diagnosis />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path={`/`} element={<Index />} />
        <Route
          path={`/result`}
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
      <GetMe />
      <Logout />
      <ScrollTop />
      <NonCompatible />
    </BrowserRouter>
  )
}

export default App
