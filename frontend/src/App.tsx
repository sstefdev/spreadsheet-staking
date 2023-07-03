import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Wrapper from '@components/layout/Wrapper'
import Home from '@containers/Home'

function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Wrapper>
    </Router>
  )
}

export default App
