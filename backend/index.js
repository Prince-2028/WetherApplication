import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin:  ["https://wethercastnow.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/data", (req, res) => {
  const { cityName } = req.body;
  console.log(cityName);

  axios({
    method: "get",
    url: `${process.env.WEATHER_API_URL}/${cityName}?unitGroup=metric&key=${process.env.WEATHER_API_KEY}&contentType=json`,
  })
    .then(function (response) {
      const address = response.data.resolvedAddress;
      console.log(address);

      const day1 = response.data.days[0];
      // Prepare temperature graph data for next 7 days
      const graphData = response.data.days.slice(0, 7).map((day) => ({
        date: day.datetime,
        temp: day.temp,
        minTemp: day.tempmin,
        maxTemp: day.tempmax,
      }));

      const responseData = {
        date: day1.datetime,
        windspeed: day1.windspeed,
        uvindex: day1.uvindex,
        sunset: day1.sunset,
        pressure: day1.pressure,
        sunrise: day1.sunrise,
        humidity: day1.humidity,
        temp: day1.temp,
        address: response.data.resolvedAddress,
        graphData, // add graph data for frontend
      };

      res.status(200).json(responseData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
      res
        .status(500)
        .json({
          error: "Failed to fetch weather data. Please try again later.",
        });
    });
});

app.post("/api/cities", async (req, res) => {
  const { query } = req.body;
  try {
    const geoRes = await axios.get(`${process.env.CITIES_API_URL}`, {
      params: { namePrefix: query, limit: 7 },
      headers: {
        "x-rapidapi-key": process.env.CITIES_API_KEY,
        "x-rapidapi-host": process.env.CITIES_API_HOST,
      },
    });
    const suggestions = geoRes.data.data.map(
      (city) => `${city.city}${city.region ? ", " + city.region : ""}${city.country ? ", " + city.country : ""}`
    );
    res.json({ suggestions });
  } catch (err) {
    res.json({ suggestions: [] });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
