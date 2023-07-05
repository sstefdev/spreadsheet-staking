import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import AppContextProvider from '@utils/context'
import { Wrapper } from '@components/layout'
import { Home } from '@containers/index'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Wrapper>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<h1>404</h1>} />
          </Routes>
        </Wrapper>
      </Router>
      <ToastContainer limit={1} />
    </AppContextProvider>
  )
}

export default App
