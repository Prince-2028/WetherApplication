import React, { useState } from "react";
import WeatherDashboard from "./Component/WeatherDashboard";


const App = () => {
  const [voiceCity, setVoiceCity] = useState("");
  console.log(voiceCity);
  

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  const voiceADD = () => {
    recognition.start()
  };
  
  recognition.onresult = (event) => {
    const citydata = event.results[0][0].transcript;
    setVoiceCity(citydata);
  };
  return (
    <>
      {/* <button onClick={voiceADD}><FaMicrophone />
      </button> */}
      <WeatherDashboard voiceid={voiceADD}/>
    </>
    
  );
};

export default App;
