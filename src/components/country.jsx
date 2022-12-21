import { useEffect,useState} from "react";
import {BsArrowLeft} from 'react-icons/bs'
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
function Country() {

    const [country,setCountry]=useState(null);
    const params=useParams()
    const navigate= useNavigate();
    const [borderNames,setBorderNames]=useState([]);
    

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

      }
      
      ))
  }
  
  
  
  const countryClick = (country) => {
      axios.get(`https://restcountries.com/v2/alpha/${country}`).then(response=>{
            console.log(response)
       navigate(`/${response.data.name}`)
      location.reload()
      })
      
   
    };

    

  useEffect(()=>{
    fetchCountry()
    
  },[])

return(
  <div className="pt-16 font-nunito">
    <a href="/" className="bg-white dark:bg-blue px-16 py-2 shadow-md flex items-center rounded-md w-fit justify-center gap-2 hover:cursor-pointer"><BsArrowLeft className="absolute left-[50px] md:left-[120px] text-lg font-bold p-0"/>Back</a>
  
    {country ? 
    
    <div className="pt-10 grid sm:justify-center  lg:grid-cols-2  lg:gap-20 ">
      <img src={country.flag} alt="" className="max-h-[360px]  rounded-md" />
      <div className="py-10">
      <h1 className="text-3xl font-bold pb-8"> {country.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 md:pb-10 ">
        <div className="flex flex-col gap-2 lg:gap-2  ">
             <div className="inline-flex items-center gap-1 ">
                    <h5 className='text-sm font-semibold'>Native Name: </h5> <p className='text-sm opacity-80'> {Object.values(country.nativeName)[0].common}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className='text-sm font-semibold'>Population: </h5> <p className='text-sm opacity-80'> {country.population}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className='text-sm font-semibold'>Region: </h5> <p className='text-sm opacity-80'> {country.region}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className='text-sm font-semibold'>Sub Region: </h5> <p className='text-sm opacity-80'> {country.subRegion}</p>
              </div>
              <div className="inline-flex items-end gap-1 ">
                    <h5 className='text-sm font-semibold'>Capital: </h5> <p className='text-sm opacity-80'> {country.capital}</p>
              </div>

        </div>
        <div className="flex flex-col sm:gap-1 lg:gap-2 flex-wrap  justify-items-start">
            <div className=" inline-flex items-end  gap-1  ">
                    <h5 className='text-sm font-semibold'>Top Level Domain: </h5> <p className='text-sm opacity-80'> {country.topLevelDomaine}</p>
              </div>
              <div className="inline gap-1 ">
                    <h5 className='text-sm font-semibold'>Currencies: </h5>{Object.entries(country.currencies).map(([key,value],index)=>{ return <p className='text-sm opacity-80 flex-wrap' key={key}>{(index?' , ' : "") + value.name} </p>})} 
              </div>
              <div className="inline-flex  items-end   gap-1 ">
                    <h5 className='text-sm font-semibold'>Languages: </h5> {Object.entries(country.languages).map(([key,value],index)=>{ return <p className='text-sm opacity-80' key={key}>{(index?', ' : "") + value} </p>})} 
              </div>
        </div>
        {
            country.borders &&
        <div className="grid md:pt-10 md:grid-cols-3 md:col-span-2 gap-3 ">
            <h1 className="text-sm font-semibold col-span-1">Border countries : </h1>
            <div className="flex flex-wrap col-span-2 gap-2">
            {
            country.borders.map((b)=>{
               
                  return <button onClick={()=>countryClick(b)} key={b} className="px-6 py-1 shadow-xl text-xs ">{b}</button>
            })}
            </div>
      </div>  
            } 
      </div>
       
      </div>
     

    </div> : null
    
  }
  </div>
  
    
)
}

export default Country
