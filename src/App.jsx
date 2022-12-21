
import {
  BrowserRouter as Router,
  Route,
  Routes} from 'react-router-dom';
import Home from './components/home';
import Navbar from './components/Navbar';
import Country from './components/country';
function App() {

  return (
    <Router>
      <Navbar/>
      <div className="font-nunito bg-Light dark:bg-Dark transition-colors text-darkBlue dark:text-white min-h-screen md:px-24 px-6 ">
    <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path='/:name' element={<Country/>}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
