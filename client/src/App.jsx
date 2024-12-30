
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './components/content/Home'
import CreatePost from './components/form/CreatePost'
import Navbar from './components/constatn-file/Navbar'

function App() {


  return (
    <div className='max-w-5xl mx-auto'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/createpost' element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default App
