import express from "express";
import axios from "axios";
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  const fetchdata = (city) => {
    axios({
      method: "get",
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
    }).then(function (response) {
      console.log(response.data);
    });
  };
  fetchdata("bhiwani");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
