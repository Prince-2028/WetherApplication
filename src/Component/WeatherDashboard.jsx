import { FaMicrophone } from "react-icons/fa6";
import { useState,useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const WeatherDashboard = ({ voiceid, voiceCity }) => {
  const [cityName, setCityName] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // loader state
  
  console.log("ciyty",voiceCity);

  // Auto-search when voiceCity changes
  useEffect(() => {
    if (voiceCity && voiceCity.trim() !== "") {
      setCityName(voiceCity);
      setLoading(true);
      axios
        .post("https://wetherapplication-2.onrender.com/api/data", {
          cityName: voiceCity,
        })
        .then(function (res) {
          setCityName("");
          setResponse(res.data);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          setCityName("");
          alert("Please enter a valid location");
        });
    }
    // eslint-disable-next-line
  }, [voiceCity]);

  const handlesubmit = () => {
    setLoading(true); // start loader
    axios
      .post("https://wetherapplication-2.onrender.com/api/data", {
        cityName,
      })
      .then(function (res) {
        setCityName("");
        setResponse(res.data);
        setLoading(false); // stop loader
      })
      .catch(function (error) {
        console.log(error);
        alert("Please enter a valid location");
        setCityName("");
        setLoading(false); // stop loader
      });
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 min-h-screen p-8 gap-8">
      {/* Left Section */}
      <div className="flex-1 bg-white/90 p-8 rounded-3xl shadow-2xl border border-blue-200">
        {/* Search Bar - Placed at the Top */}
        <div className="mb-8">
          <div className="relative flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Enter city name..."
                className="border-2 border-blue-300 focus:border-blue-500 rounded-xl px-4 py-2 text-base w-full h-12 shadow-sm outline-none transition-all pr-12"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <FaMicrophone
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 text-blue-500 hover:text-blue-700 transition cursor-pointer"
                onClick={voiceid}
              />
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:from-blue-600 hover:to-purple-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-xl text-base px-7 py-2 shadow-md transition-all duration-200 w-full sm:w-auto"
              onClick={handlesubmit}
              disabled={loading}
            >
              Search
            </button>
            {loading && (
              <div className="ml-2 flex items-center justify-center">
                <span className="inline-block w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center gap-4 flex-wrap mb-2">
          <h2 className="text-2xl font-bold text-blue-900 tracking-wide">
            Today's Weather
          </h2>
          <span className="text-blue-500 font-semibold text-lg">
            {response?.date}
          </span>
        </div>
        <hr className="mb-6 border-blue-200" />

        {/* Overview */}
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow flex flex-col items-center">
            <span className="text-blue-500 text-2xl font-bold">
              {response?.windspeed ?? "--"}
            </span>
            <span className="text-gray-500 text-sm mt-1">
              Wind Speed (km/h)
            </span>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow flex flex-col items-center">
            <span className="text-blue-500 text-2xl font-bold">
              {response?.humidity ?? "--"}
            </span>
            <span className="text-gray-500 text-sm mt-1">Humidity (%)</span>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow flex flex-col items-center">
            <span className="text-blue-500 text-2xl font-bold">
              {response?.pressure ?? "--"}
            </span>
            <span className="text-gray-500 text-sm mt-1">Pressure (hPa)</span>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow flex flex-col items-center">
            <span className="text-blue-500 text-2xl font-bold">
              {response?.uvindex ?? "--"}
            </span>
            <span className="text-gray-500 text-sm mt-1">UV Index</span>
          </div>
        </div>

        {/* Graph Section */}
        <div className="mt-8 p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow flex flex-col items-center justify-center h-72">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            7-Day Temperature Trend
          </h3>
          {response?.graphData && response.graphData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart
                data={response.graphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  domain={[
                    (dataMin) => Math.floor(dataMin - 2),
                    (dataMax) => Math.ceil(dataMax + 2),
                  ]}
                />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorTemp)"
                  name="Avg Temp"
                />
                <Line
                  type="monotone"
                  dataKey="minTemp"
                  stroke="#60a5fa"
                  name="Min Temp"
                />
                <Line
                  type="monotone"
                  dataKey="maxTemp"
                  stroke="#f59e42"
                  name="Max Temp"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-lg">
              Temperature Graph Coming Soon...
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-96 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col gap-8 border border-blue-700/30">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold tracking-wide">
            {response?.address ?? "Location"}
          </h3>
          <p className="text-5xl font-bold mt-4 mb-2">
            {response?.temp ? `${response.temp}°C` : "--°C"}
          </p>
          <p className="text-md text-blue-200 italic">
            {response ? "Dramatic Cloudy" : "Weather Info"}
          </p>
        </div>

        {/* Chance of Rain */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Chance of Rain</h4>
          <div className="space-y-2">
            {[
              { time: "7 PM", chance: 44 },
              { time: "8 PM", chance: 30 },
              { time: "9 PM", chance: 67 },
              { time: "10 PM", chance: 72 },
            ].map((data) => (
              <div
                key={data.time}
                className="flex items-center justify-between text-base"
              >
                <span>{data.time}</span>
                <div className="w-32 h-3 bg-blue-900/30 rounded-full mx-2">
                  <div
                    className="h-3 bg-blue-400 rounded-full"
                    style={{ width: `${data.chance}%` }}
                  ></div>
                </div>
                <span>{data.chance}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Sunrise & Sunset</h4>
          <div className="flex justify-between text-base">
            <div className="flex flex-col items-center">
              <span className="text-blue-200">Sunrise</span>
              <span className="font-bold text-lg">
                {response?.sunrise ? `${response.sunrise} AM` : "--"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-blue-200">Sunset</span>
              <span className="font-bold text-lg">
                {response?.sunset ? `${response.sunset} PM` : "--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
