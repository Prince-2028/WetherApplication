import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/data", (req, res) => {
  const { cityName } = req.body;
  console.log(cityName);

  axios({
    method: "get",
    url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
  }).then(function (response) {
    // 
   const adress=response.data.resolvedAddress
   console.log(adress);
   
   
    
    const day1 = response.data.days[0];
    const responseData = {
      date: day1.datetime,
      windspeed: day1.windspeed,
      uvindex: day1.uvindex,
      sunset: day1.sunset,
      pressure:day1.pressure,
      sunrise:day1.sunrise,
      humidity:day1.humidity,
      temp:day1.temp,
      adress:response.data.resolvedAddress
      

    };
    responseData.has

    res.status(200).json(responseData);
  }).catch((error) => {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data. Please try again later." });
  });

  
  
  
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
