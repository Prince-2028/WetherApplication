import React from "react";
import { FaMicrophone } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

const WeatherDashboard = ({ voiceid }) => {
  const [cityName, setCityName] = useState("");
  const [response, setReposive] = useState("");
  console.log(response);

  const handlesubmit = () => {
    axios
      .post("https://wetherapplication-2.onrender.com/api/data", {
        cityName,
      })
      .then(function (response) {
        setCityName("")
        setReposive(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert("please enetr a valid locarion")
        setCityName("")
      });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen p-6 gap-6">
      {/* Left Section */}
      <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
        {/* Search Bar - Placed at the Top */}
        <div className="flex items-center gap-4 flex-wrap mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg px-2 py-1 text-xs w-32 sm:w-40 md:w-48 lg:w-64 h-10"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />

          <FaMicrophone
            className="w-5 h-5 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 cursor-pointer"
            onClick={voiceid}
          />
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2"
            onClick={handlesubmit}
          >
            Search
          </button>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-gray-900">Date</h2>
        </div>
        <p className="text-gray-500 text-sm mt-1">{response.date}</p>

        {/* Overview */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Wind Speed(km/h)</p>
            <p className="text-xl font-bold"> {response.windspeed}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Humadity(%)</p>
            <p className="text-xl font-bold">{response.humidity}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Pressure(hpa)</p>
            <p className="text-xl font-bold">{response.pressure} </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">UV Index</p>
            <p className="text-xl font-bold">{response.uvindex}</p>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="mt-6 p-6 bg-gray-50 rounded-lg shadow-sm h-40 flex items-center justify-center">
          <p className="text-gray-400">Temperature Graph Placeholder</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-80 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-6 rounded-2xl shadow-md">
        <div>
          <h3 className="text-lg font-semibold">Address</h3>
          <p className="text-sm text-gray-300">{response.adress}</p>
          <p className="text-4xl font-bold mt-4">{response.temp}°C</p>
          <p className="text-sm text-gray-300">Dramatic Cloudy</p>
        </div>

        {/* Chance of Rain */}
        <div className="mt-6">
          <h4 className="text-md font-semibold">Chance of Rain</h4>
          <div className="mt-2">
            {[
              { time: "7 PM", chance: 44 },
              { time: "8 PM", chance: 30 },
              { time: "9 PM", chance: 67 },
              { time: "10 PM", chance: 72 },
            ].map((data) => (
              <div
                key={data.time}
                className="flex justify-between text-sm py-1"
              >
                <span>{data.time}</span>
                <div className="w-24 h-2 bg-gray-300 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${data.chance}%` }}
                  ></div>
                </div>
                <span>{data.chance}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="mt-6">
          <h4 className="text-md font-semibold">Sunrise & Sunset</h4>
          <div className="mt-2 flex justify-between text-sm">
            <div>
              <p>Sunrise</p>
              <p className="font-bold">{response.sunrise} AM</p>
            </div>
            <div>
              <p>Sunset</p>
              <p className="font-bold">{response.sunset} PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
