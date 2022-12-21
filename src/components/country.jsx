import { useEffect,useState} from "react";
import {BsArrowLeft} from 'react-icons/bs'
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
function Country() {

    const [country,setCountry]=useState(null);
    const params=useParams()
    const navigate= useNavigate();
    const [borderNames,setBorderNames]=useState([]);
    
   const getCountriesByCode = (borders) =>{
      const BorderNames = []

      borders.forEach(b => {
            axios.get(`https://restcountries.com/v2/alpha/${b}`).then(response=>{
                  BorderNames.push(response.data.name);
            })

      });
      return setBorderNames(BorderNames);
   }   

     function fetchCountry(){
      axios.get(`https://restcountries.com/v3.1/name/${params.name}?fullText=true`).then((response=>{
            console.log(response)   
            setCountry({
            name : response.data[0].name.common,
            nativeName : response.data[0].name.nativeName,
            subRegion : response.data[0].subregion,
            currencies : response.data[0].currencies,
            languages : response.data[0].languages,
            topLevelDomaine : response.data[0].tld[0],
            population : response.data[0].population,
            region : response.data[0].region,
            capital : response.data[0].capital[0],
            flag : response.data[0].flags.svg,
            borders : response.data[0].borders    
          })
          getCountriesByCode(response.data[0].borders)
      }
      
      ))

    
  }
  
  console.log(borderNames)
  
  const countryClick = (country) => {
      console.log(country)
      navigate(`/${country.name}`)
   
    };
    
  useEffect(()=>{
    fetchCountry()
    
  },[])

return(
  <div className="pt-16 font-nunito">
    <a href="/" className="bg-white dark:bg-blue px-16 py-2 shadow-md flex items-center rounded-md w-fit justify-center gap-2 "><BsArrowLeft className="absolute left-[50px] md:left-[92px] text-lg font-bold p-0"/>Back</a>
  
    {country ? 
    
    <div className="pt-16 grid lg:grid-cols-2  md:gap-0 ">
      <img src={country.flag} alt="" className="max-h-[360px]  rounded-md" />
      <div className="py-10 sm:px-10   md:px-[10%] ">
      <h1 className="text-3xl font-bold pb-8"> {country.name}</h1>
      <div className="grid md:grid-cols-2 gap-10  ">
        <div className="flex flex-col lg:gap-2  ">
             <div className="inline-flex items-center gap-1 ">
                    <h5 className=''>Native Name : </h5> <p className='text-sm opacity-80'> {Object.values(country.nativeName)[0].common}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className=''>Population : </h5> <p className='text-sm opacity-80'> {country.population}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className=''>Region : </h5> <p className='text-sm opacity-80'> {country.region}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className=''>Sub Region : </h5> <p className='text-sm opacity-80'> {country.subRegion}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className=''>Capital : </h5> <p className='text-sm opacity-80'> {country.capital}</p>
              </div>

        </div>
        <div className="flex flex-col gap-2  justify-items-start">
            <div className="flex items-end  gap-1 ">
                    <h5 className=''>Top Level Domain : </h5> <p className='text-sm opacity-80'> {country.topLevelDomaine}</p>
              </div>
              <div className="flex items-end  gap-1 ">
                    <h5 className=''>Currencies : </h5>{Object.entries(country.currencies).map(([key,value],index)=>{ return <p className='text-sm opacity-80' key={key}>{(index?' , ' : "") + value.name} </p>})} 
              </div>
              <div className="flex items-end   gap-1 ">
                    <h5 className=''>Languages : </h5> {Object.entries(country.languages).map(([key,value],index)=>{ return <p className='text-sm opacity-80' key={key}>{(index?', ' : "") + value} </p>})} 
              </div>
        </div>
      </div>
      <div className="flex">
            <h1>Border countries : </h1>
            {
            borderNames &&
            borderNames.map((b)=>{
               
                  return <button onClick={()=>countryClick()} key={b} className="flex px-5 shadow-lg mx-3 font-thin" >{b}</button>
            })}
      </div>      
      </div>
     

    </div> : null
    
  }
  </div>
  
    
)
}

export default Country
