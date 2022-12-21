import {MdOutlineDarkMode} from 'react-icons/md'
import {MdDarkMode} from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import useDarkMode from '../hooks/useDarkMode';

function Navbar() {
    
    const navigate=useNavigate();
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    const goHome = () =>{ 
         navigate('/');
      }
    return (
  
            <div className="flex  justify-between py-6 md:px-24 px-16 bg-white text-darkBlue dark:text-white dark:bg-blue shadow-md items-center font-nunito">
                <h1 className=" font-nunito text-xl font-bold hover:cursor-pointer" onClick={goHome}>Where in the world ?</h1>
                <h3 className=" font-nunito text-base font-light hover:cursor-pointer" onClick={handleMode}>
                {darkTheme ? <MdDarkMode className='inline text-xl font-light self-center h-full mx-2'/> : <MdOutlineDarkMode className='inline text-xl font-light self-center h-full mx-2 bg-white'/>
}                <span className='hidden sm:inline'>Dark mode</span></h3>

            </div>
   

    )
}

export default Navbar