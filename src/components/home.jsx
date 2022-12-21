import axios from 'axios';
import { useState,useEffect } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
function Home() {
  //State variables 
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue]=useState('');
  const [region, setRegion]=useState('');
  const [paginate, setPaginate]=useState(8)
  const navigate= useNavigate();
  const [currentCountry,setCurrentCountry]=useState(null)
  //Fetch countries 
  async function fetchCountries(){
    const countries = await axios.get('https://restcountries.com/v3.1/all');
    const countriesSorted = countries.data.map((c)=>{
      return {
        name : c.name.common,
        population : c.population,
        region : c.region,
        flag : c.flags.png,
        capital : c.capital
      }
    })
    setCountries(countriesSorted);
}
  //Fetch countries by regions
    async function fetchByRegion(region){
      const countries = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
      const countriesSorted = countries.data.map((c)=>{
        return {
          name : c.name.common,
          population : c.population,
          region : c.region,
          flag : c.flags.png,
          capital : c.capital
        }
      })
      setCountries(countriesSorted);
      setSearchValue('');
    }

  //On Change Region  
   const onChangeRegion=(e)=>{
    
    setRegion(e.target.value);
    //If no region is selected all countries are fetched
    if(e.target.value==="")
    {
      fetchCountries();
    }
    //Else countries of the selected region are fetched
    fetchByRegion(e.target.value);
   }

   
   
   //On change search
    const handleChangeSearch = (e) =>{
        setSearchValue(e.target.value) 
        //filtering through countries to match the correspondant search value 
        setCountries(countries.filter(c=>{ return c.name.toLowerCase().match(e.target.value.toLowerCase())}))
       
        if(e.target.value===""){   
          if(region===''){ 
          //if the search is an empty string and if no region is selected all countries are shown
            fetchCountries();
          }
          //else the countries of the selected region are shown
          else fetchByRegion(region)
         }

      
     
        console.log(countries)
    }

    const loadMore = (e) => {
      setPaginate((prevValue) => prevValue + 8);
    };

    const countryClick = (country) => {
      setCurrentCountry(country);
      console.log(country)
      navigate(`/${country.name}`,{state:{name : country.name}})
   
    };
    
    //Fetch countries on mount
    useEffect(
      ()=>{
      fetchCountries();
      },[]

    )
    return (
      <div className="grid py-10 ">
        <div className="flex justify-between md:flex-row flex-col md:gap-0 gap-10 ">
          <div>
          <AiOutlineSearch className="absolute md:left-28 left-12 top-32 text-xl cursor-pointer"/>
          <input type="text" value={searchValue} onChange={handleChangeSearch}  placeholder="Search for a country" className="shadow-md  w-full pl-[max(3.3rem,4vw)] pr-[15vw] py-3 border-none dark:bg-blue outline-none rounded-md"></input>
          </div>
    
        <select name="" id="" defaultValue={""} className="pl-6  pr-16 py-3 w-[60%] md:w-fit bg-white dark:bg-blue shadow-md  rounded-md opacity-80 caret-blue hover:bg-Lightbg-gray-50  border-gray-300 text-gray-900 text-sm " onChange={onChangeRegion}>

          <option value="">Filter by region</option>
          <option className="" value="Africa">Africa</option>
          <option className="" value="Americas">Americas</option>
          <option className="" value="Asia">Asia</option>
          <option className="" value="Europe">Europe</option>   
          <option className="" value="Oceania">Oceania</option>          
       
        </select>
        </div>

        <div className="grid xl:grid-cols-4   lg:grid-cols-3 md:grid-cols-2  gap-16 pt-10 mx-[13%] md:mx-10 lg:mx-0  justify-center">
        {countries.slice(0,paginate).map((c)=>{
            return(
               <div className="grid gap-10 bg-white dark:bg-blue shadow-md grid-rows-2 transition-all rounded-md hover:scale-[1.05] hover:cursor-pointer" onClick={()=>countryClick(c)} key={c.name} >
               <img src={c.flag} alt="" className=" shadow-md   h-44 self-stretch justify-self-stretch rounded-t-md place-self-center" />
               <div className='flex flex-col px-10 gap-0 justify-start'>
                  <h1 className=" text-base font-semibold pb-5">{c.name}</h1>
                    <div className="inline-flex items-center gap-1 ">
                    <h5 className=''>Population : </h5> <p className='text-sm opacity-80'> {c.population}</p>
                    </div>
                    <div  className="inline-flex items-center gap-1">
                    <h5>Region : </h5> <p className='text-sm opacity-80'> {c.region}</p>
                    </div>
                    <div className='inline-flex items-center gap-1 '>
                    <h5>Capital :  </h5><p className='text-sm opacity-80'>  {c.capital}</p>
                    </div>
                  
                </div>
            </div>)
           
          })}
            
                  
        </div>
        { countries.length > 8 &&
        <button className="mt-6 bg-white dark:bg-blue w-fit px-10 py-2 rounded-md shadow-md justify-self-center font-nunito hover:bg-blue hover:text-white transition-all dark:hover:bg-Light dark:hover:text-Dark" onClick={loadMore}>Load more ...</button>}
        
      </div>
       
  
    )
}

export default Home
