
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
      <div className="bg-Light font-nunito">
    <Routes>
      <Route path='/' element={<Home/>}/>  
      <Route path='/:countryid' element={<Country/>}/>
      </Routes>
      </div>
    </Router>
  )
}

export default App
