
import axios from "axios"
import React from "react";
import { useState } from "react";

import { API_URL } from "./api-config";

async function weather_data(city: string) {
    const data = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=ENGLISH&key=${API_URL}`);
    return data.data
  }
  function App() {
  const [errs,setErrs] = useState(false);
  const [city, setCity] = useState("butwal");
  const [data, setDAta] = useState({
    city: "butwal",
    country: "nepal",
    temp: 20,
    time: "2024-04-03 21:14",
    icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
    feelsLike: 26,
    humidity: 14,
    sky: "clear",
  });
  const handelchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCity(e.target.value)
  }
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();
      const result = await weather_data(city)
      setDAta({
        city: result.location.name,
        country: result.location.country,
        temp: result.current.temp_c,
        time: result.location.localtime,
        icon: result.current.condition.icon,
        feelsLike: result.current.feelslike_c,
        humidity: result.current.humidity,
        sky: result.current.condition.text
      })
      setErrs(false);
    }catch(err){
      setErrs(true);
    }
  }
  const HOT_IMG = "https://images.unsplash.com/photo-1561473880-3b8b12de0a71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  const COLD_IMG = "https://images.unsplash.com/photo-1612119276551-be9efb8ea36a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  const RAIN_IMG = "https://th.bing.com/th/id/R.5207680e1eafd7233ab094b5f910e6af?rik=KZhkKFGKm4lhhQ&riu=http%3a%2f%2fbestanimations.com%2fNature%2fWater%2frain%2frain-nature-animated-gif-21.gif&ehk=lBF1ql92mhoIINxp3h%2b18XZodQzsNC5qwcJwiXoS0Jg%3d&risl=&pid=ImgRaw&r=0"
  const SNOW_IMG = "https://800017.xyz/files/funzug/imgs/nature2/snowfall_in_gifs_01.gif"
  return (
    <>

      <div className="w-[100%] h-screen fixed -z-10">
        <img className="object-cover w-[100%] h-screen" src={data.humidity > 80?RAIN_IMG : data.temp == 0?SNOW_IMG:data.temp > 15? HOT_IMG:COLD_IMG} alt="sunny day" />
      </div>

      <div className="flex flex-col items-center w-[100%]">
        <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitForm}>
          <div className="mb-4 flex flex-col justify-center items-center">
            <label className="block text-black text-sm font-bold mb-2" htmlFor="username">
              City Name
            </label>
            <input value={city} onChange={handelchange} className="shadow-md appearance-none border rounded w-[100%] py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            {errs?<p className="text-red-500">no such city found</p>:<p className="text-green-500">found</p>}
            <button className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Search</button>
          </div>
        </form>

        <div className="w-[50%] flex justify-center items-center">
          <div className="max-w-lg rounded-lg w-[100%] overflow-hidden shadow-lg bg-gradient-to-r from-violet-600 to-indigo-600">
            <img src={data.icon} alt="icon" />
            <div className="px-6 py-4">
              <div className="font-bold text-2xl text-white mb-2">{data.city},{data.country}</div>
              <div className="text-white">
                {/* <div className="mb-3 text-base">Country: {data.country}</div> */}
                <div className="mb-3 text-base">Temperature: {data.temp} <sup>o</sup>C</div>
                <div className="mb-3 text-base">Time: {data.time}</div>
                <div className="mb-3 text-base">Feels Like: {data.feelsLike}</div>
                <div className="text-base">Humidity: {data.humidity}</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
