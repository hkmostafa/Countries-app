import axios from 'axios';
import { useState,useEffect } from 'react'
function Home() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({
     name : '',
     population : null,
     region : '',
     capital : '',
     flag : ''
  });
  const [region , setRegion]= useState('');

   const onChangeRegion=(e)=>{
    setRegion(e.target.value)
    console.log(e.target.value)
   }
   

    async function fetchCountry(){
      const country = await axios.get('https://restcountries.com/v3.1/name/morocco');
      setCountry({
        name : country.data[0].name.common,
        population : country.data[0].population,
        region : country.data[0].region,
        capital : country.data[0].capital[0],
        flag : country.data[0].flags.png

      });
      
  }

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

    
    useEffect(
      ()=>{
      fetchCountry();
      fetchCountries();
      },[]

    )
    console.log(country);
    console.log(countries);
    return (
      <div className=" py-10 px-32 ">
        <div className="flex justify-between ">
          <input type="text" placeholder="Search for a country" className="shadow-md px-40 py-3 border-none text "></input>
        <select name="aaa" id="" className="px-6 py-3" onChange={onChangeRegion}>
          <option value="">Filter by region</option>
          <option className="py-2" value="Africa">Africa</option>
          <option className="py-1" value="Americas">Americas</option>
          <option className="py-1" value="Asia">Asia</option>
          <option className="py-1" value="Europe">Europe</option>   
          <option className="py-1" value="Oceania">Oceania</option>          
       
        </select>
        </div>

        <div className="grid grid-cols-4 gap-16 pt-10">
          {countries.map(function(c){
            return( <div className="grid pb-8 bg-white shadow-md ">
               <img src={c.flag} alt="" />
               <div className=' py-5 px-6 '>
                  <h1 className="px-3 text-normal font-regular">{c.name}</h1>
                  <div className="px-3">
                    <h5>Population : {c.population}</h5>
                    <h5>Region : {c.region}</h5>
                    <h5>Capital: {c.capital} </h5>
                  </div>
                </div>
            </div>)
           
          })}
            
            
        </div>
        
      </div>
       
  
    )
}

export default Home
